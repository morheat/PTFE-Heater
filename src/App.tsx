import { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import Drawing from "./DrawingsNew";

function App() {
  const [serialNum, setSerialNum] = useState<string>("");
  const [titleVar, setTitle] = useState<string>("");
  const [voltsVar, setVoltage] = useState<string>("");
  const [wattsVar, setWattage] = useState<string>("");
  const [processSensor, setProcessSensor] = useState<string>("nT");
  const [HLSensor, setHLSensor] = useState<string>("nHL");
  const [processTStat, setProcessTStat] = useState<string>("");
  const [terminalBoxVar, setTerminalBox] = useState<string>("N1");
  const [materialVar, setMaterial] = useState<string>("304SS");

  const [NPTSizeOp, setNPTSize] = useState<number>(1);
  const [immersionLengthVar, setImmersionLength] = useState<number>(10);
  const [foldLengthVar, setFoldLength] = useState<number>(0);
  const [thermoLength, setThermoLength] = useState<number>(8);
  const [phaseVar, setPhase] = useState<string>("Single Phase");
  const [coldLength, setColdLength] = useState<number>(2.5);
  const [elementCount, setElementCount] = useState<number>(1);
;

  const drawingRef = useRef<HTMLDivElement>(null);

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

      // ✅ prevent "ClipboardItem is not defined" crashes
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
    setPhase("Single Phase");

    // 1.25" has NO fold option
    if (NPTSizeOp === 1.25) {
      setFoldLength(0);      // force fold off
      setElementCount(1);    // default to 1 element (or 2 if you prefer)
    }
  }, [NPTSizeOp]);

  return (
    <div className="flex justify-center mt-5 w-screen">
      <div className="w-96 h-[50rem] bg-white p-2 border-2 border-slate-400 rounded-lg mr-6 text-gray-700">
        <div className="flex space-x-3">
          <div>
            <h1>Serial Num</h1>
            <input
              type="text"
              id="serialNumInput"
              onChange={(e) => setSerialNum(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <h1>Title</h1>
            <input
              type="text"
              id="titleInput"
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <div>
            <h1>Voltage</h1>
            <input
              onChange={(e) => setVoltage(e.target.value)}
              type="text"
              id="voltInput"
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <h1>Wattage</h1>
            <input
              onChange={(e) => setWattage(e.target.value)}
              type="text"
              id="wattsInput"
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>

        <div>
          <h1>NPT Size</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={NPTSizeOp}
            onChange={(e) => {
              setNPTSize(Number(e.target.value));
            }}
          >
            <option value={1}>1&quot; NPT Heater Constructions</option>
            <option value={1.25}>1.25&quot; NPT Heater Constructions</option>
            <option value={2}>2&quot; NPT Heater Constructions</option>
            <option value={2.5}>2.5&quot; NPT Heater Constructions</option>
          </select>
        </div>

        <div>
          <h1>Phases</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={phaseVar}
            onChange={(e) => setPhase(e.target.value)}
          >
            <option value="Single Phase">Single Phase</option>
            <option value="3 Phase">3 Phase</option>
          </select>
        </div>

        <div>
          <h1>immersion Length</h1>
          <input
            type="text"
            id="immersionLengthInput"
            defaultValue={10}
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


        {NPTSizeOp === 1 &&(
          <div>
            <h1>Foldback Length</h1>
            <input
              type="text"
              id="foldbackLengthInput"
              onChange={(e) => setFoldLength(Number(e.target.value) || 0)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        )}
        
        <div>
          <h1>Cold Length</h1>
          <input
            type="text"
            id="coldLengthInput"
            value={coldLength}
            onChange={(e) => setColdLength(Number(e.target.value) || 0)}
            className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
          />
        </div>


        <div>
          <h1>Element Sheath Material</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            onChange={(e) => {
              setMaterial(String(e.target.value));
            }}
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

        <div>
          <h1>Temp Sensor Option</h1>
          <div className="flex space-x-3">
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              onChange={(e) => {
                setProcessSensor(e.target.value);
                if (e.target.value !== "TS") setProcessTStat("");
                else setProcessTStat("SPST");
              }}
              value={processSensor}
            >
              <option value="nT">None</option>
              <option value="TC">Process Thermocouple</option>
              <option value="TS">Process Thermostat</option>
            </select>

            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              onChange={(e) => setHLSensor(e.target.value)}
              value={HLSensor}
            >
              <option value="nHL">None</option>
              <option value="HLTC">High-Limit Thermocouple</option>
              <option value="HLTS">High-Limit Thermostat</option>
            </select>
          </div>
        </div>

        {processSensor === "TS" && (
          <div>
            <h1>Temp Sensor Option</h1>
            <select
              className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
              onChange={(e) => {
                setProcessTStat(e.target.value);
              }}
              value={processTStat}
            >
              <option value="SPST">SPST Thermostat</option>
              <option value="DPST">DPST Thermostat</option>
            </select>
          </div>
        )}

        {processSensor !== "nT" && (
          <div>
            <h1>Thermowell Length</h1>
            <input
              type="text"
              id="psLength"
              defaultValue={8}
              onChange={(e) => setThermoLength(Number(e.target.value) || 0)}
              className="input input-bordered border-cyan-500 border-2 input-xs max-w-xs text-gray-700 dark:text-gray-300"
            />
          </div>
        )}

        <div>
          <h1>Terminal Box</h1>
          <select
            className="select select-xs border-cyan-500 border-2 text-gray-700 dark:text-gray-300"
            value={terminalBoxVar}
            onChange={(e) => setTerminalBox(e.target.value)}
          >

            {NPTSizeOp === 1 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {NPTSizeOp === 1.25 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {NPTSizeOp === 2 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
            {NPTSizeOp === 2.5 && (
              <>
                <option value="N1">NEMA 1</option>
                <option value="N4">NEMA 4</option>
                <option value="N7">NEMA 7</option>
              </>
            )}
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
        processTemp={processSensor}
        hlSensor={HLSensor}
        typeThermostat={processTStat}
        thermoLength={thermoLength}
        material={materialVar}
        voltage={voltsVar}
        wattage={wattsVar}
        terminalBox={terminalBoxVar}
        coldLength={coldLength}
        elementCount={elementCount}
      />
    </div>
  );
}

export default App;
