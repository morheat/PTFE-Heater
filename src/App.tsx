import { useState, useEffect, useRef, useMemo } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

const SearchSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
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
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const currentLabel = options.find((o) => o.value === value)?.label || value;

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
                className={`px-3 py-2 text-xs cursor-pointer hover:bg-cyan-50 ${
                  value === opt.value ? "bg-cyan-100 font-bold" : ""
                }`}
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
  { value: "HXFL", label: "HXFL Series" },
  { value: "HXL", label: "HXL Series" },
  { value: "HXOL", label: "HXOL Series" },
  { value: "HXRL", label: "HXRL Series" },
  { value: "HXSL", label: "HXSL Series" },
  { value: "LVT", label: "LVT Series" },
];

const MIN_HOT_BY_WATTS: Record<number, number> = {
  500: 5,
  1000: 6,
  2000: 10,
  3000: 12,
  4000: 19,
  5000: 20,
  6000: 22,
  8000: 36,
  9000: 40,
  12000: 38,
  15000: 47,
  18000: 55,
};

const MATERIAL_OPTIONS_BY_SERIES: Record<string, { value: string; label: string }[]> = {
  "9HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "6HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "3HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "3HXO": [{ value: "PTFE", label: "PTFE Covered" }],
  "HXT": [{ value: "PTFE", label: "PTFE Covered" }],
  default: [
    { value: "304SS", label: "304 Stainless" },
    { value: "316SS", label: "316 Stainless" },
    { value: "Titanium", label: "Titanium" },
  ],
};

const HXO_STYLE_SERIES = ["HXOL", "HXRL", "HXSL"];

type HeaterRule = {
  minHot: number;
  minOAL?: number;
  partNumberCode?: string;
};

type SeriesRuleMap = Record<string, Record<number, HeaterRule>>;

// key format = watts only
const SERIES_SPEC_RULES: SeriesRuleMap = {
  HXFL: {
    500: { minHot: 5, minOAL: 12, partNumberCode: "05" },
    1000: { minHot: 6, minOAL: 12, partNumberCode: "06" },
    2000: { minHot: 8, minOAL: 18, partNumberCode: "08" },
    3000: { minHot: 9, minOAL: 18, partNumberCode: "09" },
    4000: { minHot: 11, minOAL: 18, partNumberCode: "11" },
    5000: { minHot: 12, minOAL: 18, partNumberCode: "12" },
    6000: { minHot: 13, minOAL: 18, partNumberCode: "13" },
  },

  HXL: {
    500: { minHot: 6, minOAL: 12, partNumberCode: "05" },
    1000: { minHot: 8, minOAL: 12, partNumberCode: "06" },
    2000: { minHot: 12, minOAL: 18, partNumberCode: "08" },
    3000: { minHot: 17, minOAL: 18, partNumberCode: "09" },
    4000: { minHot: 20, minOAL: 18, partNumberCode: "11" },
    5000: { minHot: 24, minOAL: 18, partNumberCode: "12" },
    6000: { minHot: 29, minOAL: 18, partNumberCode: "13" },
    8000: { minHot: 37, minOAL: 18, partNumberCode: "13" },
    9000: { minHot: 44, minOAL: 18, partNumberCode: "13" },
  },
};

const getVoltageCode = (voltage: number) => {
  const map: Record<number, string> = {
    120: "1",
    208: "8",
    240: "2",
    380: "3",
    415: "5",
    480: "4",
    600: "6",
  };
  return map[voltage] ?? String(voltage);
};

const getWattCode = (watts: number) => {
  const map: Record<number, string> = {
    500: ".5",
    1000: "1",
    2000: "2",
    3000: "3",
    4000: "4",
    5000: "5",
    6000: "6",
    8000: "8",
    9000: "9",
    12000: "12",
    15000: "15",
    18000: "18",
  };
  return map[watts] ?? String(watts);
};

