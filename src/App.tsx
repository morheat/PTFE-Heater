import { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

function App() {
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<number>(120);
  const [wattsVar, setWattage] = useState<number>(500);
  const [OALVar, setOAL] = useState<number>(11);

  // ✅ phase is 1 or 3 (to match amps math + display)
  const [phaseVar, setPhase] = useState<number>(1);

  const [terminalBoxVar, setTerminalBox] = useState<string>("N1");
  const [materialVar, setMaterial] = useState<string>("304SS");

  const [NPTSizeOp, setNPTSize] = useState<number>(1);
  const [immersionLengthVar, setImmersionLength] = useState<number>(25);
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


  const drawingRef = useRef<HTMLDivElement>(null);
  const dpstActive = processType === "DPST" || hlType === "DPST";

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
    // 2" and 2.5" are always 3 elements
    if (NPTSizeOp === 2 || NPTSizeOp === 2.5) {
      setElementCount(3);
      return;
    }

    // 1.25" can be 1 or 2 (keep whatever user chose, but clamp if needed)
    if (NPTSizeOp === 1.25) {
      setElementCount((prev) => (prev === 2 ? 2 : 1));
      return;
    }

    // 1" defaults to 1 element
    if (NPTSizeOp === 1) {
      setElementCount(1);
    }
  }, [NPTSizeOp]);


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
            <h1>Overall length</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300 w-full"
              value={OALVar}
              onChange={(e) => setOAL(Number(e.target.value))}
            >
              <option value={11}>11 "279 mm</option>
              <option value={17}>17 "432 mm</option>
              <option value={23}>23 "584 mm</option>
              <option value={29}>29 "737 mm</option>
              <option value={35}>35 "889 mm</option>
              <option value={40}>40 "1016 mm</option>
              <option value={47}>47 "1194 mm</option>
              <option value={54}>54 "1372 mm</option>
            </select>
          </div>
        </div>


        <div>
          <h1>NPT Size</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={NPTSizeOp}
            onChange={(e) => setNPTSize(Number(e.target.value))}
          >
            <option value={1}>1&quot; NPT Heater Constructions</option>
            <option value={1.25}>1.25&quot; NPT Heater Constructions</option>
            <option value={2}>2&quot; NPT Heater Constructions</option>
            <option value={2.5}>2.5&quot; NPT Heater Constructions</option>
          </select>
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

        <div>
          <h1>Immersion Length</h1>
          <input
            type="text"
            defaultValue={25}
            onChange={(e) => setImmersionLength(Number(e.target.value) || 0)}
            className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
          />
        </div>

        {NPTSizeOp === 1.25 && (
          <div>
            <h1>Number of Elements</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              value={elementCount}
              onChange={(e) => setElementCount(Number(e.target.value))}
            >
              <option value={1}>1 Element</option>
              <option value={2}>2 Elements</option>
            </select>
          </div>
        )}

        {NPTSizeOp === 1 && (
          <div>
            <h1>Foldback Length</h1>
            <input
              type="text"
              onChange={(e) => setFoldLength(Number(e.target.value) || 0)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        )}

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
        NPTSize={NPTSizeOp}
        lengthElement={immersionLengthVar}
        foldLength={foldLengthVar}
        phase={phaseVar}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        OAL = {OALVar}
        terminalBox={terminalBoxVar}
        coldLength={coldLengthNum}
        elementCount={elementCount}
        processTemp={processType}
        processRange={processRange}
        thermoLength={processLength}
        hlSensor={hlType}
        //typeThermostat={typeThermostat}
        hlRange={hlRange}
        hlLength={hlLength}
      />
    </div>
  );
}

export default App;
