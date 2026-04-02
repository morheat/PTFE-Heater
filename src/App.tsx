import { useState, useEffect, useRef, useMemo } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

const SearchSelect = ({ label, value, onChange, options }: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  options: { value: string; label: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opt.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const currentLabel = options.find(o => o.value === value)?.label || value;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <h1 className="text-xs font-bold uppercase text-slate-500 mb-1">{label}</h1>
      <input
        type="text"
        className="input input-xs border-cyan-500 w-full focus:outline-none"
        placeholder={isOpen ? "Type to search..." : currentLabel}
        value={isOpen ? searchTerm : currentLabel}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        readOnly={!isOpen}
        onClick={() => !isOpen && setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute z-[100] mt-1 w-full max-h-60 overflow-auto bg-white border border-slate-200 rounded-md shadow-xl">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 text-xs cursor-pointer hover:bg-cyan-50 ${value === opt.value ? 'bg-cyan-100 font-bold' : ''}`}
                onMouseDown={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-slate-400 text-center">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

const SERIES_OPTIONS = [
  { value: "9HX", label: "9HX Series" },
  { value: "9HS", label: "9HS Series" },
  { value: "6HX", label: "6HX Series" },
  { value: "6HS", label: "6HS Series" },
  { value: "3HX", label: "3HX Series" },
  { value: "3HS", label: "3HS Series" },
  { value: "3HXO", label: "3HXO Series" },
  { value: "5T", label: "5T Series" },
  { value: "DTM", label: "DTM Series" },
  { value: "FL", label: "FL Series" },
  { value: "HXT", label: "HXT Series" },
  { value: "MOTS Single", label: "MOTS Single Series" },
  { value: "MOTS", label: "MOTS Series" },
  { value: "T", label: "T Series" },
  { value: "3HXOL", label: "3HXOL Series" },
  { value: "DTL", label: "DTL Series" },
  { value: "HXFL-L", label: "HXFL-L Series" },
  { value: "HXFL", label: "HXFL Series" },
  { value: "HXL", label: "HXL Series" },
  { value: "HXOL", label: "HXOL Series" },
  { value: "HXRL", label: "HXRL Series" },
  { value: "HXSL", label: "HXSL Series" },
  { value: "LVT", label: "LVT Series" },
];
// --- Constants ---
const MIN_HOT_BY_WATTS: Record<number, number> = {
  500: 5, 1000: 6, 2000: 10, 3000: 12, 4000: 19, 5000: 20,
  600: 22, 8000: 36, 9000: 40, 12000: 38, 15000: 47, 18000: 55,
};

const MATERIAL_OPTIONS_BY_SERIES: Record<string, { value: string; label: string }[]> = {
  "9HX": [
    { value: "PTFE", label: "PTFE Covered" },
  ],
  "6HX": [
    { value: "PTFE", label: "PTFE Covered" },
  ],
  "3HX": [
    { value: "PTFE", label: "PTFE Covered" },
  ],
  "3HXO": [
    { value: "PTFE", label: "PTFE Covered" },
  ],
  "HXT": [
    { value: "PTFE", label: "PTFE Covered" },
  ],
  // fallback/default
  "default": [
    { value: "304SS", label: "304 Stainless" },
    { value: "316SS", label: "316 Stainless" },
    { value: "Titanium", label: "Titanium" },
  ]
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


  const CONSTANT_OAL_BY_SERIES: Record<string, number> = {
    "3HXOL": 18, 
  };
  const OALVar = useMemo(() => {
    // If the series has a defined constant OAL, use it
    if (CONSTANT_OAL_BY_SERIES[seriesVar] !== undefined) {
      return CONSTANT_OAL_BY_SERIES[seriesVar];
    }
    // Otherwise, use the standard math
    return hotLengthNum + coldLengthNum;
  }, [seriesVar, hotLengthNum, coldLengthNum]);


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

const materialOptions = useMemo(() => {
  return MATERIAL_OPTIONS_BY_SERIES[seriesVar] || MATERIAL_OPTIONS_BY_SERIES["default"];
}, [seriesVar]);

useEffect(() => {
  const validValues = materialOptions.map(opt => opt.value);
  if (!validValues.includes(materialVar)) {
    setMaterial(validValues[0]); // default to first valid option
  }
}, [seriesVar, materialOptions]);


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
          <SearchSelect 
            label="Series"
            value={seriesVar}
            onChange={setSeries}
            options={SERIES_OPTIONS}
          />
          <SearchSelect 
            label="Material"
            value={materialVar}
            onChange={setMaterial}
            options={materialOptions} 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Protector</h1>
            <select className="select select-xs border-cyan-500 w-full" value={protectorVar} onChange={(e) => setProtector(e.target.value)}>
              <option value="P1">P1 - 180°F (82°C)</option>
              <option value="P2">P2 - 190°F (88°C)</option>
              <option value="P3">P3 - 250°F (121°C)</option>
              <option value="P4">P4 - 230°F (110°C)</option>
              <option value="P5">P5 - 300°F (150°C)</option>
              <option value="P6">P6 - 230°F (110°C)</option>
              <option value="P7">P7 - 300°F (150°C)</option>
              <option value="P7">P8 - 210°F (99°C)</option>
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