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
  { value: "DTM", label: "DTM Series" },
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

const WATT_OPTIONS = [
  500, 1000, 1500, 2000, 2500, 3000, 4000, 4500, 5000, 6000, 7500, 8000, 9000, 
  10000, 10500, 12000, 13500, 15000, 18000, 21000, 22500, 24000, 27000, 30000, 31500, 36000,
];

const MIN_HOT_BY_WATTS: Record<number, number> = {
  3000: 9, 4500: 15, 6000: 21, 9000: 28, 12000: 38, 15000: 47, 18000: 55,
};

const MIN_HOT_BY_SERIES_AND_WATTS: Record<string, Record<number, number>> = {
  "9HX": { 3000: 9, 4500: 15, 6000: 21, 9000: 28, 12000: 38, 15000: 47, 18000: 55 },
  "9HS": { 9000: 10, 13500: 16, 22500: 20, 31500: 25 },
  "6HX": { 2000: 9, 3000: 15, 4000: 21, 6000: 28, 8000: 38, 10000: 47, 12000: 55 },
  "6HS": { 6000: 10, 9000: 16, 15000: 20, 21000: 25 },
  "3HX": { 1000: 10, 1500: 16, 2000: 22, 3000: 29, 4000: 39, 5000: 48, 6000: 56 },
  "3HS": { 3000: 11, 4500: 16, 7500: 21, 10500: 26 },
  "3HXO": { 1500: 6, 3000: 6, 4500: 9.5, 6000: 10.5, 9000: 16, 12000: 20.5, 15000: 25, 18000: 29 },
  "DTM": { 3000: 6, 6000: 10, 9000: 16, 12000: 20, 15000: 25, 18000: 30, 24000: 37, 27000: 44, 30000: 49, 36000: 58 },
  "MOTS": { 1000: 6, 2000: 10, 3000: 16, 4000: 20, 5000: 25, 6000: 30, 8000: 37, 9000: 44, 10000: 49, 12000: 58 },
  "MOTS Single": { 500: 6, 1000: 10, 1500: 16, 2000: 20, 2500: 25, 3000: 30, 4000: 37, 4500: 44, 5000: 49, 6000: 58 },
  "T": { 1000: 7.5, 2000: 11.5, 3000: 16.5, 4000: 20.5, 6000: 30.5, 8000: 37.5, 9000: 44.5, 12000: 58.5 },
  "DTL": { 1500: 13, 3000: 17, 4500: 22, 6000: 26, 7500: 31, 9000: 36, 12000: 44, 13500: 50, 15000: 55, 18000: 64 },
  "LVT": { 3000: 13, 6000: 17, 9000: 22, 12000: 26, 15000: 31, 18000: 36, 24000: 44, 27000: 50, 30000: 55, 36000: 64 },
  "HXOL": { 1000: 0, 2000: 0, 3000: 0, 4000: 0, 5000: 0, 6000: 0 },
  "HXRL": { 1000: 0, 2000: 0, 3000: 0, 4000: 0, 5000: 0, 6000: 0 },
  "HXSL": { 1000: 0, 2000: 0, 3000: 0, 4000: 0, 5000: 0, 6000: 0 },
};

const MIN_WIDTH_BY_SERIES_AND_WATTS: Record<string, Record<number, number>> = {
  "3HXO": { 1500: 10.5, 3000: 11, 4500: 11, 6000: 13, 9000: 13, 12000: 13, 15000: 13, 18000: 13 },
};

const getRestrictedWattOptionsForSeries = (series: string): number[] => {
  const minHotWatts = Object.keys(MIN_HOT_BY_SERIES_AND_WATTS[series] || {}).map(Number);
  const minWidthWatts = Object.keys(MIN_WIDTH_BY_SERIES_AND_WATTS[series] || {}).map(Number);
  const specRuleWatts = Object.keys(SERIES_SPEC_RULES[series] || {}).map(Number);

  const combined = [...new Set([...minHotWatts, ...minWidthWatts, ...specRuleWatts])]
    .sort((a, b) => a - b);

  return combined;
};

