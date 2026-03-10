import React, { useMemo} from "react";
import Header from "./headers";

import Titlebox from "./assets/TITLE.svg?react";
import LOGO from "./assets/LOGO.svg?react";

// Drawings
import Layout9HX from "./assets/9HX Metal Heater.svg?react";
import Layout9HS from "./assets/9HS Metal Heater.svg?react";
import Layout6HX from "./assets/6HX Metal Heater.svg?react";
import Layout6HS from "./assets/6HS Metal Heater.svg?react";
import Layout3HX from "./assets/3HX Fluoropolymer Heater.svg?react";
import Layout3HS from "./assets/3HS Series Tubular Metal Heater.svg?react";
import Layout3HXO from "./assets/3HXO Fluoropolymer Heater.svg?react";
import Layout5T from "./assets/5T & T5T Screwplug Heater.svg?react";
import LayoutDTM from "./assets/Derated Triple Metal Over the Side Heaters.svg?react";
import LayoutFL from "./assets/FL Series Flanged Heater.svg?react";
import LayoutHXT from "./assets/HXT Screwplug Heater.svg?react";
import LayoutMOTS from "./assets/MOTS Single Derated.svg?react";
import LayoutMOTS2 from "./assets/MOTS.svg?react";
import LayoutT from "./assets/T Series Tubular Screwplug Heater.svg?react";

const RawNumber: React.FC<{ value: string | number; style: React.CSSProperties }> = ({ value, style }) => (
  <div
    style={{
      position: "absolute",
      fontWeight: "bold",
      fontSize: "14px",
      pointerEvents: "none",
      backgroundColor: "white", // White box background
      padding: "2px 4px",       // Space around text
      lineHeight: "1",          // Tighter box
      display: "flex",
      alignItems: "center",
      justifyContent: "center",  // Centers text horizontally inside the div
      whiteSpace: "nowrap",      // Prevents the number and " from splitting
      color: "black",
      
      /* This is the magic line: 
         -50% on X moves it left by half its own width.
         50% on Y moves it up/down relative to the bottom anchor.
      */
      transform: "translate(-50%, 50%)", 
      
      ...style,
    }}
  >
    {value}"
  </div>
);


interface drawingProps {
  drawingRef: React.RefObject<HTMLDivElement>;
  serialNum: string;
  title: string;
  phase: number;
  material: string;
  voltage: number;
  wattage: number;
  OAL: number;
  coldLength: number;
  hotLength: number;
  elementCount: number;
  series:string;
  protector: string;
}

