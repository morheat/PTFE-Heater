import React, { useMemo } from "react";
import Header from "./headers";

import Titlebox from "./assets/TITLE.svg?react";
import LOGO from "./assets/NewLOGO.png";

// ─── Main Drawings ────────────────────────────────────────────────────────────
import Layout9HX from "./assets/9HX Metal Heater.svg?react";
import Layout9HS from "./assets/9HS Metal Heater.svg?react";
import Layout6HX from "./assets/6HX Metal Heater.svg?react";
import Layout6HS from "./assets/6HS Metal Heater.svg?react";
import Layout3HX from "./assets/3HX Fluoropolymer Heater.svg?react";
import Layout3HS from "./assets/3HS Series Tubular Metal Heater.svg?react";
import Layout3HXO from "./assets/3HXO Fluoropolymer Heater.svg?react";
import LayoutDTM from "./assets/Derated Triple Metal Over the Side Heaters.svg?react";
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

// ─── ISO Isometric Views (PNG) ────────────────────────────────────────────────
import Iso9HX from "./assets/9HX ISO.png";
import Iso9HS from "./assets/9HS ISO.png";
import Iso6HX from "./assets/6HX ISO.png";
import Iso6HS from "./assets/6HS ISO.png";
import Iso3HX from "./assets/3HX ISO.png";
import Iso3HS from "./assets/3HS ISO.png";
import Iso3HXO from "./assets/3HXO ISO.png";
import IsoD3 from "./assets/D3 ISO.png";
import IsoD3L from "./assets/D3L ISO.png";
import IsoDMOTS from "./assets/DMOTS ISO.png";
import IsoMOTS from "./assets/MOTS ISO.png";
import IsoT from "./assets/T ISO.png";
import IsoHXFL from "./assets/HXFL ISO.png";
import IsoHXL from "./assets/HXL ISO.png";
import IsoHXOL from "./assets/HXOL ISO.png";
import Iso3HXOL from "./assets/3HXOL ISO.png"
import IsoHXRL from "./assets/HXRL ISO.png";
import IsoHXSL from "./assets/HXSL ISO.png";
import IsoLVT from "./assets/3LV ISO.png";

// ─── RawNumber overlay ────────────────────────────────────────────────────────
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

// Smaller variant for ISO panel
const IsoNumber: React.FC<{ value: string | number; style: React.CSSProperties }> = ({
  value,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      fontWeight: "bold",
      fontSize: "10px",
      pointerEvents: "none",
      backgroundColor: "white",
      padding: "1px 3px",
      lineHeight: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      color: "black",
      transform: "translate(-50%, 50%)",
      zIndex: 10,
      ...style,
    }}
  >
    {value}"
  </div>
);

// ─── Props ────────────────────────────────────────────────────────────────────
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
  partNumber: string;
  wireLen?: string;
}

// ─── Config type ──────────────────────────────────────────────────────────────
interface OverlayConfig {
  coldZonePos: React.CSSProperties;
  hotZonePos: React.CSSProperties;
  oalPos: React.CSSProperties;
  widthPos?: React.CSSProperties;
  lengthPos?: React.CSSProperties;
  elemMatLeader: {
    left: string;
    bottom: string;
    rotate: number;
    lineHeight: number;
    textOffsetY: number;
    textWidth: number;
  };
  // ── ISO panel config ──
  isoImg?: string | null;
  /** ISO container width in px (default 160) */
  isoWidth?: number;
  /** ISO container height in px (default 220) */
  isoHeight?: number;
  /** Absolute position of the ISO container inside the drawing canvas */
  isoContainerPos?: React.CSSProperties;
  isoColdZonePos?: React.CSSProperties;
  isoHotZonePos?: React.CSSProperties;
  isoOalPos?: React.CSSProperties;
  isoWidthPos?: React.CSSProperties;
  isoLengthPos?: React.CSSProperties;
}