const MATERIAL_OPTIONS_BY_SERIES: Record<string, { value: string; label: string }[]> = {
  "9HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "6HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "3HX": [{ value: "PTFE", label: "PTFE Covered" }],
  "3HXO": [{ value: "PTFE", label: "PTFE Covered" }],
  "HXT": [{ value: "PTFE", label: "PTFE Covered" }],
  default: [
    { value: "Steel", label: "Steel" },
    { value: "304SS", label: "304 Stainless" },
    { value: "316SS", label: "316 Stainless" },
    { value: "Titanium", label: "Titanium" },
  ],
};

const HXO_STYLE_SERIES = ["HXOL", "HXRL", "HXSL"];
const MATCH_LENGTH_TO_HOT_SERIES = ["HXOL", "HXRL"];
const MANUAL_OAL_SERIES = ["HXFL", "HXL", "HXFL-L", "3HXOL"];

type HeaterRule = { minHot: number; minOAL?: number; partNumberCode?: string; };
type SeriesRuleMap = Record<string, Record<number, HeaterRule>>;

const SERIES_SPEC_RULES: SeriesRuleMap = {
  "3HXOL": {
    3000: { minHot: 13, minOAL: 18, partNumberCode: "05" },
    4500: { minHot: 11, minOAL: 18, partNumberCode: "06" },
    6000: { minHot: 19, minOAL: 18, partNumberCode: "08" },
    9000: { minHot: 23, minOAL: 18, partNumberCode: "09" },
    12000: { minHot: 30, minOAL: 18, partNumberCode: "11" },
    15000: { minHot: 36, minOAL: 18, partNumberCode: "12" },
    18000: { minHot: 42, minOAL: 18, partNumberCode: "13" },
  },
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

// --- PART NUMBER ENGINE START ---
export type PartNumberParams = {
  series: string;
  watts: number;
  voltage: number;
  phase: number;
  protector: string;
  hotLength: number;
  coldLength: number;
  OAL: number;
  width: number;
  length: number;
  material:string;
  wireLength?: string;
  elementCount?: number;
  riserLocation?: string;
  riserType?: string;
  riserLength?: string;
};

const getVoltageCode = (voltage: number) => {
  const map: Record<number, string> = {
    120: "1", 200: "0", 208: "8", 220: "9", 240: "2",
    380: "3", 400: "7", 415: "5", 480: "4", 600: "6",
  };
  return map[voltage] ?? String(voltage);
};

const getWattCode = (watts: number) => {
  const map: Record<number, string> = {
    500: ".5", 1000: "1", 2000: "2", 3000: "3", 4000: "4",
    5000: "5", 6000: "6", 8000: "8", 9000: "9", 12000: "12",
    13500: "13.5", 15000: "15", 18000: "18", 22500: "22.5", 31500: "31.5",
  };
  return map[watts] ?? (watts < 1000 ? `.${watts.toString().padStart(3, "0")}` : (watts / 1000).toString());
};

const PART_NUMBER_RULES: Record<string, (p: PartNumberParams) => string> = {
  
  // Restricted Series Logic
  "DTM": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "-1" : "-3";

    const materialMap: Record<string, string> = {
      "Steel": "3P",
      "304SS": "3F",
      "316SS": "3S",
      "Titanium": "3T",
    };
    const materialCode = materialMap[p.material] || "";
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${materialCode}${wattCode}${voltCode}${oalCode}${phaseCode}${protCode}${wireCode}`;
  },
  "MOTS Single": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "" : "-3";

    const materialMap: Record<string, string> = {
      "Steel": "P",
      "304SS": "F",
      "316SS": "S",
      "Titanium": "T",
    };
    const materialCode = materialMap[p.material] || "";
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${materialCode}${wattCode}${voltCode}${oalCode}${phaseCode}${protCode}${wireCode}`;
  },
  "MOTS": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "" : "-3";

    const materialMap: Record<string, string> = {
      "Steel": "P",
      "304SS": "F",
      "316SS": "S",
      "Titanium": "T",
    };
    const materialCode = materialMap[p.material] || "";
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${materialCode}${wattCode}${voltCode}${oalCode}${phaseCode}${protCode}${wireCode}`;
  },

  "T": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "" : "-3";
    const materialMap: Record<string, string> = {
      "304SS": "FT",
      "316SS": "ST",
      "Titanium": "TT",
    };
    const materialCode = materialMap[p.material] || "";
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${materialCode}${wattCode}${voltCode}${oalCode}${phaseCode}${wireCode}`;
  },

  "3HXOL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const phaseCode = p.phase === 1 ? "-1" : "";
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const widthcode = p.width
    const hotLength = p.hotLength
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${p.series}${wattCode}${voltCode}${widthcode}-${hotLength}-R${oalCode}${phaseCode}${protCode}${wireCode}`;
  },

  "HXFL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const hotLength = p.hotLength
    // Add custom logic/constants for specific series below by copying this structure, 
    return `IM-${p.series}${wattCode}${voltCode}${hotLength}-R${oalCode}${protCode}${wireCode}`;
  },

  "HXL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL;
    const hotLength = p.hotLength;

    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";

    const elementMap: Record<number, string> = {
      1: "HXL",
      2: "2HXL", 
    };

    const elementCode = p.elementCount
      ? elementMap[p.elementCount] || ""
      : "";

    return `IM-${elementCode}${wattCode}${voltCode}${hotLength}-R${oalCode}${protCode}${wireCode}`;
  },

  "HXOL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    //const phaseCode = p.phase === 1 ? "-1" : "-3";
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const widthcode = p.width
    const hotLength = p.hotLength
    const Riser = p.riserLocation
    const riserCode = `-${p.riserType || "R"}${p.riserLength || ""}`; 
    return `IM-${p.series}${wattCode}${voltCode}${widthcode}-${hotLength}${Riser}${riserCode}${protCode}${wireCode}`;
  },

  "HXRL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    //const phaseCode = p.phase === 1 ? "-1" : "-3";
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const widthcode = p.width
    const hotLength = p.hotLength
    const Riser = p.riserLocation
    const riserCode = `-${p.riserType || "R"}${p.riserLength || ""}`;
    return `IM-${p.series}${wattCode}${voltCode}${widthcode}-${hotLength}${Riser}${riserCode}${protCode}${wireCode}`;
  },

  "HXSL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    //const phaseCode = p.phase === 1 ? "-1" : "-3";
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const widthcode = p.width
    const hotLength = p.hotLength
    const Riser = p.riserLocation
    const riserCode = `-${p.riserType || "R"}${p.riserLength || ""}`;
    return `IM-${p.series}${wattCode}${voltCode}${widthcode}-${hotLength}${Riser}${riserCode}${protCode}${wireCode}`;
  },


  "LVT": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const hotLength = p.hotLength;
    const coldLength = p.coldLength;

    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "-1" : "";

    const materialMap: Record<string, string> = {
      "Steel": "3LVP",
      "304SS": "3LVF",
      "316SS": "3LVS",
      "Titanium": "3LVT",
    };
    const materialCode = materialMap[p.material] || "";

    // ✅ Riser logic
    let riserCode = "";

    if (p.riserType === "S") {
      riserCode = "S";
    } else {
      // blank = standard 90 bend → no code
      riserCode = "";
    }

    return `IM-${materialCode}${wattCode}${voltCode}${hotLength}-R${coldLength}${riserCode}${phaseCode}${protCode}${wireCode}`;
  },

  "DTL": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const hotLength = p.hotLength;
    const coldLength = p.coldLength;

    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const phaseCode = p.phase === 1 ? "-1" : "";

    const materialMap: Record<string, string> = {
      "Steel": "D3LP",
      "304SS": "D3LF",
      "316SS": "D3LS",
      "Titanium": "D3LT",
    };
    const materialCode = materialMap[p.material] || "";

    // ✅ Riser logic
    let riserCode = "";

    if (p.riserType === "S") {
      riserCode = "S";
    } else {
      // blank = standard 90 bend → no code
      riserCode = "";
    }

    return `IM-${materialCode}${wattCode}${voltCode}${hotLength}-R${coldLength}${riserCode}${phaseCode}${protCode}${wireCode}`;
  },


  // General format used by old headers.tsx (e.g., 9HX, 6HX, etc.)
  "default": (p) => {
    const wattCode = getWattCode(p.watts);
    const voltCode = getVoltageCode(p.voltage);
    const oalCode = p.OAL
    //const phaseCode = p.phase === 1 ? "-1" : "-3";
    const protCode = p.protector ? `-${p.protector}` : "";
    const wireCode = p.wireLength ? `-X${p.wireLength}` : "";
    const widthcode = p.width
    // Add custom logic/constants for specific series below by copying this structure, 
    // or just let them fall into this default format:
    return `IM-${p.series}${wattCode}${voltCode}${widthcode}${oalCode}${protCode}${wireCode}`;
  }
};

const generatePartNumber = (params: PartNumberParams): string => {
  const builderFunc = PART_NUMBER_RULES[params.series] || PART_NUMBER_RULES["default"];
  return builderFunc(params);
};
// --- PART NUMBER ENGINE END ---


const SERIES_WITH_WIDTH = ["3HXO", "3HXOL"]; // Add your series here

function App() {
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<number>(240);
  const [wattsVar, setWattage] = useState<number>(3000);
  const [phaseVar, setPhase] = useState<number>(1);
  const [materialVar, setMaterial] = useState<string>("304SS");
  const [seriesVar, setSeries] = useState<string>("9HX");
  const [protectorVar, setProtector] = useState<string>("P1");
  const [elementCountVar, setElementCount] = useState<number>(1);

  const [hotLengthText, setHotLengthText] = useState<string>("9");
  const [coldLengthText, setColdLengthText] = useState<string>("2.5");
  const [oalText, setOalText] = useState<string>("11.5");

  const [lengthText, setLengthText] = useState<string>("9");
  const [widthText, setWidthText] = useState<string>("9");

  const [riserLocation] = useState<string>("R"); 
  const [riserType, setRiserType] = useState<string>("R"); // R or FR
  const [riserLength, setRiserLength] = useState<string>("48"); // always used

  const drawingRef = useRef<HTMLDivElement>(null);

  const hotLengthNum = useMemo(() => parseFloat(hotLengthText) || 0, [hotLengthText]);
  const coldLengthNum = useMemo(() => parseFloat(coldLengthText) || 0, [coldLengthText]);
  const enteredOALNum = useMemo(() => parseFloat(oalText) || 0, [oalText]);
  const lengthNum = useMemo(() => parseFloat(lengthText) || 0, [lengthText]);
  const widthNum = useMemo(() => parseFloat(widthText) || 0, [widthText]);

  const isHXOStyleSeries = HXO_STYLE_SERIES.includes(seriesVar);
  const shouldMatchLengthToHot = MATCH_LENGTH_TO_HOT_SERIES.includes(seriesVar);
  const isManualOALSeries = MANUAL_OAL_SERIES.includes(seriesVar);

  const selectedSeriesRule = SERIES_SPEC_RULES[seriesVar]?.[wattsVar];

  const [wireLenVar, setWireLen] = useState<string>("");

  const showWidthInput = SERIES_WITH_WIDTH.includes(seriesVar);

  const minHot =
    MIN_HOT_BY_SERIES_AND_WATTS[seriesVar]?.[wattsVar] ??
    selectedSeriesRule?.minHot ??
    MIN_HOT_BY_WATTS[wattsVar] ??
    0;

  const minWidth =
    MIN_WIDTH_BY_SERIES_AND_WATTS[seriesVar]?.[wattsVar] ??
    0;

  const minOAL = selectedSeriesRule?.minOAL ?? 0;

  const OALVar = useMemo(() => {
    if (isManualOALSeries) {
      return Math.max(enteredOALNum, minOAL);
    }
    return hotLengthNum + coldLengthNum;
  }, [isManualOALSeries, enteredOALNum, minOAL, hotLengthNum, coldLengthNum]);

  const isHotLengthUnderMin = hotLengthText !== "" && hotLengthNum < minHot;
  const isWidthUnderMin = widthText !== "" && widthNum < minWidth;

  const wattOptions = useMemo(() => {
    const restrictedWatts = getRestrictedWattOptionsForSeries(seriesVar);

    if (restrictedWatts.length > 0) {
      return restrictedWatts;
    }

    return WATT_OPTIONS;
  }, [seriesVar]);

  const isOALUnderMin =
    isManualOALSeries &&
    selectedSeriesRule?.minOAL !== undefined &&
    enteredOALNum < selectedSeriesRule.minOAL;

  const isDTL = seriesVar === "DTL";
  const isLVT = seriesVar === "LVT";
  const isDTLorLVT = isDTL || isLVT;

  const isRestrictedSeries = seriesVar === "HXFL" || seriesVar === "HXL";
  const isValidRestrictedCombo = !isRestrictedSeries || !!selectedSeriesRule;

  const hotZoneLabel = isDTLorLVT ? "Horizontal Length" : "Hot";
  const coldLabel = isDTLorLVT ? "Riser Height" : "Cold";

  useEffect(() => {
    if (!wattOptions.includes(wattsVar)) {
      setWattage(wattOptions[0] ?? 500);
    }
  }, [seriesVar, wattOptions, wattsVar]);

  useEffect(() => {
    const newMinHot =
      MIN_HOT_BY_SERIES_AND_WATTS[seriesVar]?.[wattsVar] ??
      selectedSeriesRule?.minHot ??
      MIN_HOT_BY_WATTS[wattsVar] ??
      0;

    const newMinHotText = String(newMinHot);

    setHotLengthText(newMinHotText);

    if (shouldMatchLengthToHot) {
      setLengthText(newMinHotText);
    }

  if (isHXOStyleSeries || showWidthInput) {
    const newMinWidth =
      MIN_WIDTH_BY_SERIES_AND_WATTS[seriesVar]?.[wattsVar];

    if (newMinWidth !== undefined) {
      setWidthText(String(newMinWidth));
    }
  }

    if (isManualOALSeries && selectedSeriesRule?.minOAL !== undefined) {
      setOalText(String(selectedSeriesRule.minOAL));
    }
  }, [
    wattsVar,
    voltsVar,
    seriesVar,
    selectedSeriesRule,
    shouldMatchLengthToHot,
    isHXOStyleSeries,
    isManualOALSeries,
  ]);

  useEffect(() => {
    if (shouldMatchLengthToHot) {
      setLengthText(hotLengthText);
    }
  }, [hotLengthText, shouldMatchLengthToHot]);

  const materialOptions = useMemo(() => {
    return MATERIAL_OPTIONS_BY_SERIES[seriesVar] || MATERIAL_OPTIONS_BY_SERIES["default"];
  }, [seriesVar]);

  useEffect(() => {
    const validValues = materialOptions.map((opt) => opt.value);
    if (!validValues.includes(materialVar)) {
      setMaterial(validValues[0]);
    }
  }, [seriesVar, materialOptions, materialVar]);

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

  const partNumber = useMemo(() => {
    return generatePartNumber({
      series: seriesVar,
      watts: wattsVar,
      voltage: voltsVar,
      phase: phaseVar,
      protector: protectorVar,
      hotLength: hotLengthNum,
      coldLength: coldLengthNum,
      OAL: OALVar,
      width: widthNum,
      length: lengthNum,
      material: materialVar,
      wireLength: wireLenVar,
      elementCount: elementCountVar,
      riserLocation: riserLocation,
      riserType: riserType,
      riserLength: riserLength,
    });
  }, [seriesVar, wattsVar, voltsVar, phaseVar, protectorVar, hotLengthNum, coldLengthNum, OALVar, widthNum, lengthNum, wireLenVar, materialVar, elementCountVar, riserLocation, riserType, riserLength]);

return (
    <div className="flex justify-center mt-5 w-screen gap-6">
      <div className="w-96 bg-white p-4 border-2 border-slate-400 rounded-lg text-gray-700 overflow-y-auto max-h-[95vh] shadow-xl">
        {/* TOP ROW: SERIAL & TITLE */}
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

        {/* SECOND ROW: VOLTS, WATTS, PHASE */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Volts</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={voltsVar}
              onChange={(e) => setVoltage(Number(e.target.value))}
            >
              {[120, 240, 380, 480, 415, 600, 400, 208, 220, 200].map((v) => (
                <option key={v} value={v}>{v}V</option>
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
              {wattOptions.map((w) => (
                <option key={w} value={w}>{w}W</option>
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
            This combination is not available for {seriesVar}.
          </p>
        )}

        {/* THIRD ROW: SERIES & MATERIAL */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <SearchSelect label="Series" value={seriesVar} onChange={setSeries} options={SERIES_OPTIONS} />
          <SearchSelect label="Material" value={materialVar} onChange={setMaterial} options={materialOptions} />
          {seriesVar === "HXL" && (
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div>
                  <h1 className="text-xs font-bold uppercase text-slate-500">
                    Element Count
                  </h1>
                  <select
                    className="select select-xs border-cyan-500 w-full"
                    value={elementCountVar}
                    onChange={(e) => setElementCount(Number(e.target.value))}
                  >
                    {[1, 2].map((n) => (
                      <option key={n} value={n}>
                        {n} Elements
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
        </div>

        {/* FOURTH ROW: PROTECTOR */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">Protector</h1>
            <select
              className="select select-xs border-cyan-500 w-full"
              value={protectorVar}
              onChange={(e) => setProtector(e.target.value)}
            >
              <option value="P1">P1 - 180°F</option>
              <option value="P2">P2 - 190°F</option>
              <option value="P3">P3 - 250°F</option>
              <option value="P4">P4 - 230°F</option>
              <option value="P5">P5 - 300°F</option>
            </select>
          </div>
        </div>


        {(seriesVar === "HXOL" || seriesVar === "HXRL" || seriesVar === "LVT" || seriesVar === "DTL") && (
          <div className="grid grid-cols-1 gap-3 mb-4">

            {/* TYPE */}
            <div>
              <h1 className="text-xs font-bold uppercase text-slate-500">
                Riser Type
              </h1>
              <select
                className="select select-xs border-cyan-500 w-full"
                value={riserType}
                onChange={(e) => setRiserType(e.target.value)}
                >
                {(seriesVar === "LVT" || seriesVar === "DTL") ? (
                  <>
                    <option value="">90° Bend (Std)</option>
                    <option value="S">Straight (S)</option>
                  </>
                ) : (
                  <>
                    <option value="R">Rigid (R)</option>
                    <option value="FR">Flex (FR)</option>
                  </>
                )}
              </select>
            </div>

            {/* LENGTH (ALWAYS) */}
            <div>
              <h1 className="text-xs font-bold uppercase text-slate-500">
                Riser Length (inches)
              </h1>
              <input
                type="text"
                value={riserLength}
                onChange={(e) => handleNumericInput(e.target.value, setRiserLength)}
                className="input input-xs w-full border-cyan-500"
                placeholder="e.g. 48"
              />
            </div>

          </div>
        )}


        {/* DIMENSIONS GRID - This is the part that usually breaks */}
        <div
          className={`grid gap-3 mb-4 ${
            isHXOStyleSeries ? "grid-cols-4" : (showWidthInput || isDTLorLVT) ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {/* HOT */}
          <div className="relative">
            <h1 className="text-xs font-bold uppercase text-slate-500">{hotZoneLabel}</h1>
            <input
              type="text"
              value={hotLengthText}
              onChange={(e) => handleNumericInput(e.target.value, setHotLengthText)}
              className={`input input-xs w-full border ${isHotLengthUnderMin ? "border-red-500" : "border-cyan-500"}`}
            />
            {isHotLengthUnderMin && (
              <p className="text-[10px] text-red-500 absolute -bottom-4">Min: {minHot}"</p>
            )}
          </div>

          {/* COLD */}
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">{coldLabel}</h1>
            <input
              type="text"
              value={coldLengthText}
              onChange={(e) => handleNumericInput(e.target.value, setColdLengthText)}
              className="input input-xs w-full border-cyan-500"
            />
          </div>

          {/* WIDTH (Shows if HXO OR if it's a special Width-enabled drawing) */}
          {(isHXOStyleSeries || showWidthInput) && (
            <div className="relative">
              <h1 className="text-xs font-bold uppercase text-slate-500">Width</h1>
              <input
                type="text"
                value={widthText}
                onChange={(e) => handleNumericInput(e.target.value, setWidthText)}
                className={`input input-xs w-full border ${
                  isWidthUnderMin ? "border-red-500" : "border-cyan-500"
                }`}
              />

              {isWidthUnderMin && (
                <p className="text-[10px] text-red-500 absolute -bottom-4">
                  Min: {minWidth}"
                </p>
              )}
            </div>
          )}

          {/* LENGTH (Only for HXO Style) */}
          {isHXOStyleSeries && (
            <div>
              <h1 className="text-xs font-bold uppercase text-slate-500">Length</h1>
              {shouldMatchLengthToHot ? (
                <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold">
                  {lengthText}
                </div>
              ) : (
                <input
                  type="text"
                  value={lengthText}
                  onChange={(e) => handleNumericInput(e.target.value, setLengthText)}
                  className="input input-xs w-full border-cyan-500"
                />
              )}
            </div>
          )}

          {/* OAL (Hidden for L-shapes) */}
          {!isDTLorLVT && !isHXOStyleSeries && (
            <div className="relative">
              <h1 className="text-xs font-bold uppercase text-slate-500">OAL</h1>
              {isManualOALSeries ? (
                <>
                  <input
                    type="text"
                    value={oalText}
                    onChange={(e) => handleNumericInput(e.target.value, setOalText)}
                    className={`input input-xs w-full border ${isOALUnderMin ? "border-red-500" : "border-cyan-500"}`}
                  />
                </>
              ) : (
                <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold">
                  {OALVar.toFixed(1)}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* WIRE & CONDUIT LENGTH */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div>
            <h1 className="text-xs font-bold uppercase text-slate-500">
              Wire & Conduit Length
            </h1>
            <input
              type="text"
              value={wireLenVar}
              onChange={(e) => setWireLen(e.target.value)}
              className="input input-bordered border-cyan-500 input-xs w-full"
            />
          </div>
        </div>

        {/* PART NUMBER DISPLAY */}
        <div className="mb-4">
          <h1 className="text-xs font-bold uppercase text-slate-500">Part Number</h1>
          <div className="input input-xs w-full bg-slate-100 flex items-center px-2 font-bold break-all">
            {partNumber}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 space-y-2">
          <button className="btn btn-sm w-full btn-info" onClick={copyDrawingToClipboard}>
            Copy Drawing PNG
          </button>
          <button className="btn btn-sm w-full btn-outline" onClick={downloadDrawingPng}>
            Download Drawing PNG
          </button>
        </div>
      </div>

      {/* THE DRAWING COMPONENT */}
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
        length={lengthNum}
        width={widthNum}
        elementCount={elementCountVar}
        series={seriesVar}
        protector={protectorVar}
        partNumber={partNumber}
        wireLen={wireLenVar}
      />
    </div>
  );
}

export default App;