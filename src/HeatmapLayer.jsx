import { useMap } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet.heat'
import { useEffect } from 'react'

export default function HeatmapLayer({ points }) {
  const map = useMap()

  useEffect(() => {
    if (!points || points.length === 0) return

    const heatPoints = points.map(p => [
      p.lat,
      p.lng,
      p.value ?? 1,
    ])

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 15,
      blur: 25,
      maxZoom: 17,
      
    })

    heatLayer.addTo(map)

    return () => {
      map.removeLayer(heatLayer)
    }
  }, [map, points])

  return null
}