// ─── Main Drawing component ───────────────────────────────────────────────────
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
  partNumber,
  wireLen,
}) => {
  // ── Layout SVG picker ──────────────────────────────────────────────────────
  const LayoutSVG = useMemo(() => {
    if (series === "9HX") return Layout9HX;
    if (series === "9HS") return Layout9HS;
    if (series === "6HX") return Layout6HX;
    if (series === "6HS") return Layout6HS;
    if (series === "3HX") return Layout3HX;
    if (series === "3HS") return Layout3HS;
    if (series === "3HXO") return Layout3HXO;
    if (series === "D3") return LayoutDTM;
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

  // ── Per-series overlay configs ─────────────────────────────────────────────
  //
  //  ISO positions are relative to the ISO container box.
  //  Use left/bottom percentages just like the main drawing positions.
  //  Adjust isoColdZonePos / isoHotZonePos / isoOalPos (etc.) to fine-tune
  //  where the dimension labels appear on each ISO image.
  //
  //  isoContainerPos sets WHERE the ISO box is on the drawing canvas.
  //  Default is top-right. Override per series if the drawing is crowded.

  const cfg9HX: OverlayConfig = {
    coldZonePos:  { left: "61%",   bottom: "69%" },
    hotZonePos:   { left: "83%",   bottom: "69%" },
    oalPos:       { left: "70%",   bottom: "80%" },
    elemMatLeader: { left: "85%", bottom: "-6%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso9HX,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "32px" },
    isoColdZonePos: { left: "64.5%", bottom: "75%" },
    isoHotZonePos:  { left: "64.5%", bottom: "38%" },
    isoOalPos:      { left: "75%", bottom: "45%" },
  };

  const cfg9HS: OverlayConfig = {
    coldZonePos:  { left: "62.5%", bottom: "66.5%" },
    hotZonePos:   { left: "85%",   bottom: "66.5%" },
    oalPos:       { left: "72%",   bottom: "76%" },
    elemMatLeader: { left: "85%", bottom: "0%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso9HS,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "32px" },
    isoColdZonePos: { left: "73%", bottom: "75%" },
    isoHotZonePos:  { left: "73%", bottom: "33%" },
    isoOalPos:      { left: "88%", bottom: "45%" },
  };

  const cfg6HX: OverlayConfig = {
    coldZonePos:  { left: "58%", bottom: "72%" },
    hotZonePos:   { left: "81%", bottom: "72%" },
    oalPos:       { left: "68%", bottom: "83.5%" },
    elemMatLeader: { left: "85%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso6HX,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "32px" },
    isoColdZonePos: { left: "64.5%", bottom: "77%" },
    isoHotZonePos:  { left: "64.5%", bottom: "38%" },
    isoOalPos:      { left: "75%", bottom: "45%" },
  };

  const cfg6HS: OverlayConfig = {
    coldZonePos:  { left: "60%", bottom: "68%" },
    hotZonePos:   { left: "84%", bottom: "68%" },
    oalPos:       { left: "70%", bottom: "80%" },
    elemMatLeader: { left: "85%", bottom: "-12%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso6HS,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "32px" },
    isoColdZonePos: { left: "68%", bottom: "75%" },
    isoHotZonePos:  { left: "68%", bottom: "33%" },
    isoOalPos:      { left: "80%", bottom: "45%" },
  };

  const cfg3HX: OverlayConfig = {
    coldZonePos:  { left: "56%", bottom: "73%" },
    hotZonePos:   { left: "81%", bottom: "73%" },
    oalPos:       { left: "68%", bottom: "90.5%" },
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO (uses 3HXO ISO as closest match; swap to a dedicated file if available) ──
    isoImg: Iso3HX,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "825px", top: "32px" },
    isoColdZonePos: { left: "68%", bottom: "80%" },
    isoHotZonePos:  { left: "68%", bottom: "38%" },
    isoOalPos:      { left: "82%", bottom: "45%" },
  };

  const cfg3HS: OverlayConfig = {
    coldZonePos:  { left: "56%", bottom: "73%" },
    hotZonePos:   { left: "81%", bottom: "73%" },
    oalPos:       { left: "68%", bottom: "90.5%" },
    elemMatLeader: { left: "85%", bottom: "-14%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso3HS,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "825px", top: "32px" },
    isoColdZonePos: { left: "58%", bottom: "72%" },
    isoHotZonePos:  { left: "58%", bottom: "32%" },
    isoOalPos:      { left: "72%", bottom: "43%" },
  };

  const cfg3HXO: OverlayConfig = {
    coldZonePos:  { left: "50%", bottom: "83%" },
    hotZonePos:   { left: "78%", bottom: "83%" },
    oalPos:       { left: "68%", bottom: "93%" },
    widthPos:     { left: "25%", bottom: "42.5%" },
    elemMatLeader: { left: "82%", bottom: "-12%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: Iso3HXO,
    isoWidth: 140, isoHeight: 180,
    isoContainerPos: { right: "825px", top: "32px" },
    isoColdZonePos: { left: "70%", bottom: "68%" },
    isoHotZonePos:  { left: "70%", bottom: "35%" },
    isoOalPos:      { left: "90%", bottom: "50%" },
  };

  const cfgDTM: OverlayConfig = {
    coldZonePos:  { left: "63.5%", bottom: "68%" },
    hotZonePos:   { left: "81%",   bottom: "68%" },
    oalPos:       { left: "73%",   bottom: "76%" },
    elemMatLeader: { left: "82%", bottom: "-8%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoD3,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "32px" },
    isoColdZonePos: { left: "72%", bottom: "74%" },
    isoHotZonePos:  { left: "72%", bottom: "34%" },
    isoOalPos:      { left: "86%", bottom: "45%" },
  };

  const cfgMOTS: OverlayConfig = {
    coldZonePos:  { left: "59%", bottom: "76.5%" },
    hotZonePos:   { left: "78%", bottom: "76.5%" },
    oalPos:       { left: "68%", bottom: "91%" },
    elemMatLeader: { left: "82%", bottom: "-5%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoDMOTS,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "830px", top: "32px" },
    isoColdZonePos: { left: "61%", bottom: "71%" },
    isoHotZonePos:  { left: "61%", bottom: "31%" },
    isoOalPos:      { left: "75%", bottom: "42%" },
  };

  const cfgMOTS2: OverlayConfig = {
    coldZonePos:  { left: "59%", bottom: "72%" },
    hotZonePos:   { left: "79%", bottom: "72%" },
    oalPos:       { left: "69%", bottom: "85%" },
    elemMatLeader: { left: "82%", bottom: "-1%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoMOTS,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "830px", top: "32px" },
    isoColdZonePos: { left: "61%", bottom: "75%" },
    isoHotZonePos:  { left: "61%", bottom: "33%" },
    isoOalPos:      { left: "75%", bottom: "45%" },
  };

  const cfgT: OverlayConfig = {
    coldZonePos:  { left: "59%", bottom: "59%" },
    hotZonePos:   { left: "79%", bottom: "59%" },
    oalPos:       { left: "75%", bottom: "70%" },
    elemMatLeader: { left: "82%", bottom: "2%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoT,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "35px" },
    isoColdZonePos: { left: "64%", bottom: "60%" },
    isoHotZonePos:  { left: "64%", bottom: "27%" },
    isoOalPos:      { left: "75%", bottom: "35%" },
  };

  const cfg3HXOL: OverlayConfig = {
    coldZonePos:  { left: "68%",    bottom: "86%" },
    hotZonePos:   { left: "79.75%", bottom: "30%" },
    oalPos:       { left: "76%",    bottom: "91%" },
    widthPos:     { left: "21.5%",  bottom: "0%" },
    elemMatLeader: { left: "60%", bottom: "42%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
    // No ISO available for 3HXOL yet; set isoImg: null to hide panel
    isoImg: Iso3HXOL,
    isoWidth: 110, isoHeight: 200,
    isoContainerPos: { right: "860px", top: "35px" },
    isoHotZonePos:  { left: "70%", bottom: "15%" },
    isoOalPos:      { left: "89%", bottom: "57%" },
    isoWidthPos:{left: "30%", bottom: "12%"}
  };

  const cfgDTL: OverlayConfig = {
    coldZonePos:  { left: "56.5%", bottom: "43%" },
    hotZonePos:   { left: "82%",   bottom: "5.5%" },
    oalPos:       { left: "70%",   bottom: "82%" },
    elemMatLeader: { left: "82%", bottom: "10%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoD3L,
    isoWidth: 180, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "35px" },
    isoColdZonePos: { left: "82%", bottom: "60%" },
    isoHotZonePos:  { left: "55%", bottom: "12%" },
  };

  const cfgHXFL: OverlayConfig = {
    coldZonePos:  { left: "70%",    bottom: "71.25%" },
    hotZonePos:   { left: "92.75%", bottom: "30%" },
    oalPos:       { left: "74%",    bottom: "82%" },
    elemMatLeader: { left: "86%", bottom: "0%", rotate: -10, lineHeight: 30, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoHXFL,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "35px" },
    isoOalPos: { left: "32%", bottom: "50%" },
    isoHotZonePos:  { left: "52%", bottom: "6%" },
  };

  const cfgHXL: OverlayConfig = {
    coldZonePos:  { left: "63%",   bottom: "20%" },
    hotZonePos:   { left: "74.5%", bottom: "23%" },
    oalPos:       { left: "72%",   bottom: "69%" },
    elemMatLeader: { left: "87%", bottom: "0%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoHXL,
    isoWidth: 140, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "35px" },
    isoOalPos: { left: "34%", bottom: "55%" },
    isoHotZonePos:  { left: "52%", bottom: "11%" },
  };

  const cfgHXOL: OverlayConfig = {
    coldZonePos:  { left: "59.5%", bottom: "55%" },
    hotZonePos:   { left: "92.5%", bottom: "38%" },
    lengthPos:    { left: "34.5%", bottom: "38%" },
    widthPos:     { left: "16.5%", bottom: "8.5%" },
    oalPos:       { left: "68%",   bottom: "10000%" }, // not needed
    elemMatLeader: { left: "85%", bottom: "0%", rotate: -10, lineHeight: 40, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoHXOL,
    isoWidth: 200, isoHeight: 180,
    isoContainerPos: { right: "760px", top: "35px" },
    isoColdZonePos: { left: "42%", bottom: "41%" },
    isoLengthPos:   { left: "30%", bottom: "9%" },
    isoWidthPos:    { left: "52%", bottom: "9%" },
  };

  const cfgHXRL: OverlayConfig = {
    coldZonePos:  { left: "69%", bottom: "63%" },
    hotZonePos:   { left: "95%", bottom: "30%" },
    lengthPos:    { left: "6%",  bottom: "36%" },
    widthPos:     { left: "22%", bottom: "10%" },
    oalPos:       { left: "68%", bottom: "9000%" }, // not needed
    elemMatLeader: { left: "90%", bottom: "-1%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoHXRL,
    isoWidth: 200, isoHeight: 180,
    isoContainerPos: { right: "760px", top: "35px" },
    isoColdZonePos: { left: "63%", bottom: "44%" },
    isoLengthPos:   { left: "32%", bottom: "9%" },
    isoWidthPos:    { left: "65%", bottom: "9%" },
  };

  const cfgHXSL: OverlayConfig = {
    coldZonePos:  { left: "67%",   bottom: "62.5%" },
    hotZonePos:   { left: "85%",   bottom: "62.5%" },
    lengthPos:    { left: "10.5%", bottom: "36%" },
    widthPos:     { left: "27%",   bottom: "7%" },
    oalPos:       { left: "68%",   bottom: "9000%" }, // not needed
    elemMatLeader: { left: "88%", bottom: "0%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoHXSL,
    isoWidth: 200, isoHeight: 180,
    isoContainerPos: { right: "760px", top: "35px" },
    isoColdZonePos: { left: "38%", bottom: "53%" },
    isoHotZonePos:  { left: "20%", bottom: "26%" },
    isoLengthPos:   { left: "42%", bottom: "7%" },
    isoWidthPos:    { left: "78%", bottom: "11%" },
  };

  const cfgLVT: OverlayConfig = {
    coldZonePos:  { left: "44.5%", bottom: "43%" },
    hotZonePos:   { left: "70%",   bottom: "3.5%" },
    oalPos:       { left: "70%",   bottom: "72000%" }, // not needed
    elemMatLeader: { left: "80%", bottom: "15%", rotate: -10, lineHeight: 20, textOffsetY: 0, textWidth: 0 },
    // ── ISO ──
    isoImg: IsoLVT,
    isoWidth: 180, isoHeight: 200,
    isoContainerPos: { right: "30px", top: "35px" },
    isoColdZonePos: { left: "16%", bottom: "58%" },
    isoHotZonePos:  { left: "53%", bottom: "11%" },
  };

  // ── Pick active config ──────────────────────────────────────────────────────
  const overlayCfg = useMemo<OverlayConfig | null>(() => {
    if (series === "9HX")        return cfg9HX;
    if (series === "9HS")        return cfg9HS;
    if (series === "6HX")        return cfg6HX;
    if (series === "6HS")        return cfg6HS;
    if (series === "3HX")        return cfg3HX;
    if (series === "3HS")        return cfg3HS;
    if (series === "3HXO")       return cfg3HXO;
    if (series === "D3")         return cfgDTM;
    if (series === "MOTS Single") return cfgMOTS;
    if (series === "MOTS")       return cfgMOTS2;
    if (series === "T")          return cfgT;
    if (series === "3HXOL")      return cfg3HXOL;
    if (series === "DTL")        return cfgDTL;
    if (series === "HXFL")       return cfgHXFL;
    if (series === "HXL")        return cfgHXL;
    if (series === "HXOL")       return cfgHXOL;
    if (series === "HXRL")       return cfgHXRL;
    if (series === "HXSL")       return cfgHXSL;
    if (series === "LVT")        return cfgLVT;
    return null;
  }, [series]);

  const isHXOStyleSeries  = ["HXOL", "HXRL", "HXSL"].includes(series);
  const showOALOnDrawing   = series !== "DTL" && series !== "LVT" && !isHXOStyleSeries;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      ref={drawingRef}
      className="relative w-[1000px] h-[772.73px] flex items-center justify-center bg-white border-2 border-slate-400 rounded-lg"
    >
      {/* 1. HEADER BOX */}
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
        partNumber={partNumber}
        wireLen={wireLen}
      />

      {/* 2. BACKGROUND LOGOS AND TITLE BOX */}
      <div className="absolute w-[950px] flex items-center justify-center">
        <Titlebox className="absolute" />
        <img
          src={LOGO}
          alt="Logo"
          className="absolute w-[13rem] ml-[650px] mt-[460px]"
        />
      </div>

      {/* 3. MAIN DRAWING + OVERLAYS */}
      <div className="h-full w-full flex items-center justify-center">
        {!LayoutSVG ? (
          <div className="text-slate-600 text-sm">
            No drawing available for this configuration.
          </div>
        ) : (
        <div
          className="relative w-[950px] flex items-center justify-center"
          style={{ transform: "translateY(-40px) scale(0.9)" }} // Scales everything down to 90%
        >
            {/* The actual SVG drawing */}
            <LayoutSVG style={{ width: "95%", height: "100%", objectFit: "contain" }} />

            {overlayCfg && (
              <>
                {/* Cold + Hot zones */}
                <RawNumber value={coldLength} style={overlayCfg.coldZonePos} />
                <RawNumber value={hotLength}  style={overlayCfg.hotZonePos} />

                {/* Width (HXO and other width-enabled series) */}
                {"widthPos" in overlayCfg && overlayCfg.widthPos && (
                  <RawNumber value={width} style={overlayCfg.widthPos} />
                )}

                {/* Length (HXO style) */}
                {"lengthPos" in overlayCfg && overlayCfg.lengthPos && (
                  <RawNumber value={length} style={overlayCfg.lengthPos} />
                )}

                {/* OAL */}
                {showOALOnDrawing && overlayCfg.oalPos && (
                  <RawNumber value={OAL} style={overlayCfg.oalPos} />
                )}

                {/* Material leader arrow */}
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
                      className="text-black"
                      style={{
                        marginLeft: "-10px",
                        marginTop: overlayCfg.elemMatLeader.textOffsetY,
                        width: `${overlayCfg.elemMatLeader.textWidth}px`,
                        transform: "rotate(10deg)",
                        fontSize: "16px",
                        background: "white",
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

      {/* ── 4. ISO ISOMETRIC VIEW PANEL ─────────────────────────────────────
           Positioned absolutely on the drawing canvas.
           All dimension labels (IsoNumber) use the same left/bottom percentage
           system as the main drawing — just adjust the iso*Pos values in the
           cfg above to reposition them per series.
      ──────────────────────────────────────────────────────────────────────── */}
      {overlayCfg?.isoImg && (
        <div
          className="absolute"
          style={{
            ...(overlayCfg.isoContainerPos ?? { right: "18px", top: "18px" }),
            width:  overlayCfg.isoWidth  ?? 160,
            height: overlayCfg.isoHeight ?? 220,
            zIndex: 50,
          }}
        >
          {/* Border frame */}
          <div className="relative w-full h-full border border-black bg-white overflow-visible">

            {/* The isometric image */}
            <img
              src={overlayCfg.isoImg}
              alt={`${series} ISO view`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* ── ISO dimension overlays ── */}
            {/* Cold zone */}
            {overlayCfg.isoColdZonePos && (
              <IsoNumber value={coldLength} style={overlayCfg.isoColdZonePos} />
            )}

            {/* Hot zone */}
            {overlayCfg.isoHotZonePos && (
              <IsoNumber value={hotLength} style={overlayCfg.isoHotZonePos} />
            )}

            {/* OAL (only for series that show OAL) */}
            {showOALOnDrawing && overlayCfg.isoOalPos && (
              <IsoNumber value={OAL} style={overlayCfg.isoOalPos} />
            )}

            {/* Width (HXO / 3HXO style) */}
            {overlayCfg.isoWidthPos && (
              <IsoNumber value={width} style={overlayCfg.isoWidthPos} />
            )}

            {/* Length (HXO style) */}
            {overlayCfg.isoLengthPos && (
              <IsoNumber value={length} style={overlayCfg.isoLengthPos} />
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Drawings10;