const Drawings10: React.FC<drawingProps> = ({
  drawingRef,
  serialNum,
  title,
  phase,
  material,
  voltage,
  wattage,
  coldLength,
  hotLength,
  elementCount,
  OAL,
  series,
  protector,
}) => {

  // 1. DRAWING SELECTION
  const LayoutSVG = useMemo(() => {
    // Priority 1: Check series
    if (series === "9HX") return Layout9HX;
    if (series === "9HS") return Layout9HS;
    if (series === "6HX") return Layout6HX;
    if (series === "6HS") return Layout6HS;
    if (series === "3HX") return Layout3HX;
    if (series === "3HS") return Layout3HS;
    if (series === "3HXO") return Layout3HXO;
    if (series === "5T") return Layout5T;
    if (series === "DTM") return LayoutDTM;
    if (series === "FL") return LayoutFL;
    if (series === "HXT") return LayoutHXT;
    if (series === "MOTS Single") return LayoutMOTS;
    if (series === "MOTS") return LayoutMOTS2;
    if (series === "T") return LayoutT;
    return null; 
  }, [series]);


  // =========================
  // CONFIGS 
  // =========================
 
  const cfg9HX = {
    coldZonePos: { left: "61%", bottom: "69%" },
    hotZonePos: { left: "83%", bottom: "69%" },
    oalPos: { left: "70%", bottom: "80%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-13%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg9HS = {
    coldZonePos: { left: "62.5%", bottom: "66.5%" },
    hotZonePos: { left: "85%", bottom: "66.5%" },
    oalPos: { left: "72%", bottom: "76%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg6HX = {
    coldZonePos: { left: "58%", bottom: "72%" },
    hotZonePos: { left: "81%", bottom: "72%" },
    oalPos: { left: "68%", bottom: "83.5%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg6HS = {
    coldZonePos: { left: "60%", bottom: "68%" },
    hotZonePos: { left: "84%", bottom: "68%" },
    oalPos: { left: "70%", bottom: "80%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-18%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg3HX = {
    coldZonePos: { left: "56%", bottom: "73%" },
    hotZonePos: { left: "81%", bottom: "73%" },
    oalPos: { left: "68%", bottom: "90.5%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-20%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg3HS = {
    coldZonePos: { left: "56%", bottom: "73%" },
    hotZonePos: { left: "81%", bottom: "73%" },
    oalPos: { left: "68%", bottom: "90.5%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "85%", bottom: "-20%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg3HXO = {
    coldZonePos: { left: "50%", bottom: "83%" },
    hotZonePos: { left: "78%", bottom: "83%" },
    oalPos: { left: "68%", bottom: "93%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfg5T = {
    coldZonePos: { left: "27%", bottom: "76%" },
    hotZonePos: { left: "48%", bottom: "76%" },
    oalPos: { left: "42%", bottom: "88%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "58%", bottom: "12%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgDTM = {
    coldZonePos: { left: "63.5%", bottom: "68%" },
    hotZonePos: { left: "81%", bottom: "68%" },
    oalPos: { left: "73%", bottom: "76%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgFL = {
    coldZonePos: { left: "63.5%", bottom: "68%" },
    hotZonePos: { left: "81%", bottom: "68%" },
    oalPos: { left: "73%", bottom: "76%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgHXT = {
    coldZonePos: { left: "56%", bottom: "76%" },
    hotZonePos: { left: "75%", bottom: "76%" },
    oalPos: { left: "70%", bottom: "87%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgMOTS = {
    coldZonePos: { left: "59%", bottom: "76.5%" },
    hotZonePos: { left: "78%", bottom: "76.5%" },
    oalPos: { left: "68%", bottom: "91%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgMOTS2 = {
    coldZonePos: { left: "59%", bottom: "72%" },
    hotZonePos: { left: "79%", bottom: "72%" },
    oalPos: { left: "69%", bottom: "85%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const cfgT = {
    coldZonePos: { left: "59%", bottom: "59%" },
    hotZonePos: { left: "79%", bottom: "59%" },
    oalPos: { left: "75%", bottom: "70%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const overlayCfg = useMemo(() => {
    if (series === "9HX") return cfg9HX;
    if (series === "9HS") return cfg9HS;
    if (series === "6HX") return cfg6HX;
    if (series === "6HS") return cfg6HS;
    if (series === "3HX") return cfg3HX;
    if (series === "3HS") return cfg3HS;
    if (series === "3HXO") return cfg3HXO;
    if (series === "5T") return cfg5T;
    if (series === "DTM") return cfgDTM;
    if (series === "FL") return cfgFL;
    if (series === "HXT") return cfgHXT;
    if (series === "MOTS Single") return cfgMOTS;
    if (series === "MOTS") return cfgMOTS2;
    if (series === "T") return cfgT;

    return null;
  }, [series]);

  return (
    <div ref={drawingRef} className=" relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg">
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        phase={phase}
        wattage={wattage}
        elementNum={elementCount}
        series = {series}
        protector = {protector}
        coldLength={coldLength}
        OAL = {OAL}
      />


      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <LOGO className="absolute w-[16rem] ml-[650px] mt-[460px]" />
      </div>

      <div className="h-full w-full flex items-center justify-center">
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
                  {/* 9HX TEXT-ONLY DIMENSIONS */}
                    {true&& (
                      <>
                        <RawNumber value={coldLength} style={overlayCfg.coldZonePos} />
                        <RawNumber value={hotLength} style={overlayCfg.hotZonePos} />
                        <RawNumber value={OAL} style={overlayCfg.oalPos} />
                      </>
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


export default Drawings10;

