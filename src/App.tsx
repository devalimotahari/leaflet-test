import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useState } from "react";

function ClickListener() {
  const [cordinate, setCordinate] = useState<[number, number]>([32.822637444696596,51.70188309871206]);
  const map = useMapEvents({
    click: (e) => {
      console.log(e);
      setCordinate([e.latlng.lat, e.latlng.lng]);
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return (
    <Marker position={cordinate}>
      <Popup>اینجا رو انتخاب کردی</Popup>
    </Marker>
  );
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <MapContainer
        style={{
          height: "100vh",
          width: "100%",
        }}
        center={[32.82261807573093, 51.70188309871206]}
        zoom={14}
      >
        <ClickListener />
        <LayersControl>
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mapbox Map">
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={"your token here"}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mapbox Map Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={"your token here"}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Google Map">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Map Satellite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default App;