const buildPartNumber = ({
  series,
  watts,
  voltage,
  protector,
  hotLength,
  OAL,
}: {
  series: string;
  watts: number;
  voltage: number;
  protector: string;
  hotLength: number;
  OAL: number;
}) => {
  const rule = SERIES_SPEC_RULES[series]?.[watts];

  if (series === "HXFL" || series === "HXL") {
    const diameterCode =
      rule?.partNumberCode ?? String(Math.round(hotLength)).padStart(2, "0");

    const oalCode = `R${Math.round(OAL)}`;

    return `IM-${series}-${getWattCode(watts)}-${getVoltageCode(voltage)}-${diameterCode}-${oalCode}-${protector}`;
  }

  return `IM-${series}-${watts}-${voltage}-${protector}`;
};

function App() {
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
  const [oalText, setOalText] = useState<string>("11.5");

  const MANUAL_OAL_SERIES = ["HXFL", "HXL", "HXFL-L"];
  const isManualOALSeries = MANUAL_OAL_SERIES.includes(seriesVar);

  const drawingRef = useRef<HTMLDivElement>(null);

  const hotLengthNum = useMemo(() => parseFloat(hotLengthText) || 0, [hotLengthText]);
  const coldLengthNum = useMemo(() => parseFloat(coldLengthText) || 0, [coldLengthText]);
  const oalNum = useMemo(() => parseFloat(oalText) || 0, [oalText]);

  const [lengthText, setLengthText] = useState<string>("9");
  const [widthText, setWidthText] = useState<string>("9");

  const isHXOStyleSeries = HXO_STYLE_SERIES.includes(seriesVar);

  const lengthNum = useMemo(() => parseFloat(lengthText) || 0, [lengthText]);
  const widthNum = useMemo(() => parseFloat(widthText) || 0, [widthText]);

  useEffect(() => {
    if (isHXOStyleSeries) {
      setLengthText(hotLengthText);
    }
  }, [hotLengthText, isHXOStyleSeries]);

  const selectedSeriesRule = SERIES_SPEC_RULES[seriesVar]?.[wattsVar];

  useEffect(() => {
    if (isHXOStyleSeries) {
      setColdLengthText("4");
    }
  }, [seriesVar]);

  const CONSTANT_OAL_BY_SERIES: Record<string, number> = {
    "3HXOL": 18,
  };

  const minHot = selectedSeriesRule?.minHot ?? (MIN_HOT_BY_WATTS[wattsVar] ?? 0);

  const OALVar = useMemo(() => {
    const baseOAL = hotLengthNum + coldLengthNum;

    // Normal heaters: always automatic
    if (!isManualOALSeries) {
      return baseOAL;
    }

    // Manual OAL heaters: user can type OAL, but must respect minimum
    const enteredOAL = parseFloat(oalText) || 0;
    const minOAL = selectedSeriesRule?.minOAL ?? 0;

    return Math.max(enteredOAL, minOAL);
  }, [
    hotLengthNum,
    coldLengthNum,
    oalText,
    selectedSeriesRule,
    isManualOALSeries,
  ]);


  const isHotLengthUnderMin = hotLengthText !== "" && hotLengthNum < minHot;
  //const isOALUnderMin = oalText !== "" && oalNum < OALVar;

  const enteredOALNum = parseFloat(oalText) || 0;

  const isOALUnderMin =
    isManualOALSeries &&
    selectedSeriesRule?.minOAL !== undefined &&
    enteredOALNum < selectedSeriesRule.minOAL;

  const isDTL = seriesVar === "DTL";
  const isLVT = seriesVar ==="LVT";
  const isDTLorLVT = isDTL || isLVT;

  const isRestrictedSeries = seriesVar === "HXFL" || seriesVar === "HXL";
  const isValidRestrictedCombo = !isRestrictedSeries || !!selectedSeriesRule;

  const hotZoneLabel = isDTLorLVT ? "Horizontal Length" : "Hot";
  const coldLabel = isDTLorLVT ? "Riser Height" : "Cold";

  useEffect(() => {
    const newMin = selectedSeriesRule?.minHot ?? (MIN_HOT_BY_WATTS[wattsVar] ?? 0);
    const newMinText = String(newMin);

    setHotLengthText(newMinText);

    if (isHXOStyleSeries) {
      setLengthText(newMinText);
      setWidthText(newMinText);
    }
  }, [wattsVar, voltsVar, seriesVar, selectedSeriesRule, isHXOStyleSeries]);

  useEffect(() => {
    setOalText(String(OALVar));
  }, [wattsVar, voltsVar, seriesVar]);

  useEffect(() => {
    const baseOAL = hotLengthNum + coldLengthNum;
    const minOAL = selectedSeriesRule?.minOAL ?? baseOAL;

    if (isManualOALSeries) {
      setOalText(String(Math.max(baseOAL, minOAL)));
    } else {
      setOalText(String(baseOAL));
    }
  }, [seriesVar, wattsVar, voltsVar]);

  const handleNumericInput = (val: string, setter: (v: string) => void) => {
    if (/^\d*\.?\d*$/.test(val)) setter(val);
  };

  const getDrawingBlob = async (): Promise<Blob> => {
    if (!drawingRef.current) throw new Error("Drawing ref not found");
    const blob = await htmlToImage.toBlob(drawingRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "white",
    });
    if (!blob) throw new Error("Failed to create image blob");
    return blob;
  };

  const copyDrawingToClipboard = async () => {
    try {
      const blob = await getDrawingBlob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      alert("Copied!");
    } catch {
      alert("Copy failed.");
    }
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
    } catch {
      alert("Download failed.");
    }
  };

  const materialOptions = useMemo(() => {
    return MATERIAL_OPTIONS_BY_SERIES[seriesVar] || MATERIAL_OPTIONS_BY_SERIES["default"];
  }, [seriesVar]);

  useEffect(() => {
    const validValues = materialOptions.map((opt) => opt.value);
    if (!validValues.includes(materialVar)) {
      setMaterial(validValues[0]);
    }
  }, [seriesVar, materialOptions, materialVar]);

  const partNumber = useMemo(() => {
    return buildPartNumber({
      series: seriesVar,
      watts: wattsVar,
      voltage: voltsVar,
      protector: protectorVar,
      hotLength: hotLengthNum,
      OAL: oalNum,
    });
  }, [seriesVar, wattsVar, voltsVar, protectorVar, hotLengthNum, oalNum]);

  return (
    <div className="flex justify-center mt-5 w-screen gap-6">
      <div className="w-96 bg-white p-4 border-2 border-slate-400 rounded-lg text-gray-700 overflow-y-auto max-h-[95vh] shadow-xl">
        {/* Serial & Title */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Serial Number</h1>
            <input
              type="text"
              value={serialNum}
              onChange={(e) => setSerialNum(e.target.value)}
              className="input input-bordered border-cyan-500 input-xs w-full"
            />
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Title</h1>
            <input
              type="text"
              value={titleVar}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered border-cyan-500 input-xs w-full"
            />
          </div>
        </div>

        {/* Electrical */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Volts</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={voltsVar}
              onChange={(e) => setVoltage(Number(e.target.value))}
            >
              {[120, 208, 240, 380, 415, 480, 600].map((v) => (
                <option key={v} value={v}>
                  {v}V
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Watts</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={wattsVar}
              onChange={(e) => setWattage(Number(e.target.value))}
            >
              {Object.keys(MIN_HOT_BY_WATTS).map((w) => (
                <option key={w} value={w}>
                  {w}W
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Phase</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={phaseVar}
              onChange={(e) => setPhase(Number(e.target.value))}
            >
              <option value={1}>1Ø</option>
              <option value={3}>3Ø</option>
            </select>
          </div>
        </div>

        {!isValidRestrictedCombo && (
          <p className="text-red-500 text-xs mb-4 font-bold">
            This wattage / voltage combination is not available for {seriesVar}.
          </p>
        )}

        {/* Series + Material */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <SearchSelect label="Series" value={seriesVar} onChange={setSeries} options={SERIES_OPTIONS} />
          <SearchSelect label="Material" value={materialVar} onChange={setMaterial} options={materialOptions} />
        </div>

        {/* Protector */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Protector</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={protectorVar}
              onChange={(e) => setProtector(e.target.value)}
            >
              <option value="P1">P1 - 180°F (82°C)</option>
              <option value="P2">P2 - 190°F (88°C)</option>
              <option value="P3">P3 - 250°F (121°C)</option>
              <option value="P4">P4 - 230°F (110°C)</option>
              <option value="P5">P5 - 300°F (150°C)</option>
              <option value="P6">P6 - 230°F (110°C)</option>
              <option value="P7">P7 - 300°F (150°C)</option>
              <option value="P8">P8 - 210°F (99°C)</option>
            </select>
          </div>
        </div>

 {/* Lengths */}
<div
  className={`grid ${
    isHXOStyleSeries ? "grid-cols-5" : isDTLorLVT ? "grid-cols-2" : "grid-cols-3"
  } gap-3 mb-4`}
>
  <div className="relative">
    <h1 className="text-xs font-bold uppercase text-slate-500">{hotZoneLabel}</h1>
    <input
      type="text"
      value={hotLengthText}
      onChange={(e) => handleNumericInput(e.target.value, setHotLengthText)}
      className={`input input-xs w-full border ${
        isHotLengthUnderMin ? "border-red-500" : "border-cyan-500"
      }`}
    />
    {isHotLengthUnderMin && (
      <p className="text-[10px] text-red-500 absolute -bottom-4">Min: {minHot}"</p>
    )}
  </div>

  <div>
    <h1 className="text-xs font-bold uppercase text-slate-500">{coldLabel}</h1>
    <input
      type="text"
      value={coldLengthText}
      onChange={(e) => handleNumericInput(e.target.value, setColdLengthText)}
      className="input input-xs w-full border-cyan-500"
    />
  </div>

  {isHXOStyleSeries && (
    <>
      <div>
        <h1 className="text-xs font-bold uppercase text-slate-500">Length</h1>
        <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold">
          {lengthText}
        </div>
      </div>

      <div>
        <h1 className="text-xs font-bold uppercase text-slate-500">Width</h1>
        <input
          type="text"
          value={widthText}
          onChange={(e) => handleNumericInput(e.target.value, setWidthText)}
          className="input input-xs w-full border-cyan-500"
        />
      </div>
    </>
  )}

          {!isDTLorLVT && !isHXOStyleSeries && (
            <div className="relative">
              <h1 className="text-xs font-bold uppercase text-slate-500">OAL</h1>

              {isManualOALSeries ? (
                <>
                  <input
                    type="text"
                    value={oalText}
                    onChange={(e) => handleNumericInput(e.target.value, setOalText)}
                    className={`input input-xs w-full border ${
                      isOALUnderMin ? "border-red-500" : "border-cyan-500"
                    }`}
                  />
                  {isOALUnderMin && (
                    <p className="text-[10px] text-red-500 absolute -bottom-4">
                      Min: {selectedSeriesRule?.minOAL}"
                    </p>
                  )}
                </>
              ) : (
                <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold">
                  {OALVar.toFixed(1)}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Part Number */}
        <div className="mb-4">
          <h1 className="text-xs font-bold uppercase text-slate-500">Part Number</h1>
          <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold break-all">
            {partNumber}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <button className="btn btn-sm w-full btn-info" onClick={copyDrawingToClipboard}>
            Copy Drawing PNG
          </button>
          <button className="btn btn-sm w-full btn-outline" onClick={downloadDrawingPng}>
            Download Drawing PNG
          </button>
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
        OAL={oalNum}
        coldLength={coldLengthNum}
        hotLength={hotLengthNum}
        length={lengthNum}
        width={widthNum}
        elementCount={1}
        series={seriesVar}
        protector={protectorVar}
      />
    </div>
  );
}

export default App;