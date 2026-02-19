import { useState, useEffect, useRef, useMemo } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

// --- Constants ---
const MIN_HOT_BY_WATTS: Record<number, number> = {
  500: 5, 1000: 6, 2000: 10, 3000: 12, 4000: 19, 5000: 20,
  600: 22, 8000: 36, 9000: 40, 12000: 38, 15000: 47, 18000: 55,
};

const SPST_RANGES = ["C:-30,30", "C:0,40", "C:0,50", "C:0,80", "C:0,90", "C:0,120", "C:0,150", "C:0,200", "C:0,250", "C:0,320"];
const DPST_RANGES = ["F:0,100", "F:6,250", "F:50,550"];

function App() {
  // --- State Hooks ---
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<number>(120);
  const [wattsVar, setWattage] = useState<number>(500);
  const [phaseVar, setPhase] = useState<number>(1);
  const [terminalBoxVar, setTerminalBox] = useState<string>("N1");
  const [materialVar, setMaterial] = useState<string>("304SS");
  const [seriesVar, setSeries] = useState<string>("9HX");
  const [protectorVar, setProtector] = useState<string>("P1");
  const [wireLenVar, setWireLen] = useState<string>("");

  const [hotLengthText, setHotLengthText] = useState<string>("9");
  const [coldLengthText, setColdLengthText] = useState<string>("2.5");
  const [processLenText, setProcessLenText] = useState<string>("8");
  const [hlLenText, setHLLenText] = useState<string>("8");

  const [processType, setProcessType] = useState<string>("nT"); 
  const [processRange, setProcessRange] = useState<string>(""); 
  const [hlType, setHLType] = useState<string>("nHL");
  const [hlRange, setHLRange] = useState<string>("");

  const drawingRef = useRef<HTMLDivElement>(null);

  // --- Calculations ---
  const hotLengthNum = useMemo(() => parseFloat(hotLengthText) || 0, [hotLengthText]);
  const coldLengthNum = useMemo(() => parseFloat(coldLengthText) || 0, [coldLengthText]);
  const processLenNum = useMemo(() => parseFloat(processLenText) || 0, [processLenText]);
  const hlLenNum = useMemo(() => parseFloat(hlLenText) || 0, [hlLenText]);
  
  const OALVar = hotLengthNum + coldLengthNum;
  const minHot = MIN_HOT_BY_WATTS[wattsVar] ?? 0;
  const isHotLengthUnderMin = hotLengthText !== "" && hotLengthNum < minHot;
  const dpstActive = processType === "DPST" || hlType === "DPST";

  // --- Effects ---
  useEffect(() => {
    if (dpstActive && terminalBoxVar !== "N4") {
      setTerminalBox("N4");
    }
  }, [dpstActive, terminalBoxVar]);

  // AUTO-DEFAULT: Set hot length to minimum when Wattage changes
  useEffect(() => {
    const min = MIN_HOT_BY_WATTS[wattsVar] ?? 0;
    setHotLengthText(String(min));
  }, [wattsVar]);

  const handleNumericInput = (val: string, setter: (v: string) => void) => {
    if (/^\d*\.?\d*$/.test(val)) setter(val);
  };

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
      a.href = url; a.download = `drawing-${Date.now()}.png`; a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert("Download failed."); }
  };

  const formatRangeLabel = (range: string) => {
    const m = range.match(/^([CF]):(-?\d+),(-?\d+)$/);
    if (!m) return range;
    const [_, unit, a, b] = m;
    const valA = Number(a); const valB = Number(b);
    if (unit === "C") return `${a}–${b}°C (${Math.round((valA * 9/5) + 32)}–${Math.round((valB * 9/5) + 32)}°F)`;
    return `${a}–${b}°F (${Math.round((valA - 32) * 5/9)}–${Math.round((valB - 32) * 5/9)}°C)`;
  };

  return (
    <div className="flex justify-center mt-5 w-screen gap-6">
      <div className="w-96 bg-white p-4 border-2 border-slate-400 rounded-lg text-gray-700 overflow-y-auto max-h-[90vh]">
        
        {/* Serial & Title */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <h1 className="text-xs font-bold">Serial Number</h1>
            <input type="text" value={serialNum} onChange={(e) => setSerialNum(e.target.value)} className="input input-bordered border-cyan-500 input-xs w-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-xs font-bold">Title</h1>
            <input type="text" value={titleVar} onChange={(e) => setTitle(e.target.value)} className="input input-bordered border-cyan-500 input-xs w-full" />
          </div>
        </div>

        {/* Electrical Specs */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold">Voltage</h1>
            <select className="select select-xs border-cyan-500 w-full" value={voltsVar} onChange={(e) => setVoltage(Number(e.target.value))}>
              <option value={120}>120 V</option><option value={208}>208 V</option><option value={240}>240 V</option><option value={480}>480 V</option>
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold">Wattage</h1>
            <select className="select select-xs border-cyan-500 w-full" value={wattsVar} onChange={(e) => setWattage(Number(e.target.value))}>
              {Object.keys(MIN_HOT_BY_WATTS).map(w => <option key={w} value={w}>{w} W</option>)}
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold">Phase</h1>
            <select className="select select-xs border-cyan-500 w-full" value={phaseVar} onChange={(e) => setPhase(Number(e.target.value))}>
              <option value={1}>1Ø</option><option value={3}>3Ø</option>
            </select>
          </div>
        </div>

        {/* Build Specs: Series & Material */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold">Series (PTFE/HX)</h1>
            <select className="select select-xs border-cyan-500 w-full font-bold" value={seriesVar} onChange={(e) => setSeries(e.target.value)}>
              <option value="9HX">9HX Series</option>
              <option value="PTFE">PTFE Series</option>
              <option value="6HX">6HX Series</option>
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold">Sheath Material</h1>
            <select className="select select-xs border-cyan-500 w-full" value={materialVar} onChange={(e) => setMaterial(e.target.value)}>
              <option value="304SS">304 Stainless</option>
              <option value="316SS">316 Stainless</option>
              <option value="Titanium">Titanium</option>
              <option value="PTFE">PTFE Covered</option>
            </select>
          </div>
        </div>

        {/* Protection & Enclosure */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold">Protector</h1>
            <select className="select select-xs border-cyan-500 w-full" value={protectorVar} onChange={(e) => setProtector(e.target.value)}>
              <option value="P1">P1 (Standard)</option><option value="P2">P2</option><option value="P3">P3</option>
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold">Terminal Box</h1>
            <select className="select select-xs border-cyan-500 w-full" value={terminalBoxVar} onChange={(e) => setTerminalBox(e.target.value)}>
              <option value="N1">Nema 1</option><option value="N4">Nema 4</option>
            </select>
          </div>
        </div>

        {/* Lengths */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <h1 className="text-xs font-bold">Hot Zone</h1>
            <input type="text" value={hotLengthText} onChange={(e) => handleNumericInput(e.target.value, setHotLengthText)} 
                   className={`input input-xs w-full border ${isHotLengthUnderMin ? "border-red-500" : "border-cyan-500"}`} />
            {isHotLengthUnderMin && <p className="text-[10px] text-red-500 absolute -bottom-4">Min: {minHot}&quot;</p>}
          </div>
          <div>
            <h1 className="text-xs font-bold">Cold</h1>
            <input type="text" value={coldLengthText} onChange={(e) => handleNumericInput(e.target.value, setColdLengthText)} className="input input-xs w-full border-cyan-500" />
          </div>
          <div>
            <h1 className="text-xs font-bold">OAL</h1>
            <div className="input input-xs w-full bg-slate-100 flex items-center px-2">{OALVar.toFixed(1)}&quot;</div>
          </div>
        </div>

        {/* Thermowells Section */}
        <div className="border-t pt-2 mt-2">
          <div className="flex gap-3 mb-2">
            <div className="flex-1">
              <h1 className="text-xs font-bold">Process TW</h1>
              <select className="select select-xs w-full border-cyan-500" value={processType === "nT" ? "NO" : "YES"} 
                onChange={(e) => setProcessType(e.target.value === "NO" ? "nT" : "J")}>
                <option value="NO">No</option><option value="YES">Yes</option>
              </select>
            </div>
            <div className="flex-1">
              <h1 className="text-xs font-bold">High Limit TW</h1>
              <select className="select select-xs w-full border-cyan-500" value={hlType === "nHL" ? "NO" : "YES"} 
                onChange={(e) => setHLType(e.target.value === "NO" ? "nHL" : "J")}>
                <option value="NO">No</option><option value="YES">Yes</option>
              </select>
            </div>
          </div>

          {/* SIDE BY SIDE DETAIL BOXES */}
          <div className="flex gap-2 mt-2">
            {processType !== "nT" && (
              <div className="flex-1 p-2 bg-slate-50 border border-cyan-500 rounded">
                <h1 className="text-[9px] uppercase font-bold text-slate-500 mb-1">Process</h1>
                <select className="select select-xs w-full mb-1 border-cyan-500" value={processType} onChange={(e) => setProcessType(e.target.value)}>
                  <option value="J">Type J</option><option value="K">Type K</option><option value="RTD">RTD</option><option value="SPST">SPST</option><option value="DPST">DPST</option>
                </select>
                <input type="text" placeholder="Length" value={processLenText} onChange={(e) => handleNumericInput(e.target.value, setProcessLenText)} className="input input-xs w-full border-cyan-500" />
              </div>
            )}
            {hlType !== "nHL" && (
              <div className="flex-1 p-2 bg-slate-50 border border-cyan-500 rounded">
                <h1 className="text-[9px] uppercase font-bold text-slate-500 mb-1">High Limit</h1>
                <select className="select select-xs w-full mb-1 border-cyan-500" value={hlType} onChange={(e) => setHLType(e.target.value)}>
                  <option value="J">Type J</option><option value="K">Type K</option><option value="RTD">RTD</option><option value="SPST">SPST</option><option value="DPST">DPST</option>
                </select>
                <input type="text" placeholder="Length" value={hlLenText} onChange={(e) => handleNumericInput(e.target.value, setHLLenText)} className="input input-xs w-full border-cyan-500" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <button className="btn btn-sm w-full btn-info" onClick={copyDrawingToClipboard}>Copy PNG</button>
          <button className="btn btn-sm w-full btn-outline" onClick={downloadDrawingPng}>Download PNG</button>
        </div>
      </div>

      <Drawing
        drawingRef={drawingRef}
        serialNum={serialNum}
        title={titleVar}
        lengthElement={OALVar}
        foldLength={0}
        phase={phaseVar}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        OAL={OALVar}
        terminalBox={terminalBoxVar}
        coldLength={coldLengthNum}
        elementCount={1}
        processTemp={processType}
        processRange={processRange}
        thermoLength={processLenNum}
        hlSensor={hlType}
        hlRange={hlRange}
        hlLength={hlLenNum}
        series={seriesVar}
        protector={protectorVar}
      />
    </div>
  );
}

export default App;