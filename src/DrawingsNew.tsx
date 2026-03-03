import React, { useMemo} from "react";
import Header from "./headers";

import Titlebox from "./assets/TITLE.svg?react";
import LOGO from "./assets/LOGO.svg?react";

// Drawings
import Layout9HX from "./assets/9HX Metal Heater.svg?react";

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
    return null; 
  }, [series]);


  // =========================
  // CONFIGS 
  // =========================
 
  const cfg9HX = {
    coldZonePos: { left: "60%", bottom: "65%" },
    hotZonePos: { left: "80%", bottom: "65%" },
    oalPos: { left: "68%", bottom: "76%" },
    materialPos: { left: "50%", bottom: "10%" },
    elemMatLeader: { left: "60%", bottom: "-18%", rotate: -10, lineHeight: 40, textOffsetY: 6, textWidth: 215 },
  };

  const overlayCfg = useMemo(() => {
    if (series === "9HX") return cfg9HX;

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
                    {series === "9HX" && (
                      <>
                        <RawNumber value={coldLength} style={cfg9HX.coldZonePos} />
                        <RawNumber value={hotLength} style={cfg9HX.hotZonePos} />
                        <RawNumber value={OAL} style={cfg9HX.oalPos} />
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

