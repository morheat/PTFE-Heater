import React, { useMemo } from "react";
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
import Layout3HXOL from "./assets/3HXOL Fluoropolymer Heater.svg?react";
import LayoutDTL from "./assets/Derated Triple L Shaped Metal Bottom Heater.svg?react";
import LayoutHXFL from "./assets/HXFL Fluoropolymer Heater.svg?react";
import LayoutHXL from "./assets/HXL Fluoropolymer Heater.svg?react";
import LayoutHXOL from "./assets/HXOL Fluoropolymer Heater.svg?react";
import LayoutHXRL from "./assets/HXRL Fluoropolymer Heater.svg?react";
import LayoutHXSL from "./assets/HXSL Fluoropolymer Heater.svg?react";
import LayoutLVT from "./assets/L-Shaped, Vertical Triple Metal Over the Side Heaters.svg?react";

const RawNumber: React.FC<{ value: string | number; style: React.CSSProperties }> = ({
  value,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      fontWeight: "bold",
      fontSize: "14px",
      pointerEvents: "none",
      backgroundColor: "white",
      padding: "2px 4px",
      lineHeight: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      color: "black",
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
  length: number;
  width: number;
  elementCount: number;
  series: string;
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
  length,
  width,
  elementCount,
  OAL,
  series,
  protector,
}) => {
  const LayoutSVG = useMemo(() => {
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
    if (series === "3HXOL") return Layout3HXOL;
    if (series === "DTL") return LayoutDTL;
    if (series === "HXFL") return LayoutHXFL;
    if (series === "HXL") return LayoutHXL;
    if (series === "HXOL") return LayoutHXOL;
    if (series === "HXRL") return LayoutHXRL;
    if (series === "HXSL") return LayoutHXSL;
    if (series === "LVT") return LayoutLVT;
    return null;
  }, [series]);

  const cfg9HX = {
    coldZonePos: { left: "61%", bottom: "69%" },
    hotZonePos: { left: "83%", bottom: "69%" },
    oalPos: { left: "70%", bottom: "80%" },
    elemMatLeader: { left: "85%", bottom: "-6%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg9HS = {
    coldZonePos: { left: "62.5%", bottom: "66.5%" },
    hotZonePos: { left: "85%", bottom: "66.5%" },
    oalPos: { left: "72%", bottom: "76%" },
    elemMatLeader: { left: "85%", bottom: "0%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg6HX = {
    coldZonePos: { left: "58%", bottom: "72%" },
    hotZonePos: { left: "81%", bottom: "72%" },
    oalPos: { left: "68%", bottom: "83.5%" },
    elemMatLeader: { left: "85%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg6HS = {
    coldZonePos: { left: "60%", bottom: "68%" },
    hotZonePos: { left: "84%", bottom: "68%" },
    oalPos: { left: "70%", bottom: "80%" },
    elemMatLeader: { left: "85%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg3HX = {
    coldZonePos: { left: "56%", bottom: "73%" },
    hotZonePos: { left: "81%", bottom: "73%" },
    oalPos: { left: "68%", bottom: "90.5%" },
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg3HS = {
    coldZonePos: { left: "56%", bottom: "73%" },
    hotZonePos: { left: "81%", bottom: "73%" },
    oalPos: { left: "68%", bottom: "90.5%" },
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg3HXO = {
    coldZonePos: { left: "50%", bottom: "83%" },
    hotZonePos: { left: "78%", bottom: "83%" },
    oalPos: { left: "68%", bottom: "93%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
  };

  const cfg5T = {
    coldZonePos: { left: "27%", bottom: "76%" },
    hotZonePos: { left: "48%", bottom: "76%" },
    oalPos: { left: "42%", bottom: "88%" },
    elemMatLeader: { left: "58%", bottom: "17%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgDTM = {
    coldZonePos: { left: "63.5%", bottom: "68%" },
    hotZonePos: { left: "81%", bottom: "68%" },
    oalPos: { left: "73%", bottom: "76%" },
    elemMatLeader: { left: "82%", bottom: "-8%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgFL = {
    coldZonePos: { left: "63.5%", bottom: "68%" },
    hotZonePos: { left: "81%", bottom: "68%" },
    oalPos: { left: "73%", bottom: "76%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgHXT = {
    coldZonePos: { left: "56%", bottom: "76%" },
    hotZonePos: { left: "75%", bottom: "76%" },
    oalPos: { left: "70%", bottom: "87%" },
    elemMatLeader: { left: "82%", bottom: "-1%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgMOTS = {
    coldZonePos: { left: "59%", bottom: "76.5%" },
    hotZonePos: { left: "78%", bottom: "76.5%" },
    oalPos: { left: "68%", bottom: "91%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgMOTS2 = {
    coldZonePos: { left: "59%", bottom: "72%" },
    hotZonePos: { left: "79%", bottom: "72%" },
    oalPos: { left: "69%", bottom: "85%" },
    elemMatLeader: { left: "82%", bottom: "-1%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgT = {
    coldZonePos: { left: "59%", bottom: "59%" },
    hotZonePos: { left: "79%", bottom: "59%" },
    oalPos: { left: "75%", bottom: "70%" },
    elemMatLeader: { left: "82%", bottom: "2%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfg3HXOL = {
    coldZonePos: { left: "68%", bottom: "86%" },
    hotZonePos: { left: "79.75%", bottom: "30%" },
    oalPos: { left: "76%", bottom: "91%" },
    elemMatLeader: { left: "60%", bottom: "42%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
  };

  const cfgDTL = {
    coldZonePos: { left: "56.5%", bottom: "43%" },
    hotZonePos: { left: "82%", bottom: "5.5%" },
    oalPos: { left: "70%", bottom: "82%" },
    elemMatLeader: { left: "82%", bottom: "10%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
  };

  const cfgHXFL = {
    coldZonePos: { left: "70%", bottom: "71.25%" },
    hotZonePos: { left: "92.75%", bottom: "30%" },
    oalPos: { left: "74%", bottom: "82%" },
    elemMatLeader: { left: "86%", bottom: "0%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
  };

  const cfgHXL = {
    coldZonePos: { left: "63%", bottom: "20%" },
    hotZonePos: { left: "74.5%", bottom: "23%" },
    oalPos: { left: "72%", bottom: "69%" },
    elemMatLeader: { left: "87%", bottom: "0%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth:0 },
  };

  const cfgHXOL = {
    coldZonePos: { left: "59.5%", bottom: "55%" },
    hotZonePos: { left: "92.5%", bottom: "40%" },
    lengthPos: { left: "34.5%", bottom: "36%" },
    widthPos: { left: "17.5%", bottom: "8.5%" },
    oalPos: { left: "68%", bottom: "10000%" }, // not needed
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgHXRL = {
    coldZonePos: { left: "69%", bottom: "63%" },
    hotZonePos: { left: "95%", bottom: "30%" },
    lengthPos: { left: "6%", bottom: "36%" },
    widthPos: { left: "22%", bottom: "10%" },
    oalPos: { left: "68%", bottom: "9000%" }, // not needed
    elemMatLeader: { left: "90%", bottom: "-1%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
  };

  const cfgHXSL = {
    coldZonePos: { left: "67%", bottom: "62.5%" },
    hotZonePos: { left: "85%", bottom: "62.5%" },
    lengthPos: { left: "35%", bottom: "26%" },
    widthPos: { left: "18%", bottom: "57%" },
    oalPos: { left: "68%", bottom: "9000%" }, // not needed
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
  };

  const cfgLVT = {
    coldZonePos: { left: "44.5%", bottom: "43%" },
    hotZonePos: { left: "70%", bottom: "3.5%" },
    oalPos: { left: "70%", bottom: "72000%" },//not needed
    elemMatLeader: { left: "82%", bottom: "15%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
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
    if (series === "3HXOL") return cfg3HXOL;
    if (series === "DTL") return cfgDTL;
    if (series === "HXFL") return cfgHXFL;
    if (series === "HXL") return cfgHXL;
    if (series === "HXOL") return cfgHXOL;
    if (series === "HXRL") return cfgHXRL;
    if (series === "HXSL") return cfgHXSL;
    if (series === "LVT") return cfgLVT;
    return null;
  }, [series]);

  const isHXOStyleSeries = ["HXOL", "HXRL", "HXSL"].includes(series);
  const showOALOnDrawing = series !== "DTL" && !isHXOStyleSeries;

  const lengthPos =
    overlayCfg && "lengthPos" in overlayCfg ? overlayCfg.lengthPos : undefined;

  const widthPos =
    overlayCfg && "widthPos" in overlayCfg ? overlayCfg.widthPos : undefined;

  return (
    <div
      ref={drawingRef}
      className="relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg"
    >
      <Header
        serialNum={serialNum}
        title={title}
        material={material}
        voltage={voltage}
        phase={phase}
        wattage={wattage}
        elementNum={elementCount}
        series={series}
        protector={protector}
        coldLength={coldLength}
        OAL={OAL}
      />

      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <LOGO className="absolute w-[16rem] ml-[650px] mt-[460px]" />
      </div>

      <div className="h-full w-full flex items-center justify-center">
        {!LayoutSVG ? (
          <div className="text-slate-600 text-sm">No drawing available for this configuration.</div>
        ) : (
          <div
            className="relative w-[950px] flex items-center justify-center"
            style={{ transform: "translateY(-60px)" }}
          >
            <LayoutSVG style={{ width: "95%", height: "100%", objectFit: "contain" }} />

            {overlayCfg && (
              <>
                <RawNumber value={coldLength} style={overlayCfg.coldZonePos} />
                <RawNumber value={hotLength} style={overlayCfg.hotZonePos} />

                {lengthPos && isHXOStyleSeries && (
                  <RawNumber value={length} style={lengthPos} />
                )}

                {widthPos && isHXOStyleSeries && (
                  <RawNumber value={width} style={widthPos} />
                )}

                {showOALOnDrawing && <RawNumber value={OAL} style={overlayCfg.oalPos} />}

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
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-black" />

                    <div
                      style={{
                        height: overlayCfg.elemMatLeader.lineHeight,
                        borderLeft: "2px solid black",
                        marginLeft: "9px",
                      }}
                    />

                    <div
                      key={`${elementCount}-${material}`}
                      className="text-black"
                      style={{
                        marginLeft: "-10px",
                        marginTop: overlayCfg.elemMatLeader.textOffsetY,
                        width: `${overlayCfg.elemMatLeader.textWidth}px`,
                        transform: "rotate(10deg)",
                        fontSize: "16px",
                        background: "white",
                        padding: "0px 0px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ lineHeight: "18px", width: "100%" }}>
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