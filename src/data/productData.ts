// Product data for PTFE heaters based on catalog specifications

export interface VoltageOption {
  voltage: string
  hot?: number
  oal?: number
  cold?: number
  maxCold?: number
  width?: number
  diameter?: number
}

export interface WattageOption {
  value: string
  label: string
  options: VoltageOption[]
}

export interface ProductSeries {
  name: string
  elements: number
  phase: string
  singlePhaseAvailable?: boolean
  hasVerticalLength?: boolean
  hasWidth?: boolean
  fixedProtector?: string
  flangeSize?: string
  wattages: WattageOption[]
}

export const productData: Record<string, ProductSeries> = {
  HX: {
    name: "Spiral PTFE Heaters",
    elements: 1,
    phase: "Single",
    wattages: [
      { value: ".5", label: "500W", options: [{ voltage: "1", hot: 5, oal: 11, cold: 6 }, { voltage: "2", hot: 5, oal: 11, cold: 6 }] },
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 7, oal: 11, cold: 4 }, { voltage: "2", hot: 7, oal: 11, cold: 4 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 12, oal: 17, cold: 5 }, { voltage: "2", hot: 12, oal: 17, cold: 5 }, { voltage: "4", hot: 12, oal: 17, cold: 5 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 16, oal: 23, cold: 7 }, { voltage: "4", hot: 16, oal: 23, cold: 7 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 20, oal: 29, cold: 9 }, { voltage: "4", hot: 20, oal: 29, cold: 9 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 25, oal: 35, cold: 10 }, { voltage: "4", hot: 25, oal: 35, cold: 10 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 29, oal: 40, cold: 11 }, { voltage: "4", hot: 29, oal: 40, cold: 11 }] }
    ]
  },
  "2HX": {
    name: "2 Element Spiral PTFE Heaters",
    elements: 2,
    phase: "Single",
    wattages: [
      { value: "8", label: "8000W", options: [{ voltage: "2", hot: 37, oal: 47, cold: 10 }, { voltage: "4", hot: 37, oal: 47, cold: 10 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 44, oal: 54, cold: 10 }, { voltage: "4", hot: 44, oal: 54, cold: 10 }] }
    ]
  },
  "3HX": {
    name: "3 Element PTFE Heaters",
    elements: 3,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    wattages: [
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 10, oal: 17 }, { voltage: "2", hot: 10, oal: 17 }] },
      { value: "1.5", label: "1500W", options: [{ voltage: "1", hot: 16, oal: 23 }, { voltage: "2", hot: 16, oal: 23 }, { voltage: "4", hot: 16, oal: 23 }] },
      { value: "2", label: "2000W", options: [{ voltage: "2", hot: 22, oal: 29 }, { voltage: "4", hot: 22, oal: 29 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 29, oal: 35 }, { voltage: "4", hot: 29, oal: 35 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 39, oal: 47 }, { voltage: "4", hot: 39, oal: 47 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 48, oal: 59 }, { voltage: "4", hot: 48, oal: 59 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 56, oal: 68 }, { voltage: "4", hot: 56, oal: 68 }] }
    ]
  },
  "6HX": {
    name: "6 Element PTFE Heaters",
    elements: 6,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    wattages: [
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 9, oal: 17 }, { voltage: "2", hot: 9, oal: 17 }, { voltage: "4", hot: 9, oal: 17 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 15, oal: 23 }, { voltage: "4", hot: 15, oal: 23 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 21, oal: 29 }, { voltage: "4", hot: 21, oal: 29 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 28, oal: 35 }, { voltage: "4", hot: 28, oal: 35 }] },
      { value: "8", label: "8000W", options: [{ voltage: "2", hot: 38, oal: 47 }, { voltage: "4", hot: 38, oal: 47 }] },
      { value: "10", label: "10000W", options: [{ voltage: "2", hot: 47, oal: 59 }, { voltage: "4", hot: 47, oal: 59 }] },
      { value: "12", label: "12000W", options: [{ voltage: "2", hot: 55, oal: 68 }, { voltage: "4", hot: 55, oal: 68 }] }
    ]
  },
  "9HX": {
    name: "9 Element PTFE Heaters",
    elements: 9,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    wattages: [
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 9, oal: 17 }, { voltage: "4", hot: 9, oal: 17 }] },
      { value: "4.5", label: "4500W", options: [{ voltage: "2", hot: 15, oal: 23 }, { voltage: "4", hot: 15, oal: 23 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 21, oal: 29 }, { voltage: "4", hot: 21, oal: 29 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 28, oal: 35 }, { voltage: "4", hot: 28, oal: 35 }] },
      { value: "12", label: "12000W", options: [{ voltage: "2", hot: 38, oal: 47 }, { voltage: "4", hot: 38, oal: 47 }] },
      { value: "15", label: "15000W", options: [{ voltage: "2", hot: 47, oal: 59 }, { voltage: "4", hot: 47, oal: 59 }] },
      { value: "18", label: "18000W", options: [{ voltage: "2", hot: 55, oal: 68 }, { voltage: "4", hot: 55, oal: 68 }] }
    ]
  },
  HXL: {
    name: "Spiral PTFE Bottom Heaters (L-Shaped)",
    elements: 1,
    phase: "Single",
    hasVerticalLength: true,
    wattages: [
      { value: ".5", label: "500W", options: [{ voltage: "1", hot: 6, oal: 12, maxCold: 41 }, { voltage: "2", hot: 6, oal: 12, maxCold: 41 }] },
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 8, oal: 12, maxCold: 41 }, { voltage: "2", hot: 8, oal: 12, maxCold: 41 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 12, oal: 18, maxCold: 40 }, { voltage: "2", hot: 12, oal: 18, maxCold: 40 }, { voltage: "4", hot: 12, oal: 18, maxCold: 40 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 17, oal: 18, maxCold: 40 }, { voltage: "4", hot: 17, oal: 18, maxCold: 40 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 20, oal: 18, maxCold: 40 }, { voltage: "4", hot: 20, oal: 18, maxCold: 40 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 24, oal: 18, maxCold: 36 }, { voltage: "4", hot: 24, oal: 18, maxCold: 36 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 29, oal: 18, maxCold: 30 }, { voltage: "4", hot: 29, oal: 18, maxCold: 30 }] }
    ]
  },
  "2HXL": {
    name: "2 Element Spiral PTFE Bottom Heaters (L-Shaped)",
    elements: 2,
    phase: "Single",
    hasVerticalLength: true,
    wattages: [
      { value: "8", label: "8000W", options: [{ voltage: "2", hot: 37, oal: 18, maxCold: 32 }, { voltage: "4", hot: 37, oal: 18, maxCold: 32 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 44, oal: 18, maxCold: 35 }, { voltage: "4", hot: 44, oal: 18, maxCold: 35 }] }
    ]
  },
  HXF: {
    name: "Low Profile PTFE Heaters",
    elements: 1,
    phase: "Single",
    wattages: [
      { value: ".5", label: "500W", options: [{ voltage: "1", hot: 6, oal: 14, diameter: 5, maxCold: 36 }, { voltage: "2", hot: 6, oal: 14, diameter: 5, maxCold: 36 }] },
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 7, oal: 14, diameter: 6, maxCold: 36 }, { voltage: "2", hot: 7, oal: 14, diameter: 6, maxCold: 36 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 9, oal: 17, diameter: 8, maxCold: 35 }, { voltage: "2", hot: 9, oal: 17, diameter: 8, maxCold: 35 }, { voltage: "4", hot: 9, oal: 17, diameter: 8, maxCold: 35 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 10, oal: 23, diameter: 9, maxCold: 35 }, { voltage: "4", hot: 10, oal: 23, diameter: 9, maxCold: 35 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 12, oal: 29, diameter: 11, maxCold: 35 }, { voltage: "4", hot: 12, oal: 29, diameter: 11, maxCold: 35 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 13, oal: 35, diameter: 12, maxCold: 31 }, { voltage: "4", hot: 13, oal: 35, diameter: 12, maxCold: 31 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 14, oal: 40, diameter: 13, maxCold: 25 }, { voltage: "4", hot: 14, oal: 40, diameter: 13, maxCold: 25 }] }
    ]
  },
  HXFL: {
    name: "Low Profile Bottom PTFE Heaters",
    elements: 1,
    phase: "Single",
    hasVerticalLength: true,
    wattages: [
      { value: ".5", label: "500W", options: [{ voltage: "1", hot: 5, oal: 12, diameter: 5, maxCold: 36 }, { voltage: "2", hot: 5, oal: 12, diameter: 5, maxCold: 36 }] },
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 6, oal: 12, diameter: 6, maxCold: 36 }, { voltage: "2", hot: 6, oal: 12, diameter: 6, maxCold: 36 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 8, oal: 18, diameter: 8, maxCold: 35 }, { voltage: "2", hot: 8, oal: 18, diameter: 8, maxCold: 35 }, { voltage: "4", hot: 8, oal: 18, diameter: 8, maxCold: 35 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 9, oal: 18, diameter: 9, maxCold: 35 }, { voltage: "4", hot: 9, oal: 18, diameter: 9, maxCold: 35 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 11, oal: 18, diameter: 11, maxCold: 35 }, { voltage: "4", hot: 11, oal: 18, diameter: 11, maxCold: 35 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 12, oal: 18, diameter: 12, maxCold: 31 }, { voltage: "4", hot: 12, oal: 18, diameter: 12, maxCold: 31 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 13, oal: 18, diameter: 13, maxCold: 25 }, { voltage: "4", hot: 13, oal: 18, diameter: 13, maxCold: 25 }] }
    ]
  },
  HXO: {
    name: "O-Shaped PTFE Heaters",
    elements: 1,
    phase: "Single",
    hasWidth: true,
    wattages: [
      { value: ".5", label: "500W", options: [{ voltage: "1", hot: 6, oal: 11, width: 5, cold: 5 }, { voltage: "2", hot: 6, oal: 11, width: 5, cold: 5 }] },
      { value: "1", label: "1000W", options: [{ voltage: "1", hot: 7, oal: 11, width: 6, cold: 5 }, { voltage: "2", hot: 7, oal: 11, width: 6, cold: 5 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", hot: 10, oal: 17, width: 6, cold: 7 }, { voltage: "2", hot: 10, oal: 17, width: 6, cold: 7 }, { voltage: "4", hot: 10, oal: 17, width: 6, cold: 7 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 12, oal: 23, width: 6, cold: 11 }, { voltage: "4", hot: 12, oal: 23, width: 6, cold: 11 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", hot: 19, oal: 29, width: 6, cold: 10 }, { voltage: "4", hot: 19, oal: 29, width: 6, cold: 10 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", hot: 20, oal: 35, width: 6, cold: 15 }, { voltage: "4", hot: 20, oal: 35, width: 6, cold: 15 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 22, oal: 40, width: 8, cold: 18 }, { voltage: "4", hot: 22, oal: 40, width: 8, cold: 18 }] }
    ]
  },
  "2HXO": {
    name: "2 Element O-Shaped PTFE Heaters",
    elements: 2,
    phase: "Single",
    hasWidth: true,
    wattages: [
      { value: "8", label: "8000W", options: [{ voltage: "2", hot: 36, oal: 47, width: 8, cold: 11 }, { voltage: "4", hot: 36, oal: 47, width: 8, cold: 11 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 40, oal: 54, width: 8, cold: 14 }, { voltage: "4", hot: 40, oal: 54, width: 8, cold: 14 }] }
    ]
  },
  "3HXO": {
    name: "3 Element O-Shaped PTFE Heaters",
    elements: 3,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    hasWidth: true,
    wattages: [
      { value: "1.5", label: "1500W", options: [{ voltage: "1", hot: 6, oal: 11, width: 10.5, maxCold: 36 }, { voltage: "2", hot: 6, oal: 11, width: 10.5, maxCold: 36 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 6, oal: 11, width: 11, maxCold: 36 }, { voltage: "4", hot: 6, oal: 11, width: 11, maxCold: 36 }] },
      { value: "4.5", label: "4500W", options: [{ voltage: "2", hot: 9.5, oal: 17, width: 11, maxCold: 35 }, { voltage: "4", hot: 9.5, oal: 17, width: 11, maxCold: 35 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 10.5, oal: 17, width: 13, maxCold: 35 }, { voltage: "4", hot: 10.5, oal: 17, width: 13, maxCold: 35 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 16, oal: 23, width: 13, maxCold: 35 }, { voltage: "4", hot: 16, oal: 23, width: 13, maxCold: 35 }] },
      { value: "12", label: "12000W", options: [{ voltage: "2", hot: 20.5, oal: 29, width: 13, maxCold: 35 }, { voltage: "4", hot: 20.5, oal: 29, width: 13, maxCold: 35 }] },
      { value: "15", label: "15000W", options: [{ voltage: "2", hot: 25, oal: 35, width: 13, maxCold: 31 }, { voltage: "4", hot: 25, oal: 35, width: 13, maxCold: 31 }] },
      { value: "18", label: "18000W", options: [{ voltage: "2", hot: 29, oal: 40, width: 13, maxCold: 25 }, { voltage: "4", hot: 29, oal: 40, width: 13, maxCold: 25 }] }
    ]
  },
  "3HXOL": {
    name: "3 Element Bottom PTFE Heaters",
    elements: 3,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    hasWidth: true,
    hasVerticalLength: true,
    wattages: [
      { value: "3", label: "3000W", options: [{ voltage: "2", hot: 13, oal: 18, width: 8 }, { voltage: "4", hot: 13, oal: 18, width: 8 }] },
      { value: "4.5", label: "4500W", options: [{ voltage: "2", hot: 11, oal: 18, width: 10.5 }, { voltage: "4", hot: 11, oal: 18, width: 10.5 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", hot: 19, oal: 18, width: 10.5 }, { voltage: "4", hot: 19, oal: 18, width: 10.5 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", hot: 23, oal: 18, width: 10.5 }, { voltage: "4", hot: 23, oal: 18, width: 10.5 }] },
      { value: "12", label: "12000W", options: [{ voltage: "2", hot: 30, oal: 18, width: 10.5 }, { voltage: "4", hot: 30, oal: 18, width: 10.5 }] },
      { value: "15", label: "15000W", options: [{ voltage: "2", hot: 36, oal: 18, width: 10.5 }, { voltage: "4", hot: 36, oal: 18, width: 10.5 }] },
      { value: "18", label: "18000W", options: [{ voltage: "2", hot: 42, oal: 18, width: 10.5 }, { voltage: "4", hot: 42, oal: 18, width: 10.5 }] }
    ]
  },
  HXT: {
    name: "Spiral Screwplug PTFE Heaters",
    elements: 1,
    phase: "Single",
    fixedProtector: "P3",
    wattages: [
      { value: "1", label: "1000W", options: [{ voltage: "1", oal: 9 }, { voltage: "2", oal: 9 }] },
      { value: "2", label: "2000W", options: [{ voltage: "1", oal: 14 }, { voltage: "2", oal: 14 }, { voltage: "4", oal: 14 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", oal: 19 }, { voltage: "4", oal: 19 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", oal: 26 }, { voltage: "4", oal: 26 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", oal: 30 }, { voltage: "4", oal: 30 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", oal: 34 }, { voltage: "4", oal: 34 }] }
    ]
  },
  "3FLX": {
    name: '3" Flanged PTFE Heaters',
    elements: 1,
    phase: "Single",
    flangeSize: '3"',
    wattages: [
      { value: "1", label: "1000W", options: [{ voltage: "1", oal: 11 }, { voltage: "2", oal: 11 }] },
      { value: "2", label: "2000W", options: [{ voltage: "2", oal: 16 }, { voltage: "4", oal: 16 }] },
      { value: "3", label: "3000W", options: [{ voltage: "2", oal: 21 }, { voltage: "4", oal: 21 }] },
      { value: "4", label: "4000W", options: [{ voltage: "2", oal: 28 }, { voltage: "4", oal: 28 }] },
      { value: "5", label: "5000W", options: [{ voltage: "2", oal: 32 }, { voltage: "4", oal: 32 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", oal: 35 }, { voltage: "4", oal: 35 }] }
    ]
  },
  "6FLX": {
    name: '6" Flanged PTFE Heaters',
    elements: 3,
    phase: "3-Phase",
    singlePhaseAvailable: true,
    flangeSize: '6"',
    wattages: [
      { value: "3", label: "3000W", options: [{ voltage: "2", oal: 11 }, { voltage: "4", oal: 11 }] },
      { value: "6", label: "6000W", options: [{ voltage: "2", oal: 16 }, { voltage: "4", oal: 16 }] },
      { value: "9", label: "9000W", options: [{ voltage: "2", oal: 21 }, { voltage: "4", oal: 21 }] },
      { value: "12", label: "12000W", options: [{ voltage: "2", oal: 28 }, { voltage: "4", oal: 28 }] },
      { value: "15", label: "15000W", options: [{ voltage: "2", oal: 32 }, { voltage: "4", oal: 32 }] },
      { value: "18", label: "18000W", options: [{ voltage: "2", oal: 35 }, { voltage: "4", oal: 35 }] }
    ]
  }
}

export const voltageMap: Record<string, string> = {
  "1": "120V",
  "2": "240V",
  "3": "380V",
  "4": "480V",
  "5": "415V",
  "6": "600V",
  "7": "400V",
  "8": "208V",
  "9": "220V",
  "0": "200V"
}

export const protectorOptions = [
  { value: "P1", label: "P1 - Replaceable - Up to 190°F (88°C)" },
  { value: "P2", label: "P2 - Resettable - Up to 190°F (88°C)" },
  { value: "P4", label: "P4 - Replaceable - 190°F to 220°F" },
  { value: "P8", label: "P8 - Resettable - 190°F to 210°F" },
  { value: "P3", label: "P3 - Resettable - 210°F to 250°F" }
]
