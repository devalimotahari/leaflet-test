import {
  LayerGroup,
  LayersControl,
  MapContainer, TileLayer,
  useMapEvents
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function ClickListener() {
  const map = useMapEvents({
    click: (e) => {
      console.log(e);
    },
    moveend: () => {
      console.log("get center", map.getCenter());
    },
  });
  return null;
}

const TestLayer = () => {
  return (
    <p
      style={{
        margin: 0,
        color: "red",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 1000,
      }}
    >
      this is custom marker
    </p>
  );
};

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "relative",
      }}
    >
      <MapContainer
        style={{
          height: "100vh",
          width: "100%",
        }}
        center={[32.82261807573093, 51.70188309871206]}
        zoom={14}
      >
        <ClickListener />
        <TestLayer />
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
