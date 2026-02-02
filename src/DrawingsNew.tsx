import React, { useMemo} from "react";
import Header from "./headers";

import Titlebox from "./assets/TITLE.svg?react";
import LOGO from "./assets/LOGO.svg?react";

// Your ONE static full drawing SVG (10-inch config)
// 1 Inch
import Layout1N1 from "./assets/1inNEMA1.svg?react";
import Layout1N1Fold from "./assets/1inNEMA1Fold.svg?react";

import Layout1N4 from "./assets/1inNema4.svg?react";
import Layout1N4Fold from "./assets/1inNEMA4Fold.svg?react";

import Layout1N7 from "./assets/1inNEMA7.svg?react";
import Layout1N7Fold from "./assets/1inNEMA7Fold.svg?react";

// 1.25 Inch
import Layout125N1_E1 from "./assets/125inNEMA1_E1.svg?react"
import Layout125N1_E2 from "./assets/125NEMA1-E2.svg?react"

import Layout125N4_E1 from "./assets/125NEMA4_E1.svg?react"
import Layout125N4_E2 from "./assets/125NEMA4_E2.svg?react"

import Layout125N7_E1 from "./assets/125inNEMA7_E1.svg?react"
import Layout125N7_E2 from "./assets/125inNEMA7_E2.svg?react"

//2 inch
import Layout2N1 from "./assets/2inNEMA1.svg?react"
import Layout2N4 from "./assets/2inNEMA4.svg?react"
import Layout2N7 from "./assets/2inNEMA7.svg?react"

//2.5 inch
import Layout25N1 from "./assets/25inNEMA1.svg?react"
import Layout25N4 from "./assets/25inNEMA4.svg?react"
import Layout25N7 from "./assets/25inNEMA7.svg?react"


interface drawingProps {
  drawingRef: React.RefObject<HTMLDivElement>;
  serialNum: string;
  title: string;
  NPTSize: number;
  lengthElement: number;
  foldLength: number;
  phase: number;
  processTemp: string;
  hlSensor: string;
  typeThermostat: string;
  thermoLength: number;
  material: string;
  voltage: string;
  wattage: string;
  terminalBox: string;
  coldLength: number;
  elementCount: number;
  processRange: string;
  hlRange: string;
  hlLength: number;
}

