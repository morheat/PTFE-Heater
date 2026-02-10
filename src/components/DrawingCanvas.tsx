import { HeaterConfig } from '../App'
import './DrawingCanvas.css'

interface DrawingCanvasProps {
  config: HeaterConfig
}

const DrawingCanvas = ({ config }: DrawingCanvasProps) => {
  // Check if we have enough data to render
  const canRender = config.series && config.wattage && config.voltage && config.hotZone

  if (!canRender) {
    return (
      <div className="drawing-canvas">
        <div className="placeholder">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="#e2e8f0" />
            <text x="100" y="90" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="600">
              Select Configuration
            </text>
            <text x="100" y="110" textAnchor="middle" fill="#94a3b8" fontSize="12">
              to view drawing
            </text>
          </svg>
        </div>
      </div>
    )
  }

  // Drawing parameters
  const scale = 8 // pixels per inch
  const hotZone = parseFloat(config.hotZone) || 0
  const coldZone = parseFloat(config.coldZone) || 0
  const oal = parseFloat(config.oal) || (hotZone + coldZone)
  const width = parseFloat(config.width) || 6
  
  // Canvas dimensions
  const padding = 100
  const canvasWidth = Math.max(800, oal * scale + padding * 2)
  const canvasHeight = 600

  // Heater dimensions in pixels
  const heaterWidth = 40 // visual width of the heater element
  const hotZoneLength = hotZone * scale
  const coldZoneLength = coldZone * scale
  const totalLength = oal * scale

  // Starting positions
  const startX = padding
  const centerY = canvasHeight / 2

  // Render different heater types
  const renderHeater = () => {
    if (config.series.includes('HXO')) {
      // O-Shaped heater
      return renderOShapedHeater()
    } else if (config.series.includes('HXL')) {
      // L-Shaped heater
      return renderLShapedHeater()
    } else if (config.series.includes('HXF')) {
      // Low Profile heater
      return renderLowProfileHeater()
    } else {
      // Standard spiral heater
      return renderSpiralHeater()
    }
  }

  const renderSpiralHeater = () => {
    const spiralCoils = Math.floor(hotZone / 2) // 2 inches per coil
    const coilHeight = 30
    
    return (
      <g>
        {/* Cold Zone */}
        <rect
          x={startX}
          y={centerY - heaterWidth / 2}
          width={coldZoneLength}
          height={heaterWidth}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />
        
        {/* Hot Zone - Spiral */}
        <g transform={`translate(${startX + coldZoneLength}, ${centerY})`}>
          {/* Spiral coils */}
          {Array.from({ length: spiralCoils }).map((_, i) => {
            const x = (i / spiralCoils) * hotZoneLength
            return (
              <ellipse
                key={i}
                cx={x}
                cy={0}
                rx={coilHeight / 2}
                ry={heaterWidth / 1.5}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                opacity={0.8}
              />
            )
          })}
          
          {/* Hot zone base */}
          <rect
            x={0}
            y={-heaterWidth / 2}
            width={hotZoneLength}
            height={heaterWidth}
            fill="#fecaca"
            stroke="#dc2626"
            strokeWidth="2"
            opacity={0.3}
          />
        </g>

        {/* Terminal Box */}
        <rect
          x={startX - 60}
          y={centerY - 40}
          width={50}
          height={80}
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="2"
          rx="4"
        />
      </g>
    )
  }

  const renderOShapedHeater = () => {
    const widthPx = width * scale
    const heightPx = hotZone * scale
    
    return (
      <g>
        {/* O-Shape heating element */}
        <rect
          x={startX}
          y={centerY - heightPx / 2}
          width={widthPx}
          height={heightPx}
          fill="#fecaca"
          stroke="#dc2626"
          strokeWidth="3"
          rx="8"
          opacity={0.5}
        />
        
        {/* Inner cutout */}
        <rect
          x={startX + 20}
          y={centerY - heightPx / 2 + 20}
          width={widthPx - 40}
          height={heightPx - 40}
          fill="white"
          stroke="#94a3b8"
          strokeWidth="2"
          rx="4"
        />
        
        {/* Cold zone riser */}
        <rect
          x={startX + widthPx}
          y={centerY - heightPx / 2}
          width={coldZoneLength}
          height={heaterWidth}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />

        {/* Terminal Box */}
        <rect
          x={startX + widthPx + coldZoneLength}
          y={centerY - heightPx / 2 - 20}
          width={50}
          height={80}
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="2"
          rx="4"
        />
      </g>
    )
  }

  const renderLShapedHeater = () => {
    const verticalLength = parseFloat(config.verticalLength) || 18
    const verticalPx = verticalLength * scale
    
    return (
      <g>
        {/* Vertical riser (cold zone) */}
        <rect
          x={startX}
          y={centerY - verticalPx}
          width={heaterWidth}
          height={verticalPx}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />
        
        {/* Horizontal hot zone */}
        <g transform={`translate(${startX}, ${centerY})`}>
          {/* Hot zone with spiral */}
          <rect
            x={0}
            y={-heaterWidth / 2}
            width={hotZoneLength}
            height={heaterWidth}
            fill="#fecaca"
            stroke="#dc2626"
            strokeWidth="2"
          />
          
          {/* Spiral coils */}
          {Array.from({ length: Math.floor(hotZone / 2) }).map((_, i) => {
            const x = (i / Math.floor(hotZone / 2)) * hotZoneLength
            return (
              <circle
                key={i}
                cx={x}
                cy={0}
                r={15}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity={0.6}
              />
            )
          })}
        </g>

        {/* Terminal Box */}
        <rect
          x={startX - 60}
          y={centerY - verticalPx - 40}
          width={50}
          height={80}
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="2"
          rx="4"
        />
      </g>
    )
  }

  const renderLowProfileHeater = () => {
    const diameter = parseFloat(config.hotZone) || 6
    const diameterPx = diameter * scale
    
    return (
      <g>
        {/* Cold Zone */}
        <rect
          x={startX}
          y={centerY - heaterWidth / 2}
          width={coldZoneLength}
          height={heaterWidth}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />
        
        {/* Low profile heating element (flat spiral) */}
        <g transform={`translate(${startX + coldZoneLength}, ${centerY})`}>
          {/* Outer circle */}
          <circle
            cx={diameterPx / 2}
            cy={0}
            r={diameterPx / 2}
            fill="#fecaca"
            stroke="#dc2626"
            strokeWidth="3"
            opacity={0.5}
          />
          
          {/* Inner circles (spiral effect) */}
          {[0.7, 0.5, 0.3].map((ratio, i) => (
            <circle
              key={i}
              cx={diameterPx / 2}
              cy={0}
              r={(diameterPx / 2) * ratio}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              opacity={0.7}
            />
          ))}
        </g>

        {/* Terminal Box */}
        <rect
          x={startX - 60}
          y={centerY - 40}
          width={50}
          height={80}
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="2"
          rx="4"
        />
      </g>
    )
  }

  const renderDimensions = () => {
    const dimY = centerY + 80
    const dimArrowY = centerY + 60
    
    return (
      <g className="dimensions">
        {/* Hot Zone dimension */}
        {hotZone > 0 && (
          <g>
            <line
              x1={startX + coldZoneLength}
              y1={dimArrowY}
              x2={startX + coldZoneLength + hotZoneLength}
              y2={dimArrowY}
              stroke="#3b82f6"
              strokeWidth="2"
              markerStart="url(#arrowStart)"
              markerEnd="url(#arrowEnd)"
            />
            <text
              x={startX + coldZoneLength + hotZoneLength / 2}
              y={dimY}
              textAnchor="middle"
              fill="#1e40af"
              fontSize="14"
              fontWeight="600"
            >
              Hot Zone: {hotZone}"
            </text>
          </g>
        )}
        
        {/* Cold Zone dimension */}
        {coldZone > 0 && (
          <g>
            <line
              x1={startX}
              y1={dimArrowY - 30}
              x2={startX + coldZoneLength}
              y2={dimArrowY - 30}
              stroke="#64748b"
              strokeWidth="2"
              markerStart="url(#arrowStart)"
              markerEnd="url(#arrowEnd)"
            />
            <text
              x={startX + coldZoneLength / 2}
              y={dimY - 30}
              textAnchor="middle"
              fill="#475569"
              fontSize="14"
              fontWeight="600"
            >
              Cold Zone: {coldZone}"
            </text>
          </g>
        )}
        
        {/* Overall Length */}
        {oal > 0 && (
          <g>
            <line
              x1={startX}
              y1={dimArrowY + 50}
              x2={startX + totalLength}
              y2={dimArrowY + 50}
              stroke="#059669"
              strokeWidth="2"
              markerStart="url(#arrowStart)"
              markerEnd="url(#arrowEnd)"
            />
            <text
              x={startX + totalLength / 2}
              y={dimY + 50}
              textAnchor="middle"
              fill="#047857"
              fontSize="16"
              fontWeight="700"
            >
              OAL: {oal}"
            </text>
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="drawing-canvas">
      <div className="canvas-header">
        <h3>Technical Drawing</h3>
        <p>Scale: 1 inch = {scale} pixels</p>
      </div>
      
      <svg 
        width="100%" 
        height={canvasHeight} 
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        className="heater-svg"
      >
        {/* Define arrow markers */}
        <defs>
          <marker
            id="arrowStart"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
          <marker
            id="arrowEnd"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Grid */}
        <g className="grid" opacity="0.1">
          {Array.from({ length: Math.floor(canvasWidth / 50) }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={canvasHeight}
              stroke="#94a3b8"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: Math.floor(canvasHeight / 50) }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 50}
              x2={canvasWidth}
              y2={i * 50}
              stroke="#94a3b8"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Render the heater */}
        {renderHeater()}
        
        {/* Render dimensions */}
        {renderDimensions()}
      </svg>

      <div className="canvas-legend">
        <div className="legend-item">
          <div className="legend-color hot"></div>
          <span>Hot Zone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color cold"></div>
          <span>Cold Zone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color terminal"></div>
          <span>Terminal Box</span>
        </div>
      </div>
    </div>
  )
}

export default DrawingCanvas
