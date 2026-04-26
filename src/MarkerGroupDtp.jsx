import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";


export default function MarkerGroupDtp({filterPoints}) {




    return <MarkerClusterGroup>
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
}