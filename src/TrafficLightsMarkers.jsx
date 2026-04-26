import L from "leaflet"
import { Marker, Popup } from "react-leaflet";

export default function TrafficLightsMarkers({points}){
    console.log(points)
    const customIcon = L.icon({
        iconUrl: "trafficLight.png", // путь к картинке
        iconSize: [24, 24],           // размер
        iconAnchor: [16, 32],         // точка "на карте"
        popupAnchor: [0, -32],        // где открывается popup
    });
    return points.map((p, i) => (
                    <Marker key={i} position={[p.lat, p.lng]} icon={customIcon}>
                      <Popup>
                        
                        <p>Світлофор</p>
                      </Popup>
                    </Marker>
                  ));
}