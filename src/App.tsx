import { useState, useEffect, useRef, useMemo } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

// --- Constants ---
const MIN_HOT_BY_WATTS: Record<number, number> = {
  500: 5, 1000: 6, 2000: 10, 3000: 12, 4000: 19, 5000: 20,
  600: 22, 8000: 36, 9000: 40, 12000: 38, 15000: 47, 18000: 55,
};

function App() {
  // --- State Hooks ---
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<number>(240);
  const [wattsVar, setWattage] = useState<number>(500);
  const [phaseVar, setPhase] = useState<number>(1);
  const [materialVar, setMaterial] = useState<string>("304SS");
  const [seriesVar, setSeries] = useState<string>("9HX");
  const [protectorVar, setProtector] = useState<string>("P1");
  const [hotLengthText, setHotLengthText] = useState<string>("9");
  const [coldLengthText, setColdLengthText] = useState<string>("2.5");

  const drawingRef = useRef<HTMLDivElement>(null);

  // --- Calculations ---
  const hotLengthNum = useMemo(() => parseFloat(hotLengthText) || 0, [hotLengthText]);
  const coldLengthNum = useMemo(() => parseFloat(coldLengthText) || 0, [coldLengthText]);

  const OALVar = hotLengthNum + coldLengthNum;
  const minHot = MIN_HOT_BY_WATTS[wattsVar] ?? 0;
  const isHotLengthUnderMin = hotLengthText !== "" && hotLengthNum < minHot;


  useEffect(() => {
    const min = MIN_HOT_BY_WATTS[wattsVar] ?? 0;
    setHotLengthText(String(min));
  }, [wattsVar]);

  const handleNumericInput = (val: string, setter: (v: string) => void) => {
    if (/^\d*\.?\d*$/.test(val)) setter(val);
  };

  // --- Export Functions ---
  const getDrawingBlob = async (): Promise<Blob> => {
    if (!drawingRef.current) throw new Error("Drawing ref not found");
    const blob = await htmlToImage.toBlob(drawingRef.current, {
      cacheBust: true, pixelRatio: 3, backgroundColor: "white",
    });
    if (!blob) throw new Error("Failed to create image blob");
    return blob;
  };

  const copyDrawingToClipboard = async () => {
    try {
      const blob = await getDrawingBlob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      alert("Copied!");
    } catch (err) { alert("Copy failed."); }
  };

  const downloadDrawingPng = async () => {
    try {
      const blob = await getDrawingBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; 
      a.download = `drawing-${serialNum || Date.now()}.png`; 
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert("Download failed."); }
  };

  return (
    <div className="flex justify-center mt-5 w-screen gap-6">
      <div className="w-96 bg-white p-4 border-2 border-slate-400 rounded-lg text-gray-700 overflow-y-auto max-h-[95vh] shadow-xl">
        
        {/* Serial & Title */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Serial Number</h1>
            <input type="text" value={serialNum} onChange={(e) => setSerialNum(e.target.value)} className="input input-bordered border-cyan-500 input-xs w-full" />
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Title</h1>
            <input type="text" value={titleVar} onChange={(e) => setTitle(e.target.value)} className="input input-bordered border-cyan-500 input-xs w-full" />
          </div>
        </div>

        {/* Electrical */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Volts</h1>
            <select className="select select-xs border-cyan-500 w-full" value={voltsVar} onChange={(e) => setVoltage(Number(e.target.value))}>
              {[120, 208, 240, 480, 600].map(v => <option key={v} value={v}>{v}V</option>)}
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Watts</h1>
            <select className="select select-xs border-cyan-500 w-full" value={wattsVar} onChange={(e) => setWattage(Number(e.target.value))}>
              {Object.keys(MIN_HOT_BY_WATTS).map(w => <option key={w} value={w}>{w}W</option>)}
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Phase</h1>
            <select className="select select-xs border-cyan-500 w-full" value={phaseVar} onChange={(e) => setPhase(Number(e.target.value))}>
              <option value={1}>1Ø</option><option value={3}>3Ø</option>
            </select>
          </div>
        </div>

        {/* PTFE Build Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Series</h1>
            <select className="select select-xs border-cyan-500 w-full" value={seriesVar} onChange={(e) => setSeries(e.target.value)}>
              <option value="9HX">9HX Series</option>
              <option value="9HS">9HS Series</option>
              <option value="6HX">6HX Series</option>
              <option value="6HS">6HS Series</option>
              <option value="3HX">3HX Series</option>
              <option value="3HS">3HS Series</option>
              <option value="3HXO">3HXO Series</option>
              <option value="5T">5T Series</option>
              <option value="DTM">DTM Series</option>
              <option value="FL">FL Series</option>
              <option value="HXT">HXT Series</option>
              <option value="MOTS Single">MOTS Single Series</option>
              <option value="MOTS">MOTS Series</option>
              <option value="T">T Series</option>
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Material</h1>
            <select className="select select-xs border-cyan-500 w-full" value={materialVar} onChange={(e) => setMaterial(e.target.value)}>
              <option value="304SS">304 Stainless</option>
              <option value="316SS">316 Stainless</option>
              <option value="Titanium">Titanium</option>
              <option value="PTFE">PTFE Covered</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Protector</h1>
            <select className="select select-xs border-cyan-500 w-full" value={protectorVar} onChange={(e) => setProtector(e.target.value)}>
              <option value="P1">P1 (Std)</option>
              <option value="P2">P2 (Resettable)</option>
              <option value="P3">P3 (Liquid)</option>
            </select>
          </div>
        </div>

        {/* Lengths */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <h1 className="text-xs font-bold uppercase text-slate-500">Hot Zone</h1>
            <input type="text" value={hotLengthText} onChange={(e) => handleNumericInput(e.target.value, setHotLengthText)} 
                   className={`input input-xs w-full border ${isHotLengthUnderMin ? "border-red-500" : "border-cyan-500"}`} />
            {isHotLengthUnderMin && <p className="text-[10px] text-red-500 absolute -bottom-4">Min: {minHot}"</p>}
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Cold</h1>
            <input type="text" value={coldLengthText} onChange={(e) => handleNumericInput(e.target.value, setColdLengthText)} className="input input-xs w-full border-cyan-500" />
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">OAL</h1>
            <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold">{OALVar.toFixed(1)}"</div>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <button className="btn btn-sm w-full btn-info" onClick={copyDrawingToClipboard}>Copy Drawing PNG</button>
          <button className="btn btn-sm w-full btn-outline" onClick={downloadDrawingPng}>Download Drawing PNG</button>
        </div>
      </div>

      <Drawing
        drawingRef={drawingRef}
        serialNum={serialNum}
        title={titleVar}
        phase={phaseVar}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        OAL={OALVar}
        coldLength={coldLengthNum}
        hotLength={hotLengthNum}
        elementCount={1}
        series={seriesVar}
        protector={protectorVar}
      />
    </div>
  );
}

export default App;