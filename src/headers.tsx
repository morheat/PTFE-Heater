import React from "react";

interface headerProps {
  serialNum: string;
  title: string;
  material: string;
  voltage: number;
  phase: number;
  wattage: number;
  elementNum: number;
  coldLength: number;
  OAL: number;
  series: string;
  protector: string;
  wireLen?: string;
  partNumber: string;
}

const Header: React.FC<headerProps> = ({
  serialNum,
  title,
  material,
  voltage,
  phase,
  wattage,
  OAL,
  protector,
  wireLen,
  series,
  partNumber
}) => {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(today);

  const wattsNum = Number(String(wattage).replace(/[^\d.]/g, ""));
  const voltsNum = Number(String(voltage).replace(/[^\d.]/g, ""));

  // Amps: single vs 3PH
  const amps =
    wattsNum > 0 && voltsNum > 0
      ? phase === 3
        ? wattsNum / voltsNum / 1.73
        : wattsNum / voltsNum
      : null;

  // Wattage formatting: 5000 W vs 10 kW
  const wattageDisplay =
    wattsNum > 0
      ? wattsNum >= 10000
        ? `${(wattsNum / 1000).toFixed(wattsNum % 1000 === 0 ? 0 : 1)} kW`
        : `${wattsNum.toFixed(0)} W`
      : "";

  return (
    <div className="absolute text-black font-bold">
      {/* these positions are from your working layout; tweak if needed */}
      <div className="absolute w-[9.5rem] mt-[210px] ml-[112px] flex justify-center items-center translate-x-[-50%] text-center">
        {serialNum}
      </div>

      <div className="absolute h-16 w-[18rem] mt-[270px] ml-[331.5px] flex justify-center translate-x-[-50%] text-center text-xl">
        {title}
      </div>

      <div className="absolute h-16 w-[18rem] mt-[295px] ml-[112px] flex justify-center translate-x-[-50%] text-center text-xl">
        {material}
      </div>

      <div className="absolute h-16 w-[18rem] mt-[265px] ml-[112px] flex justify-center translate-x-[-50%] text-center">
        {formattedDate}
      </div>

      {/* Bottom-left electrical specs */}
      <div className="absolute w-[18rem] mt-[200px] ml-[-420px]">
        <div>Part No: {partNumber}</div>
        <div>Voltage: {voltage}{" V"}</div>
        <div>Phase: {phase}{" PH"}</div>
        <div>Amps: {amps === null ? "" : amps.toFixed(1)}{" A"}</div>
        <div>Wattage: {wattageDisplay}</div>
        <div>Wire Length: {wireLen || "36"}</div>
      </div>
    </div>
  );
};

export default Header;