import { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

function App() {
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<number>(120);
  const [wattsVar, setWattage] = useState<number>(500);

  // ✅ phase is 1 or 3 (to match amps math + display)
  const [phaseVar, setPhase] = useState<number>(1);

  const [terminalBoxVar, setTerminalBox] = useState<string>("N1");
  const [materialVar, setMaterial] = useState<string>("304SS");

  const [foldLengthVar, setFoldLength] = useState<number>(0);
  const [coldLengthText, setColdLengthText] = useState<string>("2.5");

  // numeric value you pass to Drawing
  const coldLength = Number.parseFloat(coldLengthText);
  const coldLengthNum = Number.isFinite(coldLength) ? coldLength : 0;

  const [elementCount, setElementCount] = useState<number>(1);

  // ✅ Process thermowell (expanded)
  const [processType, setProcessType] = useState<string>("nT"); // nT | J | K | RTD | SPST | DPST
  const [processRange, setProcessRange] = useState<string>(""); // SPST: "C:0,40"  DPST: "F:0,100"
  const [processLength, setProcessLength] = useState<number>(8);

  // ✅ High Limit thermowell (expanded)
  const [hlType, setHLType] = useState<string>("nHL"); // nHL | J | K | RTD | SPST | DPST
  const [hlRange, setHLRange] = useState<string>("");
  const [hlLength, setHLLength] = useState<number>(8);
  //const [typeThermostat, setTypeThermostat] = useState<string>("");

  const [seriesVar, setSeries] = useState<string>("9HX");

  // Use text so user can type decimals cleanly, same style as your coldLength
  const [hotLengthText, setHotLengthText] = useState<string>("9");

  const hotLength = Number.parseFloat(hotLengthText);
  const hotLengthNum = Number.isFinite(hotLength) ? hotLength : 0;

  // computed OAL
  const OALVar = hotLengthNum + coldLengthNum;


  const drawingRef = useRef<HTMLDivElement>(null);
  const dpstActive = processType === "DPST" || hlType === "DPST";

  const [protectorVar, setProtector] = useState<string>("P1"); // P1/P2/P3/P8
  const [wireLenVar, setWireLen] = useState<string>(""); // like "X60" optional


  async function getDrawingBlob(): Promise<Blob> {
    if (!drawingRef.current) throw new Error("Drawing ref not found");
    const blob = await htmlToImage.toBlob(drawingRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "white",
    });
    if (!blob) throw new Error("Failed to create image blob");
    return blob;
  }

  async function copyDrawingToClipboard() {
    try {
      const blob = await getDrawingBlob();
      const ClipboardItemCtor = (window as any).ClipboardItem;
      if (!ClipboardItemCtor || !navigator.clipboard?.write) {
        alert("Clipboard image copy not supported here. Use Download instead.");
        return;
      }
      await navigator.clipboard.write([
        new ClipboardItemCtor({ "image/png": blob }),
      ]);
      alert("Copied drawing to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Copy failed. (Often needs HTTPS or localhost)");
    }
  }

  async function downloadDrawingPng() {
    try {
      const blob = await getDrawingBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `heater-drawing-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  }

  useEffect(() => {
    if (dpstActive && terminalBoxVar !== "N4") {
      setTerminalBox("N4");
    }
  }, [dpstActive, terminalBoxVar]);

  useEffect(() => {
    const minHot = MIN_HOT_BY_WATTS[wattsVar] ?? 0;

    // if current hot length is below min, bump it up
    if (hotLengthNum < minHot) {
      setHotLengthText(String(minHot));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wattsVar]);


  // thermostat ranges (same set you listed)
  const spstRanges = [
    "C:-30,30",
    "C:0,40",
    "C:0,50",
    "C:0,80",
    "C:0,90",
    "C:0,120",
    "C:0,150",
    "C:0,200",
    "C:0,250",
    "C:0,320",
  ];

  const dpstRanges = ["F:0,100", "F:6,250", "F:50,550"];

  const cToF = (c: number) => (c * 9) / 5 + 32;
const fToC = (f: number) => ((f - 32) * 5) / 9;

function formatRangeLabel(range: string) {
  // range examples: "C:0,40" or "F:0,100"
  const m = range.match(/^([CF]):(-?\d+),(-?\d+)$/);
  if (!m) return range;

  const unit = m[1];
  const a = Number(m[2]);
  const b = Number(m[3]);

  if (unit === "C") {
    const f1 = Math.round(cToF(a));
    const f2 = Math.round(cToF(b));
    return `${a}–${b}°C (${f1}–${f2}°F)`;
  } else {
    const c1 = Math.round(fToC(a));
    const c2 = Math.round(fToC(b));
    return `${a}–${b}°F (${c1}–${c2}°C)`;
  }
}

// --- PTFE standard mins (from your table) ---
const MIN_HOT_BY_WATTS: Record<number, number> = {
  3000: 9,
  4500: 15,
  6000: 21,
  9000: 28,
  12000: 38,
  15000: 47,
  18000: 55,
};

// wattage “code” shown in the order code example (3, 4.5, 6, 9, 12, 15, 18)
function wattCode(w: number) {
  if (w === 4500) return "4.5";
  return String(w / 1000); // 3000->"3", 6000->"6", 12000->"12", etc.
}

// voltage code table from your sheet
const VOLT_CODE: Record<number, string> = {
  120: "1",
  240: "2",
  380: "3",
  480: "4",
  415: "5",
  600: "6",
  400: "7",
  208: "8",
  220: "9",
  200: "0",
};





  return (
    <div className="flex justify-center mt-5 w-screen">
      <div className="w-96 h-[50rem] bg-white p-2 border-2 border-slate-400 rounded-lg mr-6 text-gray-700">
        <div className="flex gap-3">
          <div className="flex-1">
            <h1>Serial Number</h1>
            <input
              type="text"
              value={serialNum}
              onChange={(e) => setSerialNum(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
            />
          </div>

          <div className="flex-1">
            <h1>Title</h1>
            <input
              type="text"
              value={titleVar}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>


        <div className="flex gap-3">
          <div className="flex-1">
            <h1>Voltage</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
              value={voltsVar}
              onChange={(e) => setVoltage(Number(e.target.value))}
            >
              <option value={120}>120 V</option>
              <option value={240}>240 V</option>
              <option value={480}>480 V</option>
            </select>
          </div>

          <div className="flex-1">
            <h1>Wattage</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
              value={wattsVar}
              onChange={(e) => setWattage(Number(e.target.value))}
            >
              <option value={500}>500 W</option>
              <option value={1000}>1000 W</option>
              <option value={2000}>2000 W</option>
              <option value={3000}>3000 W</option>
              <option value={4000}>4000 W</option>
              <option value={5000}>5000 W</option>
              <option value={6000}>6000 W</option>
              <option value={8000}>8000 W</option>
              <option value={9000}>9000 W</option>
            </select>
          </div>
          
          <div className="flex-1">
            <h1>Overall Length (Hot + Cold)</h1>
            <div className="input input-bordered border-cyan-500 border-2 input-xs w-full bg-slate-50 text-gray-700">
              {Number.isFinite(OALVar) ? `${OALVar.toFixed(1)}"` : `0.0"`}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
        <div className="flex-1">
          <h1>Series</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
            value={seriesVar}
            onChange={(e) => setSeries(e.target.value)}
          >
            <option value="9HX">IM-9HX (9 element PTFE)</option>
            {/* add more series later if needed */}
          </select>
        </div>

        <div className="flex-1">
          <h1>Hot Zone Length (min depends on wattage)</h1>
          <input
            type="text"
            inputMode="decimal"
            value={hotLengthText}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*\.?\d*$/.test(v)) setHotLengthText(v);
            }}
            className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
          />
          <div className="text-xs text-slate-500 mt-1">
            Min hot length for {wattsVar}W is {MIN_HOT_BY_WATTS[wattsVar] ?? 0}&quot;
          </div>
        </div>
      </div>


        <div>
          <h1>Phase</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={phaseVar}
            onChange={(e) => setPhase(Number(e.target.value))}
          >
            <option value={1}>1PH</option>
            <option value={3}>3PH</option>
          </select>
        </div>

        <div className="flex gap-3 mt-2">
          <div className="flex-1">
            <h1>Type of Protector</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
              value={protectorVar}
              onChange={(e) => setProtector(e.target.value)}
            >
              <option value="P1">P1 - Solutlons up to 190°F</option>
              <option value="P2">P2 - Solutlons up to 190°F</option>
              <option value="P8">P8 - Solutions 190°F to 210°F</option>
              <option value="P3">P3 - Solutions 210°F to 250°F</option>
            </select>
          </div>

          <div className="flex-1">
            <h1>Wire/Conduit Length (optional)</h1>
            <input
              type="text"
              value={wireLenVar}
              onChange={(e) => {
                // allow "", "X60", "X84" etc
                const v = e.target.value.toUpperCase();
                if (/^$|^X\d{0,3}$/.test(v)) setWireLen(v);
              }}
              placeholder='e.g. X60'
              className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>


        <div>
          <h1>Cold Length</h1>
          <input
            type="text"
            inputMode="decimal"
            value={coldLengthText}
            onChange={(e) => {
              const v = e.target.value;

              // allow typing: "", "2", "2.", "2.5"
              if (/^\d*\.?\d*$/.test(v)) setColdLengthText(v);
            }}
            className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
          />
        </div>


        <div>
          <h1>Element Sheath Material</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => setMaterial(String(e.target.value))}
          >
            <option>304SS</option>
            <option>Incoloy 800/840</option>
            <option>Titanium</option>
            <option>316SS</option>
            <option>Copper</option>
            <option>Hasteloy</option>
            <option>PTFE coated 304SS</option>
          </select>
        </div>

        {/* =========================
            Thermowells (Yes/No row + dynamic detail row)
          ========================= */}
        <div className="mt-2">
          {/* Row 1: Yes/No selectors ALWAYS side-by-side */}
          <div className="flex gap-3">
            {/* Process Yes/No */}
            <div className="flex-1">
              <h1>Process Thermowell</h1>
              <select
                className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
                value={processType === "nT" ? "NO" : "YES"}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "NO") {
                    setProcessType("nT");
                    setProcessRange("");
                  } else {
                    // default to something sensible when turning ON
                    setProcessType("J");
                  }
                }}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>

            {/* HL Yes/No */}
            <div className="flex-1">
              <h1>High Limit Thermowell</h1>
              <select
                className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
                value={hlType === "nHL" ? "NO" : "YES"}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "NO") {
                    setHLType("nHL");
                    setHLRange("");
                  } else {
                    setHLType("J");
                  }
                }}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>
          </div>

          {/* Row 2: Details (0, 1 full width, or 2 half/half) */}
          {(() => {
            const showProcess = processType !== "nT";
            const showHL = hlType !== "nHL";
            const count = Number(showProcess) + Number(showHL);

            if (count === 0) return null;

            const boxClass = count === 1 ? "w-full" : "flex-1";

            return (
              <div className={`mt-2 ${count === 1 ? "" : "flex gap-3"}`}>
                {/* Process details */}
                {showProcess && (
                  <div className={boxClass}>
                    <div className="p-2 border border-slate-300 rounded-md">
                      <h1 className="mb-1">Process Thermowell Type</h1>

                      <select
                        className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
                        value={processType}
                        onChange={(e) => {
                          const v = e.target.value;
                          setProcessType(v);
                          if (v !== "SPST" && v !== "DPST") setProcessRange("");
                          if (v === "SPST") setProcessRange("C:0,40");
                          if (v === "DPST") setProcessRange("F:0,100");
                        }}
                      >
                        <option value="J">Type J Thermocouple</option>
                        <option value="K">Type K Thermocouple</option>
                        <option value="RTD">RTD</option>
                        <option value="SPST">SPST Thermostat</option>
                        <option value="DPST">DPST Thermostat</option>
                      </select>

                      {(processType === "SPST" || processType === "DPST") && (
                        <select
                          className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full mt-1"
                          value={processRange}
                          onChange={(e) => setProcessRange(e.target.value)}
                        >
                        {(processType === "SPST" ? spstRanges : dpstRanges).map((r) => (
                          <option key={r} value={r}>
                            {formatRangeLabel(r)}
                          </option>
                        ))}
                        </select>
                      )}

                      <div className="mt-1">
                        <h1>Length</h1>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={String(processLength)}
                          onChange={(e) => {
                            const v = e.target.value;
                            // allow "", "8", "8.", "8.5"
                            if (/^\d*\.?\d*$/.test(v)) {
                              setProcessLength(v === "" ? 0 : Number.parseFloat(v));
                            }
                          }}
                          className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* HL details */}
                {showHL && (
                  <div className={boxClass}>
                    <div className="p-2 border border-slate-300 rounded-md">
                      <h1 className="mb-1">High Limit Thermowell Type</h1>

                      <select
                        className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
                        value={hlType}
                        onChange={(e) => {
                          const v = e.target.value;
                          setHLType(v);
                          if (v !== "SPST" && v !== "DPST") setHLRange("");
                          if (v === "SPST") setHLRange("C:0,40");
                          if (v === "DPST") setHLRange("F:0,100");
                        }}
                      >
                        <option value="J">Type J Thermocouple</option>
                        <option value="K">Type K Thermocouple</option>
                        <option value="RTD">RTD</option>
                        <option value="SPST">SPST Thermostat</option>
                        <option value="DPST">DPST Thermostat</option>
                      </select>

                      {(hlType === "SPST" || hlType === "DPST") && (
                        <select
                          className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full mt-1"
                          value={hlRange}
                          onChange={(e) => setHLRange(e.target.value)}
                        >
                        {(hlType === "SPST" ? spstRanges : dpstRanges).map((r) => (
                          <option key={r} value={r}>
                            {formatRangeLabel(r)}
                          </option>
                        ))}
                        </select>
                      )}

                      <div className="mt-1">
                        <h1>Length</h1>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={String(hlLength)}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (/^\d*\.?\d*$/.test(v)) {
                              setHLLength(v === "" ? 0 : Number.parseFloat(v));
                            }
                          }}
                          className="input input-bordered border-cyan-500 border-2 input-xs w-full text-gray-700 dark:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>



        <div className="mt-2">
          <h1>Terminal Box</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={terminalBoxVar}
            disabled={dpstActive}
            onChange={(e) => setTerminalBox(e.target.value)}
          >
            <option value="N1">NEMA 1</option>
            <option value="N4">NEMA 4</option>
            <option value="N7">NEMA 7</option>
          </select>
        </div>

        <div className="mt-4 space-y-2">
          <button
            className="btn btn-sm w-full border-2 border-cyan-500"
            type="button"
            onClick={copyDrawingToClipboard}
          >
            Copy Drawing (PNG)
          </button>

          <button
            className="btn btn-sm w-full border-2 border-cyan-500"
            type="button"
            onClick={downloadDrawingPng}
          >
            Download Drawing (PNG)
          </button>
        </div>
      </div>

      <Drawing
        drawingRef={drawingRef}
        serialNum={serialNum}
        title={titleVar}
        lengthElement={OALVar}
        foldLength={foldLengthVar}
        phase={phaseVar}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        OAL={OALVar}
        terminalBox={terminalBoxVar}
        coldLength={coldLengthNum}
        elementCount={elementCount}
        processTemp={processType}
        processRange={processRange}
        thermoLength={processLength}
        hlSensor={hlType}
        hlRange={hlRange}
        hlLength={hlLength}
        series ={serialNum}
        protector = {protectorVar}
      />

    </div>
  );
}

export default App;
