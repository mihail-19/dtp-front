import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import './App.css'
import points from './points'
import HeatmapLayer from './HeatmapLayer.jsx'
export default function App() {
  const [points, setPoints] = useState([])

  // Ссылка на опубликованную CSV таблицу Google Sheets
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTD2Gjthp6JuW8nLU7BH-3536MoibEaFgWR7ftecVB-sj14_KTc71TGTBwcDL7LTYwvgRUHQSpRj6xA/pub?gid=0&single=true&output=csv'

  useEffect(() => {
    async function loadPoints() {
      const res = await fetch(CSV_URL)
      const text = await res.text()

      const rows = text
        .split('\n')
        .slice(1) // убираем заголовок
        .map(row => {
          const [lat, lng, address] = row.split(',')
          return {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            value: Number(40),
            address,
          }
        })
        .filter(p => !isNaN(p.lat) && !isNaN(p.lng))

      setPoints(rows)
    }

    loadPoints()
  }, [])



  return (
    <div className='dtp-main'>
      <MapContainer
        center={[49.988528, 36.232757]}
        zoom={10}
        minZoom={5}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer points={points} />
        <MarkerClusterGroup>
          {points.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]}>
              <Popup>
                <b>{p.title}</b><br />
                Значение: {p.value}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* 
        {points.map(point => (
          <Marker key={point.id} position={[point.lat, point.lng]}>
            <Popup>
              <b>{point.address}</b>
              <br />
              Значение: {point.value}
            </Popup>
          </Marker>
        ))}
          */}
      </MapContainer>
    </div>
  )
}