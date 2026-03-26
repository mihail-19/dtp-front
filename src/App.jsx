import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useMemo, useState } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import Papa from 'papaparse'
import './App.css'
import points from './points'
import HeatmapLayer from './HeatmapLayer.jsx'
import { loadPoints } from './funcs/loadPoints.js'
export default function App() {
  const [points, setPoints] = useState([])
  const [chooseNoDamage, setChooseNoDamage] = useState(true)
  const [chooseFatal, setChooseFatal] = useState(true)
  const [chooseTraumatised, setChooseTraumatised] = useState(true)
  const [dtpTypes, setDtpTypes] = useState([])
  const [year, setYear] = useState(2016)
  const [dtpType, setDtpType] = useState('all')
  const [month, setMonth] = useState('all')
  
  
  async function load() {
    console.log('load')
      const pts = await loadPoints(year)
      setPoints(pts)
      console.log(pts)
      const types = [...new Set(pts.map(p => p.type))];
      setDtpTypes(types);
    }

  useEffect(() => {

    load();
    
  }, [])

  useEffect(() => {

    load();
    
  }, [year])

  const filterPoints = useMemo(() => {
    const noDamage = points.filter ((p) => p.hasNoDamage > 0)
    const fatal = points.filter((p) => p.died > 0)
    const trauma = points.filter((p) => p.traumatized > 0)
    const res = []
    const filtered = [...res, ...(chooseNoDamage ? noDamage : []), ...(chooseFatal ? fatal : []), ...(chooseTraumatised ? trauma : [])]
    const filteredByType = dtpType === 'all' ? filtered : filtered.filter(p => p.type === dtpType) 
    const filteredByMonth = month === 'all' ? filteredByType : filteredByType.filter(item => {
      const [d, m, y] = item.date.split('.').map(Number);
      return m === Number(month) + 1;
    });
    console.log(filteredByMonth)
    return filteredByMonth
    
  }, [chooseNoDamage, chooseFatal, chooseTraumatised, points, dtpType, month])


  const handleNoDamage = (e) => {
    setChooseNoDamage(e.target.checked);
  };
  const handleFatal = (e) => {
    setChooseFatal(e.target.checked);
  };
  const handleTraumatized = (e) => {
    setChooseTraumatised(e.target.checked);
  };
  const handleChooseYear = (e) =>{
    setYear(e.target.value)
  }
  const handleDtpType = (e) => {
    setDtpType(e.target.value)
  }
  const handleMonth = (e) => {
    setMonth(e.target.value)
  }
  return (
    <div className='dtp-main'>
      <h1>Мапа дорожньо-транспортних пригод м. Харкова</h1>

      <div className='dtp-filters'>
          <div className='dtp-fliters__checkboxes'>
            <div className='dtp__filter-element'>
              <label>
                <input
                  type="checkbox"
                  checked={chooseNoDamage}
                  onChange={handleNoDamage}
                />
                Без постраждалих
              </label>
            </div>
            <div className='dtp__filter-element'>
              <label>
                <input
                  type="checkbox"
                  checked={chooseFatal}
                  onChange={handleFatal}
                />
                Із загиблими 
              </label>
            </div>
            <div className='dtp__filter-element'>
              <label>
                <input
                  type="checkbox"
                  checked={chooseTraumatised}
                  onChange={handleTraumatized}
                />
                Із трамвованими
              </label>
            </div>
          </div>
          <div className='dtp-filter__selects'>
            <label>Тип ДТП</label>
            <select onChange={handleDtpType}>
              <option value="all">Всі</option>
              {dtpTypes.map(type => {
                return <option value={type}>{type}</option>
              })}
            </select>
            

          </div>
          <div className='dtp-filter__selects' >
            <label>Рік</label>
            <select onChange={handleChooseYear}>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            

          </div>

             <div className='dtp-filter__selects' >
            <label>Місяць</label>
            <select onChange={handleMonth}>
              <option value="all">всі</option>
              <option value="0">січень</option>
              <option value="1">лютий</option>
              <option value="2">березень</option>
              <option value="3">квітень</option>
              <option value="4">травень</option>
              <option value="5">червень</option>
              <option value="6">липень</option>
              <option value="7">серпень</option>
              <option value="8">вересень</option>
              <option value="9">жовтень</option>
              <option value="10">листопад</option>
              <option value="11">грудень</option>
            </select>
            

          </div>
        </div>


      <div className='dtp-container'>
        
        <div className='dtp-map'>
          <MapContainer
            center={[49.988528, 36.232757]}
            zoom={11}
            minZoom={11}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer points={filterPoints} />
            <MarkerClusterGroup>
              {filterPoints.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lng]}>
                  <Popup>
                    <b>{p.address}</b><br />
                    <p>{p.date} {p.time}, {p.day}</p>
                    <p>тип: {p.type}</p>
                    <p>{p.circumstance}</p>
                    <p>загиблих: {p.died}, травмованих: {p.traumatized}</p>
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

        <div className='dtp-stats'>
          <h3>ДТП за {year} рік</h3>
          <p>Всього: {filterPoints.length}</p>
          <p>- без постраждалих: {filterPoints.filter((p) => p.hasNoDamage > 0).length}</p>
          <p>- із травмованими: {filterPoints.filter((p) => p.traumatized > 0).length}</p>
          <p>- із загиблими: {filterPoints.filter((p) => p.died > 0).length}</p>
        </div>

      </div>
    </div>
  )
}