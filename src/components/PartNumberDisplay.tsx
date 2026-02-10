import { HeaterConfig } from '../App'
import './PartNumberDisplay.css'
import { productData, voltageMap } from '../data/productData'

interface PartNumberDisplayProps {
  partNumber: string
  config: HeaterConfig
}

const PartNumberDisplay = ({ partNumber, config }: PartNumberDisplayProps) => {
  const seriesData = config.series ? productData[config.series] : null
  const selectedWattage = seriesData?.wattages.find(w => w.value === config.wattage)

  return (
    <div className="part-number-display">
      <div className="part-number-card">
        <h2>Generated Part Number</h2>
        <div className="part-number">{partNumber}</div>
        <button 
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(partNumber)
            alert('Part number copied to clipboard!')
          }}
        >
          📋 Copy Part Number
        </button>
      </div>

      {config.series && (
        <div className="specifications">
          <h3>Specifications Summary</h3>
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Series</span>
              <span className="spec-value">{config.series}</span>
            </div>
            
            {seriesData && (
              <div className="spec-item">
                <span className="spec-label">Type</span>
                <span className="spec-value">{seriesData.name}</span>
              </div>
            )}
            
            {selectedWattage && (
              <div className="spec-item">
                <span className="spec-label">Wattage</span>
                <span className="spec-value">{selectedWattage.label}</span>
              </div>
            )}
            
            {config.voltage && (
              <div className="spec-item">
                <span className="spec-label">Voltage</span>
                <span className="spec-value">{voltageMap[config.voltage]}</span>
              </div>
            )}
            
            {seriesData && (
              <div className="spec-item">
                <span className="spec-label">Phase</span>
                <span className="spec-value">
                  {seriesData.phase === 'Single' ? 'Single Phase' :
                   config.phase === '1' ? 'Single Phase' : '3-Phase'}
                </span>
              </div>
            )}
            
            {seriesData?.elements && (
              <div className="spec-item">
                <span className="spec-label">Elements</span>
                <span className="spec-value">{seriesData.elements}</span>
              </div>
            )}
            
            {config.width && (
              <div className="spec-item">
                <span className="spec-label">Width</span>
                <span className="spec-value">{config.width}"</span>
              </div>
            )}
            
            {config.hotZone && (
              <div className="spec-item">
                <span className="spec-label">Hot Zone</span>
                <span className="spec-value">{config.hotZone}"</span>
              </div>
            )}
            
            {config.coldZone && (
              <div className="spec-item">
                <span className="spec-label">Cold Zone</span>
                <span className="spec-value">{config.coldZone}"</span>
              </div>
            )}
            
            {config.oal && (
              <div className="spec-item">
                <span className="spec-label">Overall Length</span>
                <span className="spec-value">{config.oal}"</span>
              </div>
            )}
            
            {config.verticalLength && (
              <div className="spec-item">
                <span className="spec-label">Vertical Length</span>
                <span className="spec-value">{config.verticalLength}"</span>
              </div>
            )}
            
            {config.protector && (
              <div className="spec-item">
                <span className="spec-label">Thermal Protector</span>
                <span className="spec-value">{config.protector}</span>
              </div>
            )}
            
            {config.conduitLength && (
              <div className="spec-item">
                <span className="spec-label">Conduit Length</span>
                <span className="spec-value">{config.conduitLength}"</span>
              </div>
            )}
          </div>

          {seriesData && (
            <div className="features-box">
              <h4>Product Features</h4>
              <ul>
                <li>PTFE sleeved 304 stainless steel elements</li>
                <li>Low watt density: 10 W/in² (1.5 W/cm²)</li>
                <li>Temperature range: Up to 212°F (100°C)</li>
                <li>Inert to most aqueous solutions</li>
                <li>Vapor resistant terminal enclosure</li>
                <li>Grounded construction with thermal protector</li>
                {seriesData.flangeSize && <li>Flange size: {seriesData.flangeSize}</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PartNumberDisplay
