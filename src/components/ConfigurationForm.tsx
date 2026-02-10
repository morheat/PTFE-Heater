import { useEffect } from 'react'
import { HeaterConfig } from '../App'
import './ConfigurationForm.css'
import { productData, voltageMap, protectorOptions } from '../data/productData'

interface ConfigurationFormProps {
  config: HeaterConfig
  setConfig: React.Dispatch<React.SetStateAction<HeaterConfig>>
  setPartNumber: React.Dispatch<React.SetStateAction<string>>
}

const ConfigurationForm = ({ config, setConfig, setPartNumber }: ConfigurationFormProps) => {
  const seriesData = config.series ? productData[config.series] : null
  const availableWattages = seriesData ? seriesData.wattages : []
  const selectedWattageData = availableWattages.find(w => w.value === config.wattage)
  const availableVoltages = selectedWattageData ? selectedWattageData.options : []
  const selectedVoltageData = availableVoltages.find(v => v.voltage === config.voltage)

  // Calculate OAL when hot zone or cold zone changes
  useEffect(() => {
    if (seriesData && !seriesData.hasVerticalLength && config.hotZone && config.coldZone) {
      const calculatedOal = parseInt(config.hotZone) + parseInt(config.coldZone)
      setConfig(prev => ({ ...prev, oal: calculatedOal.toString() }))
    }
  }, [config.hotZone, config.coldZone, seriesData])

  // Set default values when voltage is selected
  useEffect(() => {
    if (selectedVoltageData) {
      setConfig(prev => ({
        ...prev,
        hotZone: selectedVoltageData.hot?.toString() || prev.hotZone,
        oal: selectedVoltageData.oal?.toString() || prev.oal,
        coldZone: selectedVoltageData.cold?.toString() || prev.coldZone,
        width: selectedVoltageData.width?.toString() || prev.width
      }))
    }
  }, [selectedVoltageData])

  // Generate part number
  useEffect(() => {
    if (!config.series || !config.wattage || !config.voltage) {
      setPartNumber('IM-[SELECT OPTIONS]')
      return
    }

    let pn = `IM-${config.series}${config.wattage}${config.voltage}`

    // Add width for HXO series
    if (seriesData?.hasWidth && config.width) {
      if (config.series === 'HXO' || config.series === '2HXO') {
        pn += `${config.width.padStart(2, '0')}`
      } else {
        pn += `${config.width}`
      }
    }

    // Add hot zone
    if ((config.series.includes('HXO') || config.series === 'HXF' || config.series === 'HXFL') && config.hotZone) {
      pn += `-${config.hotZone}`
    }

    // Add OAL or vertical length
    if (seriesData?.hasVerticalLength) {
      pn += config.verticalLength ? `-R${config.verticalLength}` : '-R[SPECIFY]'
    } else if (config.oal) {
      pn += config.oal
    }

    // Add phase
    if (seriesData?.singlePhaseAvailable && config.phase === '1') {
      pn += '-1'
    }

    // Add protector
    if (seriesData?.fixedProtector) {
      pn += `-${seriesData.fixedProtector}`
    } else if (config.protector) {
      pn += `-${config.protector}`
    }

    // Add conduit length
    if (config.conduitLength && config.conduitLength !== '36') {
      pn += `-X${config.conduitLength}`
    }

    setPartNumber(pn)
  }, [config, seriesData])

  const handleSeriesChange = (value: string) => {
    setConfig({
      series: value,
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
  }

  const handleWattageChange = (value: string) => {
    setConfig(prev => ({
      ...prev,
      wattage: value,
      voltage: '',
      hotZone: '',
      coldZone: '',
      oal: '',
      verticalLength: '',
      width: ''
    }))
  }

  const minHotZone = selectedVoltageData?.hot || 0
  const hotZoneError = config.hotZone && parseInt(config.hotZone) < minHotZone

  return (
    <div className="configuration-form">
      <h2 className="form-title">Configuration</h2>

      <div className="info-box">
        <h3>Quick Guide</h3>
        <p>Select your heater series, wattage, and voltage. Dimensions will be auto-calculated.</p>
      </div>

      {/* Series Selection */}
      <div className="form-group">
        <label>1. Product Series</label>
        <select value={config.series} onChange={(e) => handleSeriesChange(e.target.value)}>
          <option value="">Select Series...</option>
          <optgroup label="Spiral Heaters">
            <option value="HX">HX - Spiral PTFE Heaters</option>
            <option value="2HX">2HX - 2 Element Spiral</option>
          </optgroup>
          <optgroup label="Multi-Element">
            <option value="3HX">3HX - 3 Element PTFE</option>
            <option value="6HX">6HX - 6 Element PTFE</option>
            <option value="9HX">9HX - 9 Element PTFE</option>
          </optgroup>
          <optgroup label="Bottom/L-Shaped">
            <option value="HXL">HXL - Spiral Bottom (L-Shaped)</option>
            <option value="2HXL">2HXL - 2 Element Bottom</option>
          </optgroup>
          <optgroup label="Low Profile">
            <option value="HXF">HXF - Low Profile PTFE</option>
            <option value="HXFL">HXFL - Low Profile Bottom</option>
          </optgroup>
          <optgroup label="O-Shaped">
            <option value="HXO">HXO - O-Shaped PTFE</option>
            <option value="2HXO">2HXO - 2 Element O-Shaped</option>
            <option value="3HXO">3HXO - 3 Element O-Shaped</option>
            <option value="3HXOL">3HXOL - 3 Element Bottom</option>
          </optgroup>
          <optgroup label="Screwplug & Flanged">
            <option value="HXT">HXT - Screwplug PTFE</option>
            <option value="3FLX">3FLX - 3\" Flanged</option>
            <option value="6FLX">6FLX - 6\" Flanged</option>
          </optgroup>
        </select>
        {seriesData && (
          <div className="helper-text">
            {seriesData.elements} Element{seriesData.elements > 1 ? 's' : ''} • {seriesData.phase}
          </div>
        )}
      </div>

      {/* Wattage Selection */}
      <div className="form-group">
        <label>2. Wattage</label>
        <select value={config.wattage} onChange={(e) => handleWattageChange(e.target.value)} disabled={!config.series}>
          <option value="">Select Wattage...</option>
          {availableWattages.map(w => (
            <option key={w.value} value={w.value}>{w.label}</option>
          ))}
        </select>
      </div>

      {/* Voltage Selection */}
      <div className="form-group">
        <label>3. Voltage</label>
        <select value={config.voltage} onChange={(e) => setConfig(prev => ({ ...prev, voltage: e.target.value }))} disabled={!config.wattage}>
          <option value="">Select Voltage...</option>
          {availableVoltages.map(v => (
            <option key={v.voltage} value={v.voltage}>{voltageMap[v.voltage]}</option>
          ))}
        </select>
      </div>

      {/* Phase Selection */}
      {seriesData?.singlePhaseAvailable && (
        <div className="form-group">
          <label>4. Phase</label>
          <select value={config.phase} onChange={(e) => setConfig(prev => ({ ...prev, phase: e.target.value }))} disabled={!config.voltage}>
            <option value="">3-Phase (Standard)</option>
            <option value="1">Single Phase</option>
          </select>
        </div>
      )}

      {/* Width Input */}
      {seriesData?.hasWidth && (
        <div className="form-group">
          <label>Width (inches)</label>
          <input
            type="number"
            step="0.5"
            value={config.width}
            onChange={(e) => setConfig(prev => ({ ...prev, width: e.target.value }))}
            disabled={!config.voltage}
            placeholder="Enter width"
          />
          {selectedVoltageData?.width && (
            <div className="helper-text">Standard: {selectedVoltageData.width}"</div>
          )}
        </div>
      )}

      {/* Hot Zone */}
      <div className="form-group">
        <label>Hot Zone (inches) {selectedVoltageData?.hot && <span className="badge">AUTO</span>}</label>
        <input
          type="number"
          step="0.5"
          value={config.hotZone}
          onChange={(e) => setConfig(prev => ({ ...prev, hotZone: e.target.value }))}
          disabled={!config.voltage}
          placeholder="Enter hot zone"
        />
        {selectedVoltageData?.hot && (
          <div className="helper-text">Min: {selectedVoltageData.hot}" (can be longer)</div>
        )}
        {hotZoneError && (
          <div className="error-message">Cannot be shorter than {minHotZone}"</div>
        )}
      </div>

      {/* Cold Zone */}
      {!seriesData?.hasVerticalLength && (
        <div className="form-group">
          <label>Cold Zone (inches)</label>
          <input
            type="number"
            step="0.5"
            value={config.coldZone}
            onChange={(e) => setConfig(prev => ({ ...prev, coldZone: e.target.value }))}
            disabled={!config.voltage}
            placeholder="Enter cold zone"
          />
          {selectedVoltageData?.cold && (
            <div className="helper-text">Standard: {selectedVoltageData.cold}"</div>
          )}
        </div>
      )}

      {/* Overall Length / Vertical Length */}
      <div className="form-group">
        <label>
          {seriesData?.hasVerticalLength ? 'Vertical Length (inches)' : 'Overall Length (inches)'}
          {!seriesData?.hasVerticalLength && config.hotZone && config.coldZone && <span className="badge">CALC</span>}
        </label>
        {seriesData?.hasVerticalLength ? (
          <input
            type="number"
            value={config.verticalLength}
            onChange={(e) => setConfig(prev => ({ ...prev, verticalLength: e.target.value }))}
            disabled={!config.voltage}
            placeholder="Specify vertical length"
          />
        ) : (
          <input
            type="number"
            step="0.5"
            value={config.oal}
            onChange={(e) => setConfig(prev => ({ ...prev, oal: e.target.value }))}
            disabled={!config.voltage || (!!config.hotZone && !!config.coldZone)}
            placeholder="Hot Zone + Cold Zone"
          />
        )}
      </div>

      {/* Thermal Protector */}
      <div className="form-group">
        <label>Thermal Protector</label>
        {seriesData?.fixedProtector ? (
          <input type="text" value={`${seriesData.fixedProtector} - Up to 250°F (Fixed)`} disabled />
        ) : (
          <select value={config.protector} onChange={(e) => setConfig(prev => ({ ...prev, protector: e.target.value }))} disabled={!config.series}>
            {protectorOptions.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Conduit Length */}
      <div className="form-group">
        <label>Conduit & Wire Length (inches)</label>
        <input
          type="number"
          value={config.conduitLength}
          onChange={(e) => setConfig(prev => ({ ...prev, conduitLength: e.target.value }))}
          placeholder="36"
        />
        <div className="helper-text">36" Teflon Conduit is standard</div>
      </div>
    </div>
  )
}

export default ConfigurationForm