const Drawings10: React.FC<drawingProps> = ({
  drawingRef,
  serialNum,
  title,
  NPTSize,
  lengthElement,
  foldLength,
  phase,
  material,
  voltage,
  wattage,
  terminalBox,
  typeThermostat,
  hlSensor, // ✅ needed
  processTemp, // (optional later)
  thermoLength,
  coldLength,
  elementCount,
  processRange,
  hlRange,
  hlLength,
}) => {
  const showHL = hlSensor !== "nHL";
  const showProcess = processTemp !== "nT";
  const hasFold = foldLength > 0 && NPTSize !==1.25;
  const showColdDim = coldLength > 0;

  // °C/°F helpers (same as working)
  const cToF = (c: number) => (c * 9) / 5 + 32;
  const fToC = (f: number) => ((f - 32) * 5) / 9;
  
  // ✅ Process thermowell label builder (same style as working)
    const processThermowellLabel = useMemo(() => {
    if (processTemp === "nT") return "";

    if (processTemp === "J") return "Process Thermowell\nType J Thermocouple";
    if (processTemp === "K") return "Process Thermowell\nType K Thermocouple";
    if (processTemp === "RTD") return "Process Thermowell\nRTD";

    const range = processRange || "";

    if (processTemp === "SPST") {
      const m = range.match(/^C:(-?\d+),(-?\d+)$/);
      if (!m) return "Process Thermowell\nSPST Thermostat";
      const c1 = Number(m[1]);
      const c2 = Number(m[2]);
      const f1 = Math.round(cToF(c1));
      const f2 = Math.round(cToF(c2));
      return `Process Thermowell\nSPST Thermostat\n${c1}–${c2}°C (${f1}–${f2}°F)`;
    }

    if (processTemp === "DPST") {
      const m = range.match(/^F:(-?\d+),(-?\d+)$/);
      if (!m) return "Process Thermowell\nDPST Thermostat";
      const f1 = Number(m[1]);
      const f2 = Number(m[2]);
      const c1 = Math.round(fToC(f1));
      const c2 = Math.round(fToC(f2));
      return `Process Thermowell\nDPST Thermostat\n${f1}–${f2}°F (${c1}–${c2}°C)`;
    }

    return "Process Thermowell";
    }, [processTemp, processRange]);

    // ✅ High limit label builder (same style as working)
    const highLimitLabel = useMemo(() => {
    if (hlSensor === "nHL") return "";

    if (hlSensor === "J") return "High-Limit\nType J Thermocouple";
    if (hlSensor === "K") return "High-Limit\nType K Thermocouple";
    if (hlSensor === "RTD") return "High-Limit\nRTD";

    const range = hlRange || "";

    if (hlSensor === "SPST") {
      const m = range.match(/^C:(-?\d+),(-?\d+)$/);
      if (!m) return "High-Limit\nSPST Thermostat";
      const c1 = Number(m[1]);
      const c2 = Number(m[2]);
      const f1 = Math.round(cToF(c1));
      const f2 = Math.round(cToF(c2));
      return `High-Limit\nSPST Thermostat\n${c1}–${c2}°C (${f1}–${f2}°F)`;
    }

    if (hlSensor === "DPST") {
      const m = range.match(/^F:(-?\d+),(-?\d+)$/);
      if (!m) return "High-Limit\nDPST Thermostat";
      const f1 = Number(m[1]);
      const f2 = Number(m[2]);
      const c1 = Math.round(fToC(f1));
      const c2 = Math.round(fToC(f2));
      return `High-Limit\nDPST Thermostat\n${f1}–${f2}°F (${c1}–${c2}°C)`;
    }

    return "High-Limit";
    }, [hlSensor, hlRange]);
  
    // Only enable 10-inch for now
  // ❌ DON'T gate the UI with this anymore if you want 3-inch too
  // const is10in = NPTSize === 10;

  // pick correct drawing
  const LayoutSVG = useMemo(() => {
    // ----- 1 inch -----
    if (NPTSize === 1 && terminalBox == "N1" ) {
      return hasFold? Layout1N1Fold : Layout1N1;
    }

    if (NPTSize === 1 && terminalBox == "N4" ) {
      return hasFold? Layout1N4Fold : Layout1N4;
    }

    if (NPTSize === 1 && terminalBox == "N7" ) {
      return hasFold? Layout1N7Fold : Layout1N7;
    }

    // ----- 1.25 inch -----
    if (NPTSize === 1.25 && terminalBox === "N1") {
      return elementCount === 2 ? Layout125N1_E2 : Layout125N1_E1;
    }

    if (NPTSize === 1.25 && terminalBox === "N4") {
      return elementCount === 2 ? Layout125N4_E2 : Layout125N4_E1;
    }

    if (NPTSize === 1.25 && terminalBox === "N7") {
      return elementCount === 2 ? Layout125N7_E2 : Layout125N7_E1;
    }

  // ----- 2 inch -----
    if (NPTSize === 2 && terminalBox == "N1" ) {
      return Layout2N1
    }

    if (NPTSize === 2 && terminalBox == "N4" ) {
      return Layout2N4
    }

    if (NPTSize === 2 && terminalBox == "N7" ) {
      return Layout2N7
    }

  // ----- 2.5 inch -----
    if (NPTSize === 2.5 && terminalBox == "N1" ) {
      return Layout25N1
    }

    if (NPTSize === 2.5 && terminalBox == "N4" ) {
      return Layout25N4
    }

    if (NPTSize === 2.5 && terminalBox == "N7" ) {
      return Layout25N7
    }

    return null;
  }, [NPTSize, phase, terminalBox, hasFold, elementCount]);



  // What you want displayed as the immersion number
  const immersionText = useMemo(() => {
    if (!lengthElement || Number.isNaN(Number(lengthElement))) return "";
    return `${lengthElement}"`;
  }, [lengthElement]);

  const foldbackText = useMemo(() => {
    if (!foldLength || Number.isNaN(Number(foldLength))) return "";
    return `${foldLength}"`;
  }, [foldLength]);

  const showThermowellDim = processTemp !== "nT" && thermoLength > 0;


  // =========================
  // CONFIGS 
  // =========================

  //1in
  //Nema 1
  const cfg1N1 = {
    processBar: { left: "51%", bottom: "40%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "145%", rotate: 40, lineHeight: 270, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "51%", bottom: "38%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "51%", bottom: "31%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-45%", rotate: -52, lineHeight: 200, textOffsetY: -2},
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "15%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51%", bottom: "-11%", width: "10%", riseHeight: 70 },
  };

    const cfg1N1Fold = {
    processBar: { left: "52%", bottom: "40%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "150%", rotate: 37, lineHeight: 265, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "52%", bottom: "38%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "52%", bottom: "31%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-50%", rotate: -50, lineHeight: 200, textOffsetY: -2},
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "15%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "76%", top: "30%" },

    coldDim: { left: "52%", bottom: "-15%", width: "10%", riseHeight: 70 },
  };

  //Nema 4
  const cfg1N4 = {
    processBar: { left: "58%", bottom: "48.25%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "125%", rotate: 30, lineHeight: 210, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58%", bottom: "46.5%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58%", bottom: "42%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-25%", rotate: -45, lineHeight: 195, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "11%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "76%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58%", bottom: "-5%", width: "10%", riseHeight: 102 },
  };

  const cfg1N4Fold = {
    processBar: { left: "57.5%", bottom: "49%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "125%", rotate: 30, lineHeight: 210, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "57.5%", bottom: "46.5%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "57.5%", bottom: "43%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-25%", rotate: -45, lineHeight: 195, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 35, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "80%", top: "14%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "78%", top: "27%" },

    coldDim: { left: "57.5%", bottom: "-4%", width: "10%", riseHeight: 102 },
  };

  //Nema 7
  const cfg1N7 = {
    processBar: { left: "58.85%", bottom: "44.5%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "120%", rotate: 30, lineHeight: 225, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.85%", bottom: "42%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58.85%", bottom: "39%", width: "18%", height: "2%" },
    hlLeader: { left: "73%", bottom: "-20%", rotate: -45, lineHeight: 185, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "11%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "76%", top: "16%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.85%", bottom: "3%", width: "10%", riseHeight: 80 },
  };

  const cfg1N7Fold = {
    processBar: { left: "58.5%", bottom: "48%", width: "18%", height: "3%" },
    processLeader: { left: "75%", bottom: "110%", rotate: 30, lineHeight: 210, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.5%", bottom: "46.5%", width: "18%", dropHeight: 20 },
    
    hlBar: { left: "58.5%", bottom: "42%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-8%", rotate: -30, lineHeight: 135, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "17%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "12%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "78%", top: "26%" },

    coldDim: { left: "58.5%", bottom: "3%", width: "10%", riseHeight: 102 },
  };

  // 1.25 inch
  // NEMA 1
    const cfg125N1E1 = {
    processBar: { left: "51%", bottom: "39%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "150%", rotate: 40, lineHeight: 270, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "51%", bottom: "35%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "51%", bottom: "28%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-50%", rotate: -55, lineHeight: 200, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-12%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51%", bottom: "-24%", width: "10%", riseHeight: 80 },
  };

  const cfg125N1E2 = {
    processBar: { left: "50.75%", bottom: "42%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "150%", rotate: 40, lineHeight: 260, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "50.75%", bottom: "41%", width: "18%", dropHeight:90 },
    
    hlBar: { left: "50.75%", bottom: "31%", width: "18%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-50%", rotate: -52, lineHeight: 205, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-12%", rotate: -10, lineHeight: 37, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "50.75%", bottom: "-24%", width: "10%", riseHeight: 88 },
  };

  //NEMA 4
  const cfg125N4E1 = {
    processBar: { left: "58.25%", bottom: "49%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "125%", rotate: 30, lineHeight: 200, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.25%", bottom: "46%", width: "18%", dropHeight: 60 },
    
    hlBar: { left: "58.25%", bottom: "42%", width: "18%", height: "2%" },
    hlLeader: { left: "72%", bottom: "-25%", rotate: -40, lineHeight: 175, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "10%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.25%", bottom: "15%", width: "10%", riseHeight: 45 },
  };

  const cfg125N4E2 = {
    processBar: { left: "58.5%", bottom: "50.5%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "125%", rotate: 30, lineHeight: 190, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.5%", bottom: "50%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58.5%", bottom: "43.5%", width: "18%", height: "2%" },
    hlLeader: { left: "72%", bottom: "-25%", rotate: -42, lineHeight: 175, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "78%", top: "6%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.5%", bottom: "15%", width: "10%", riseHeight: 45 },
  };

  //NEMA 7
    const cfg125N7E1 = {
    processBar: { left: "58.25%", bottom: "49.75%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "120%", rotate: 30, lineHeight: 215, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.25%", bottom: "47%", width: "18%", dropHeight: 68 },
    
    hlBar: { left: "58.25%", bottom: "44%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-20%", rotate: -25, lineHeight: 160, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.25%", bottom: "15%", width: "10%", riseHeight: 60 },
  };

  const cfg125N7E2 = {
    processBar: { left: "51.5%", bottom: "40%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "160%", rotate: 40, lineHeight: 265, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "51.5%", bottom: "38%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "51.5%", bottom: "25%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-50%", rotate: -50, lineHeight: 155, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-18%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "9%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51.5%", bottom: "-25%", width: "10%", riseHeight: 67 },
  };

  // 2 inch
  // NEMA 1
  const cfg2N1 = {
    processBar: { left: "51.25%", bottom: "42%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "135%", rotate: 40, lineHeight: 250, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "51.25%", bottom: "47%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "51.25%", bottom: "25%", width: "18%", height: "2%" },
    hlLeader: { left: "72%", bottom: "-40%", rotate: -50, lineHeight: 165, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-10%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "14%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51.25%", bottom: "-20%", width: "10%", riseHeight: 80 },
  };
  //NEMA 4
  const cfg2N4 = {
    processBar: { left: "58.5%", bottom: "50%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "125%", rotate: 30, lineHeight: 205, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "58.5%", bottom: "55%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "58.5%", bottom: "37%", width: "18%", height: "2%" },
    hlLeader: { left: "72%", bottom: "-25%", rotate: -30, lineHeight: 140, textOffsetY: -2},
    
    elemMatLeader: { left: "86.5%", bottom: "8%", rotate: -10, lineHeight: 47, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "80%", top: "9%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.5%", bottom: "-3%", width: "10%", riseHeight: 83 },
  };
  //NEMA 7
  const cfg2N7 = {
    processBar: { left: "59%", bottom: "41%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "135%", rotate: 25, lineHeight: 220, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "59%", bottom: "46%", width: "18%", dropHeight: 40 },
    
    hlBar: { left: "59%", bottom: "28%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-31%", rotate: -30, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86.5%", bottom: "-6%", rotate: -10, lineHeight:48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "8%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "59%", bottom: "-15%", width: "10%", riseHeight: 78 },
  };

  // 2.5 inch
  // NEMA 1
  const cfg25N1 = {
    processBar: { left: "52.5%", bottom: "42%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "145%", rotate: 36, lineHeight: 255, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "52.5%", bottom: "53%", width: "18%", dropHeight: 80 },
    
    hlBar: { left: "52.5%", bottom: "19%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-45%", rotate: -45, lineHeight: 140, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-18%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "75%", top: "9%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "52.5%", bottom: "-20%", width: "10%", riseHeight: 58 },
  };
  //NEMA 4
  const cfg25N4 = {
    processBar: { left: "59.5%", bottom: "50%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "135%", rotate: 25, lineHeight: 205, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "59.5%", bottom: "56%", width: "18%", dropHeight: 80 },
    
    hlBar: { left: "59.5%", bottom: "33%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-30%", rotate: -30, lineHeight: 126, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-0%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "82%", top: "8%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "59.5%", bottom: "-1%", width: "10%", riseHeight: 58 },
  };
  //NEMA 7
  const cfg25N7 = {
    processBar: { left: "59.25%", bottom: "41%", width: "18%", height: "5%" },
    processLeader: { left: "75%", bottom: "140%", rotate: 30, lineHeight: 235, textOffsetY: 6, textWidth: 230 },

    thermoDim: { left: "59.25%", bottom: "46%", width: "18%", dropHeight: 40 },
    
    hlBar: { left: "59.25%", bottom: "23%", width: "18%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-40%", rotate: -25, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86.5%", bottom: "-12%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "8%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "59.25%", bottom: "-15%", width: "10%", riseHeight: 62 },
  };



  const overlayCfg = useMemo(() => {
    // 1 inch
    if (NPTSize === 1 && terminalBox == "N1" ) {
      return hasFold? cfg1N1Fold : cfg1N1;
    }

    if (NPTSize === 1 && terminalBox == "N4" ) {
      return hasFold? cfg1N4Fold : cfg1N4;
    }

    if (NPTSize === 1 && terminalBox == "N7" ) {
      return hasFold? cfg1N7Fold : cfg1N7;
    }

    // 1.25 inch
    if (NPTSize === 1.25 && terminalBox == "N1" ) {
      if(elementCount === 1) return cfg125N1E1;
      if(elementCount === 2) return cfg125N1E2;
    }

    if (NPTSize === 1.25 && terminalBox == "N4" ) {
      if(elementCount === 1) return cfg125N4E1;
      if(elementCount === 2) return cfg125N4E2;
    }

    if (NPTSize === 1.25 && terminalBox == "N7" ) {
      if(elementCount === 1) return cfg125N7E1;
      if(elementCount === 2) return cfg125N7E2;
    }
  
    // 2 inch
    if (NPTSize === 2 && terminalBox == "N1" ) {
      return cfg2N1
    }

    if (NPTSize === 2 && terminalBox == "N4" ) {
      return cfg2N4
    }

    if (NPTSize === 2 && terminalBox == "N7" ) {
      return cfg2N7
    }

    // 2.5 inch
    if (NPTSize === 2.5 && terminalBox == "N1" ) {
      return cfg25N1
    }

    if (NPTSize === 2.5 && terminalBox == "N4" ) {
      return cfg25N4
    }

    if (NPTSize === 2.5 && terminalBox == "N7" ) {
      return cfg25N7
    }

    return null;
  }, [NPTSize, phase, terminalBox, hasFold, elementCount]);

  return (
    <div ref={drawingRef} className=" relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        phase={phase}
        wattage={wattage}
        terminalBox={terminalBox}
        thermostat={typeThermostat}
        elementNum={elementCount}
        immersionLength={lengthElement}
        coldLength={coldLength}
      />


      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <LOGO className="absolute w-[16rem] ml-[650px] mt-[460px]" />
      </div>

      <div className="h-full w-full flex items-center justify-center">
        {/* ✅ DO NOT gate on is10in — gate on whether a drawing exists */}
        {!LayoutSVG ? (
          <div className="text-slate-600 text-sm">
            No drawing available for this configuration.
          </div>
        ) : (
          <div
            className="relative w-[950px] flex items-center justify-center"
            style={{ transform: "translateY(-60px)" }}
          >
            {/* Static drawing */}
             <LayoutSVG
                style={{ width: "95%", height: "100%", objectFit: "contain" }}
              />

            {/* ✅ Only render overlays when we actually have overlayCfg */}
            {overlayCfg && (
              <>
                {/* ===== Process Temp Sensor (BLUE bar) ===== */}
                  {showProcess && overlayCfg?.processBar && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: overlayCfg.processBar.left,
                        bottom: overlayCfg.processBar.bottom,
                        width: overlayCfg.processBar.width,
                        height: overlayCfg.processBar.height,
                        backgroundColor: "#3348ff",
                        border: "1px solid black",
                        zIndex: 50,
                      }}
                    />
                  )}

                  {/* ===== HL Sensor (RED bar) ===== */}
                  {showHL && overlayCfg?.hlBar && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: overlayCfg.hlBar.left,
                        bottom: overlayCfg.hlBar.bottom,
                        width: overlayCfg.hlBar.width,
                        height: overlayCfg.hlBar.height,
                        backgroundColor: "#fa1515",
                        border: "1px solid black",
                        zIndex: 60,
                      }}
                    />
                  )}



                {/* Thermowell DIM*/}
                {showThermowellDim && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.thermoDim.left,
                      bottom: overlayCfg.thermoDim.bottom,
                      width: overlayCfg.thermoDim.width,
                      height: `${overlayCfg.thermoDim.dropHeight + 60}px`,
                      zIndex: 80,
                    }}
                  >
                    {/* 1) Vertical drop line (LEFT) */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 26,
                        height: overlayCfg.thermoDim.dropHeight,
                        borderLeft: "1px solid black",
                      }}
                    />

                    {/* 2) Vertical drop line (RIGHT) */}
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 26,
                        height: overlayCfg.thermoDim.dropHeight,
                        borderLeft: "1px solid black",
                      }}
                    />

                    {/* 3) Dimension line (top) */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 26,
                        borderTop: "1px solid black",
                      }}
                    />

                    {/* 4) Left arrow */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 22,
                        width: 0,
                        height: 0,
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                        borderRight: "14px solid black",
                        transform: "translateX(-2px)",
                      }}
                    />

                    {/* 5) Right arrow */}
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 22,
                        width: 0,
                        height: 0,
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                        borderLeft: "14px solid black",
                        transform: "translateX(2px)",
                      }}
                    />

                    {/* 6) Number */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 5,
                        transform: "translateX(-50%)",
                        fontSize: "15px",
                        background: "white",
                        padding: "1px 6px",
                      }}
                    >
                      {thermoLength}&quot;
                    </div>

                    {/* 7) Label */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 25,
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        background: "white",
                        padding: "1px 6px",
                      }}
                    >
                      Thermowell
                    </div>
                  </div>
                )}


                {//ColdLength
                }
                {showColdDim && overlayCfg.coldDim && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: overlayCfg.coldDim.left,
                    bottom: overlayCfg.coldDim.bottom,
                    width: overlayCfg.coldDim.width,
                    height: `${overlayCfg.coldDim.riseHeight + 60}px`,
                    zIndex: 80,
                  }}
                >
                  {/* 1) Vertical rise line (LEFT) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 26,
                      height: overlayCfg.coldDim.riseHeight,
                      borderLeft: "1px solid black",
                    }}
                  />

                  {/* 2) Vertical rise line (RIGHT) */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 26,
                      height: overlayCfg.coldDim.riseHeight,
                      borderLeft: "1px solid black",
                    }}
                  />

                  {/* 3) Dimension line (BOTTOM) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 26,
                      borderBottom: "1px solid black",
                    }}
                  />

                  {/* 4) Left arrow (pointing inward) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 22,
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderRight: "14px solid black",
                      transform: "translateX(-2px)",
                    }}
                  />

                  {/* 5) Right arrow (pointing inward) */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 22,
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: "14px solid black",
                      transform: "translateX(2px)",
                    }}
                  />

                  {/* 6) Number (ABOVE the bottom line) */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 15,
                      transform: "translateX(-50%)",
                      fontSize: "15px",
                      background: "white",
                      padding: "1px 6px",
                    }}
                  >
                    {coldLength}&quot;
                  </div>

                  {/* 7) Label (optional) */}
                  <div
                    style={{
                      position: "absolute",
                      textAlign: "center",
                      width: 100,
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      fontSize: "12px",
                      background: "white",
                      padding: "1px 6px",
                    }}
                  >
                    Cold Length
                  </div>
                </div>
              )}





                {/* ============================================
                   IMMERSION DIMENSION: remove arrows/line
                   We "erase" that area by covering it white,
                   then overlay ONLY the number.
                   ============================================ */}

                {/* 1) White cover box (tune these numbers ONCE) */}
                <div
                  className="absolute bg-white"
                  style={{
                    left: overlayCfg.immersionCover.left,
                    top: overlayCfg.immersionCover.top,
                    width: overlayCfg.immersionCover.width,
                    height: overlayCfg.immersionCover.height,
                    zIndex: 90,
                  }}
                />

                {/* 2) Dynamic number only */}
                <div
                  className="absolute text-black"
                  style={{
                    // Starting values — tweak once to align perfectly
                    left: overlayCfg.immersionText.left,
                    top: overlayCfg.immersionText.top,
                    transform: "translate(-70%, -50%)",
                    fontSize: "16px",
                    background: "white",
                    padding: "2px 5px",
                    zIndex: 95,
                  }}
                >
                  {immersionText}
                </div>

                {hasFold && (
                  <>
                    {/* cover old foldback dim area if needed */}
                    <div
                      className="absolute bg-white"
                      style={{
                        left: overlayCfg.foldbackCover.left,
                        top: overlayCfg.foldbackCover.top,
                        width: overlayCfg.foldbackCover.width,
                        height: overlayCfg.foldbackCover.height,
                        zIndex: 90,
                      }}
                    />

                    {/* foldback dimension text */}
                    <div
                      className="absolute text-black"
                      style={{
                        left: overlayCfg.foldbackText.left,
                        top: overlayCfg.foldbackText.top,
                        transform: "translate(-50%, -50%)",
                        fontSize: "16px",
                        background: "white",
                        padding: "2px 5px",
                        zIndex: 95,
                      }}
                    >
                      {foldbackText}
                    </div>
                  </>
                )}

                {/* PROCESS LEADER (BLUE BOX) */}
                {showProcess && overlayCfg?.processLeader && (
                  <LeaderOverlay
                    cfg={overlayCfg.processLeader}
                    label={processThermowellLabel}
                    color="#1d4ed8"
                    triangleColor="#1d4ed8"
                    zIndex={206}
                    stem="bottom"   // ✅ THIS is the key
                  />
                )}



                {/* ==============================
                        TEMP SENSOR OPTION (HL)
                        Yellow bar + leader text
                    ============================== */}
                    
                    {/* HL LEADER (RED BOX) — arrow from TOP */}
                    {showHL && overlayCfg?.hlLeader && (
                      <LeaderOverlay
                        cfg={overlayCfg.hlLeader}
                        label={highLimitLabel}
                        color="#dc2626"
                        triangleColor="#dc2626"
                        zIndex={207}
                        stem="top"      // ✅ keep current HL behavior
                      />
                    )}



                    {/* ==============================
                        ✅ NEW LEADER: Elements + Material
                        ALWAYS SHOW
                        ============================== */}
                    {overlayCfg?.elemMatLeader && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: overlayCfg.elemMatLeader.left,
                          bottom: overlayCfg.elemMatLeader.bottom,
                          transform: `rotate(${overlayCfg.elemMatLeader.rotate}deg)`,
                          zIndex: 200,
                        }}
                      >
                        {/* triangle */}
                        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                        {/* leader line */}
                        <div
                          style={{
                            height: overlayCfg.elemMatLeader.lineHeight,
                            borderLeft: "2px solid black",
                            marginLeft: "9px",
                          }}
                        />

                        {/* label */}
                        <div
                          key={`${elementCount}-${material}`}
                          className="text-black"
                          style={{
                            marginLeft: "-95px",
                            marginTop: overlayCfg.elemMatLeader.textOffsetY,
                            width: `${overlayCfg.elemMatLeader.textWidth}px`,
                            transform: "rotate(10deg)",
                            fontSize: "16px",
                            background: "white",
                            padding: "2px 6px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ lineHeight: "18px", width: "100%" }}>
                            <div>{`${elementCount} x 0.475"D Elements`}</div>
                            <div>{material}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

type LeaderCfg = {
  left: string;
  bottom: string;
  rotate: number;
  lineHeight: number;
  textOffsetY: number;
  textWidth?: number;
  textRotate?: number;
  baseBoxHeight?: number; // optional: helps keep arrow from drifting if label grows
};

function LeaderOverlay({
  cfg,
  label,
  color,
  triangleColor,
  zIndex,
  stem = "top", // "top" => arrow comes out of TOP of box (HL), "bottom" => out of BOTTOM (Process)
}: {
  cfg: LeaderCfg;
  label: string;
  color: string;
  triangleColor: string;
  zIndex: number;
  stem?: "top" | "bottom";
}) {
  const fromTop = stem === "top";
  const lineLen = cfg.lineHeight;

  // measure box height so arrow stays pinned even when label grows (multi-line)
  const boxRef = React.useRef<HTMLDivElement | null>(null);
  const [boxH, setBoxH] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!boxRef.current) return;

    const el = boxRef.current;
    const update = () => setBoxH(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, [label, cfg.textWidth]);

  const baseH = cfg.baseBoxHeight ?? 34; // tweak if needed
  const growDelta = fromTop ? Math.max(0, boxH - baseH) : 0;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: cfg.left,
        bottom: cfg.bottom,
        zIndex,
        // cancels “box grows upward” so the arrow stays connected
        transform: fromTop ? `translateY(${growDelta}px)` : undefined,
      }}
    >
      {/* LABEL BOX (NOT rotated unless you set textRotate) */}
      <div
        ref={boxRef}
        className="text-black font-bold"
        style={{
          width: `${cfg.textWidth ?? 230}px`,
          fontSize: "14px",
          background: "white",
          padding: "4px 6px",
          textAlign: "center",
          whiteSpace: "pre-line",
          border: `2px solid ${color}`,
          position: "relative",
          transform: `rotate(${cfg.textRotate ?? 0}deg)`,
          transformOrigin: "center",
        }}
      >
        {label}

        {/* ARROW GROUP (THIS is what guarantees connection) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: fromTop ? undefined : "100%",
            bottom: fromTop ? "100%" : undefined,

            // rotate arrow/line, and flip vertically when coming from top
            transform: `translateX(-50%) rotate(${cfg.rotate}deg)${
              fromTop ? " scaleY(-1)" : ""
            }`,
            transformOrigin: fromTop ? "bottom center" : "top center",
            width: 0,
            height: 0,
          }}
        >
          {/* line (starts EXACTLY at box edge) */}
          <div
            style={{
              height: `${lineLen}px`,
              borderLeft: `2px solid black`,
              marginLeft: "-1px",
            }}
          />

          {/* triangle (touches the line) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              top: `${lineLen}px`,
              borderTop: `18px solid ${triangleColor}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}



export default Drawings10;

