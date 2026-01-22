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
  phase: string;
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
}) => {
  const showHL = hlSensor !== "nHL";
  const showProcess = processTemp !== "nT";
  const hasFold = foldLength > 0 && NPTSize !==1.25;
  const showColdDim = coldLength > 0;


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
    thermoDim: { left: "51%", bottom: "38%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "51%", bottom: "31%", width: "26%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-28%", rotate: 10, lineHeight: 78, textOffsetY: -2},
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "15%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51%", bottom: "-11%", width: "10%", riseHeight: 70 },
  };

    const cfg1N1Fold = {
    processBar: { left: "52%", bottom: "40%", width: "18%", height: "5%" },
    thermoDim: { left: "52%", bottom: "38%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "52%", bottom: "31%", width: "26%", height: "2%" },
    hlLeader: { left: "65%", bottom: "-32%", rotate: 10, lineHeight: 78, textOffsetY: -2},
    
    elemMatLeader: { left: "85%", bottom: "-9%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "15%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "76%", top: "30%" },

    coldDim: { left: "52%", bottom: "-15%", width: "10%", riseHeight: 70 },
  };

  //Nema 4
  const cfg1N4 = {
    processBar: { left: "58%", bottom: "48.25%", width: "18%", height: "5%" },
    thermoDim: { left: "58%", bottom: "46.5%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58%", bottom: "42%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-17%", rotate: 10, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "11%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "76%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58%", bottom: "-5%", width: "10%", riseHeight: 102 },
  };

  const cfg1N4Fold = {
    processBar: { left: "57.5%", bottom: "49%", width: "18%", height: "5%" },
    thermoDim: { left: "57.5%", bottom: "46.5%", width: "18%", dropHeight: 100 },
    
    hlBar: { left: "57.5%", bottom: "43%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-17%", rotate: 10, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "80%", top: "14%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "78%", top: "27%" },

    coldDim: { left: "57.5%", bottom: "-4%", width: "10%", riseHeight: 102 },
  };

  //Nema 7
  const cfg1N7 = {
    processBar: { left: "58.85%", bottom: "44.5%", width: "18%", height: "5%" },
    thermoDim: { left: "58.85%", bottom: "42%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58.85%", bottom: "39%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-16%", rotate: 10, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "10%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "76%", top: "16%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.85%", bottom: "3%", width: "10%", riseHeight: 80 },
  };

  const cfg1N7Fold = {
    processBar: { left: "58.5%", bottom: "48%", width: "18%", height: "3%" },
    thermoDim: { left: "58.5%", bottom: "46.5%", width: "18%", dropHeight: 20 },
    
    hlBar: { left: "58.5%", bottom: "42%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-8%", rotate: 10, lineHeight: 110, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "17%", rotate: -10, lineHeight: 55, textOffsetY: 6, textWidth: 215 },

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
    thermoDim: { left: "51%", bottom: "35%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "51%", bottom: "28%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-32%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-12%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51%", bottom: "-24%", width: "10%", riseHeight: 80 },
  };

  const cfg125N1E2 = {
    processBar: { left: "50.75%", bottom: "42%", width: "18%", height: "5%" },
    thermoDim: { left: "50.75%", bottom: "41%", width: "18%", dropHeight:90 },
    
    hlBar: { left: "50.75%", bottom: "31%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-32%", rotate: 10, lineHeight: 76, textOffsetY: -2},
    
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
    thermoDim: { left: "58.25%", bottom: "46%", width: "18%", dropHeight: 60 },
    
    hlBar: { left: "58.25%", bottom: "42%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-4%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 30, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "10%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.25%", bottom: "15%", width: "10%", riseHeight: 45 },
  };

  const cfg125N4E2 = {
    processBar: { left: "58.5%", bottom: "50.5%", width: "18%", height: "5%" },
    thermoDim: { left: "58.5%", bottom: "50%", width: "18%", dropHeight: 50 },
    
    hlBar: { left: "58.5%", bottom: "43.5%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-4%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
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
    thermoDim: { left: "58.25%", bottom: "47%", width: "18%", dropHeight: 68 },
    
    hlBar: { left: "58.25%", bottom: "44%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-4%", rotate: 10, lineHeight: 92, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "12%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "77%", top: "13%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "58.25%", bottom: "15%", width: "10%", riseHeight: 60 },
  };

  const cfg125N7E2 = {
    processBar: { left: "51.5%", bottom: "40%", width: "18%", height: "5%" },
    thermoDim: { left: "51.5%", bottom: "38%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "51.5%", bottom: "25%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-40%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
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
    thermoDim: { left: "51.25%", bottom: "47%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "51.25%", bottom: "25%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-29%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
    elemMatLeader: { left: "86%", bottom: "-10%", rotate: -10, lineHeight: 48, textOffsetY: 6, textWidth: 215 },

    immersionCover: { left: "70%", top: "0%", width: "0%", height: "11%" },
    immersionText: { left: "73%", top: "14%" },

    foldbackCover: { left: "60%", top: "40%", width: "0%", height: "5%" },
    foldbackText: { left: "75%", top: "30%" },

    coldDim: { left: "51.25%", bottom: "-20%", width: "10%", riseHeight: 80 },
  };
  //NEMA 4
  const cfg2N4 = {
    processBar: { left: "58.5%", bottom: "50%", width: "18%", height: "5%" },
    thermoDim: { left: "58.5%", bottom: "55%", width: "18%", dropHeight: 90 },
    
    hlBar: { left: "58.5%", bottom: "37%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-16%", rotate: 10, lineHeight: 90, textOffsetY: -2},
    
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
    thermoDim: { left: "59%", bottom: "46%", width: "18%", dropHeight: 40 },
    
    hlBar: { left: "59%", bottom: "28%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-31%", rotate: 10, lineHeight: 90, textOffsetY: -2},
    
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
    thermoDim: { left: "52.5%", bottom: "53%", width: "18%", dropHeight: 80 },
    
    hlBar: { left: "52.5%", bottom: "19%", width: "26%", height: "2%" },
    hlLeader: { left: "70%", bottom: "-38%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
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
    thermoDim: { left: "59.5%", bottom: "56%", width: "18%", dropHeight: 80 },
    
    hlBar: { left: "59.5%", bottom: "33%", width: "26%", height: "2%" },
    hlLeader: { left: "73%", bottom: "-16%", rotate: 10, lineHeight: 70, textOffsetY: -2},
    
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
    thermoDim: { left: "59.25%", bottom: "46%", width: "18%", dropHeight: 40 },
    
    hlBar: { left: "59.25%", bottom: "23%", width: "26%", height: "2%" },
    hlLeader: { left: "75%", bottom: "-34%", rotate: 10, lineHeight: 77, textOffsetY: -2},
    
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
    // // 3 inch
    // if (NPTSize === 3) {
    //   if (elementNumN === 3) return isN7 ? cfg3N7_E3 : cfg3N14_E3;
    //   if (elementNumN === 6) return isN7 ? cfg3N7_E6 : cfg3N14_E6;
    // }
    
    // //4 inch
    // if (NPTSize === 4) {
    //   if (elementNumN === 6) return isN7 ? cfg4N7_E6 : cfg4N14_E6;
    //   if (elementNumN === 9) return isN7 ? cfg4N7_E9 : cfg4N14_E9;
    // }

    // //5 inch
    // if (NPTSize === 5) {
    //   if (terminalBox === "N1") return cfg5N1;
    //   if (terminalBox === "N4") return cfg5N4;
    //   if (terminalBox === "N7") return cfg5N7;
    // }

    // //6 inch
    // if (NPTSize === 6) {
    //   if (terminalBox === "N1") return cfg6N1;
    //   if (terminalBox === "N4") return cfg6N4;
    //   if (terminalBox === "N7") return cfg6N7;
    // }

    // //8 inch
    // if (NPTSize === 8) {
    //   if (terminalBox === "N1") return cfg8N1;
    //   if (terminalBox === "N4") return cfg8N4;
    //   if (terminalBox === "N7") return cfg8N7;
    // }

    // //12 inch
    // if (NPTSize === 12) {
    //   if (terminalBox === "N1") return cfg12N1;
    //   if (terminalBox === "N4") return cfg12N4;
    //   if (terminalBox === "N7") return cfg12N7;
    // }

    return null;
  }, [NPTSize, phase, terminalBox, hasFold, elementCount]);

  return (
    <div ref={drawingRef} className=" relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        wattage={wattage}
        terminalBox={terminalBox}
        thermostat={typeThermostat}
        phase={phase}
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
          <div className="relative w-[950px] flex items-center justify-center">
            {/* Static drawing */}
             <LayoutSVG
                style={{ width: "95%", height: "100%", objectFit: "contain" }}
              />

            {/* ✅ Only render overlays when we actually have overlayCfg */}
            {overlayCfg && (
              <>
                {/* ===== Process Temp Sensor (BLUE bar) ===== */}
                {showProcess && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.processBar.left,
                      bottom: overlayCfg.processBar.bottom,
                      width: overlayCfg.processBar.width,
                      height: overlayCfg.processBar.height,
                      backgroundColor: "#22d3ee",
                      border: "1px solid black",
                      zIndex: 50,
                    }}
                  />
                )}

                {/* ===== High Limit (YELLOW bar) ===== */}
                {showHL && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: overlayCfg.hlBar.left,
                      bottom: overlayCfg.hlBar.bottom,
                      width: overlayCfg.hlBar.width,
                      height: overlayCfg.hlBar.height,
                      backgroundColor: "#facc15",
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


                {/* ==============================
                        TEMP SENSOR OPTION (HL)
                        Yellow bar + leader text
                    ============================== */}
                    {showHL && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: overlayCfg.hlLeader.left,
                          bottom: overlayCfg.hlLeader.bottom,
                          transform: `rotate(${overlayCfg.hlLeader.rotate}deg)`,
                          zIndex: 96,
                        }}
                      >
                        {/* triangle */}
                        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                        {/* leader line */}
                        <div
                          style={{
                            height: overlayCfg.hlLeader.lineHeight,
                            borderLeft: "2px solid black",
                            marginLeft: "9px",
                          }}
                        />

                        {/* label */}
                        <div
                          className="text-black"
                          style={{
                            marginLeft: "-85px",
                            marginTop: overlayCfg.hlLeader.textOffsetY,
                            width: "220px",
                            transform: "rotate(-10deg)",
                            fontSize: "16px",
                            background: "white",
                            padding: "2px 6px",
                          }}
                        >
                          {hlSensor === "HLTC" && <>High-Limit Thermocouple</>}
                          {hlSensor === "HLTS" && <>High-Limit Thermostat</>}
                        </div>
                      </div>
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
                            {NPTSize === 1.25 &&(<div>{elementCount} Elements</div>)}
                            <div>Material: {material}</div>
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

export default Drawings10;

