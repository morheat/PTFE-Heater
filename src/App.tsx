import { useState, useEffect, useRef } from "react";
// import * as htmlToImage from "html-to-image";
// import Drawing from "./DrawingsNew";
import ConfigurationForm from './components/ConfigurationForm'
import DrawingCanvas from './components/DrawingCanvas'
import PartNumberDisplay from './components/PartNumberDisplay'

export interface HeaterConfig {
  series: string
  wattage: string
  voltage: string
  phase: string
  hotZone: string
  coldZone: string
  oal: string
  verticalLength: string
  width: string
  protector: string
  conduitLength: string
}

function App() {
  const [config, setConfig] = useState<HeaterConfig>({
    series: '',
    wattage: '',
    voltage: '',
    phase: '',
    hotZone: '',
    coldZone: '',
    oal: '',
    verticalLength: '',
    width: '',
    protector: 'P1',
    conduitLength: '36'
  })

  const [partNumber, setPartNumber] = useState('IM-[SELECT OPTIONS]')

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>PTFE Immersion Heater Configurator</h1>
          <p>Configure your custom PTFE heater with automatic part number generation</p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Panel - Configuration Form */}
        <aside className="config-panel">
          <ConfigurationForm 
            config={config} 
            setConfig={setConfig}
            setPartNumber={setPartNumber}
          />
        </aside>

        {/* Right Panel - Drawing Canvas */}
        <main className="drawing-panel">
          {/* Part Number Display */}
          <PartNumberDisplay partNumber={partNumber} config={config} />
          
          {/* Drawing Canvas */}
          <DrawingCanvas config={config} />
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 MPI MorHeat Inc. | PTFE Heater Configurator v1.0</p>
      </footer>
    </div>
  )
}

export default App