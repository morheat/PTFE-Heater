import React from "react";

interface headerProps {
  serialNum: string;
  title: string;
  material: string;
  voltage: number;
  phase: number;              // 1 or 3
  wattage: number;
  elementNum: number;
  coldLength: number;
  terminalBox: string;
  OAL: number;
  series: string;        // "9HX"
  protector: string;     // "P1"...
  wireLen?: string;      // "X60" optional
}

const Header: React.FC<headerProps> = ({
  serialNum,
  title,
  material,
  voltage,
  phase,
  wattage,
  elementNum,
  coldLength,
  OAL,
  series,
  protector,
  wireLen,
  //terminalBox,
  //thermostat
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

  // Watt density (W/in^2): Wattage / {0.475 * pi * elements * (heated length) * 2}
  const heatedLength = OAL - coldLength;
  const wattDensity =
    wattsNum > 0 && elementNum > 0 && heatedLength > 0
      ? wattsNum / (0.475 * Math.PI * elementNum * heatedLength * 2)
      : null;

    // PART NUMBER FORMAT:
    // IM-HX.<first digit of watts><first digit of volts><first two digits of OAL>
      // 1. Map Voltage to the specific single-digit codes from the chart
      const VOLT_MAP: Record<number, string> = {
        120: "1", 240: "2", 380: "3", 480: "4", 415: "5", 
        600: "6", 400: "7", 208: "8", 220: "9", 200: "0"
      };

      // 2. Format Wattage (e.g., 4500 -> 4.5, 12000 -> 12)
      const wattCode = wattsNum >= 1000 ? (wattsNum / 1000).toString() : wattsNum.toString();

      // 3. Voltage Code
      const voltCode = VOLT_MAP[voltsNum] || "X"; // "X" as fallback

      // 4. OAL (Uses the actual number, usually 2 digits)
      const oalCode = Math.round(OAL).toString().padStart(2, "0");

      // 5. Phase (Blank for 3-Phase standard, "1" for Single Phase)
      const phaseCode = phase === 1 ? "-1" : "";

      // 6. Protector & Wire (Handles the P1/P2 and the optional X length)
      const protCode = protector ? `-${protector}` : "";
      const wireCode = wireLen ? `-${wireLen}` : "";

      // FINAL ASSEMBLY: IM-9HX + Wattage + VoltCode + OAL + Phase + Protector + Wire
      const partNumber = `IM-9HX${wattCode}.${voltCode}${oalCode}${phaseCode}${protCode}${wireCode}`;

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
        <div>
          Watt Density: {wattDensity === null ? "" : wattDensity.toFixed(1)}{" "}
          {" W/in\u00B2"}
        </div>
      </div>
    </div>
  );
};

export default Header;
