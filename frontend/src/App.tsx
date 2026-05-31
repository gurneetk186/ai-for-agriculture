import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {

  const [geoData, setGeoData] = useState<any>(null);

  const handleFileUpload = (event: any) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {

      const jsonData = JSON.parse(e.target.result);

      setGeoData(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>

      <h1 style={{ textAlign: "center" }}>
        AI for Agriculture
      </h1>

      <div style={{ padding: "10px" }}>
        <input
          type="file"
          accept=".geojson,.json"
          onChange={handleFileUpload}
        />
      </div>

      <MapContainer
        center={[46.725, -117.175]}
        zoom={13}
        style={{ height: "85%", width: "100%" }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && <GeoJSON data={geoData} />}

      </MapContainer>

    </div>
  );
}

export default App;