// components/MapPicker.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import './MapPicker.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// This inner component listens for clicks on the map
function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng

      // Reverse geocode -- convert lat/lng to a human readable address
      // Using OpenStreetMap's free Nominatim API -- no API key needed
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
        const data = await response.json()
        const address = data.display_name || `${lat}, ${lng}`

        // Pass the result up to the parent form
        onLocationSelect({ lat, lng, address })
      } catch (error) {
        // If reverse geocoding fails, just use the coordinates as the address
        onLocationSelect({ lat, lng, address: `${lat}, ${lng}` })
      }
    },
  })
  return null
}

export default function MapPicker({ location, onLocationSelect }) {
  // Default center -- Yaounde, Cameroon
  const defaultCenter = [3.8667, 11.5167]
  const center = location?.lat ? [location.lat, location.lng] : defaultCenter

  return (
    <div>
      <p className="map-instruction">Click on the map to drop a pin</p>
      <MapContainer
        key={center.join('-')}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="map-picker-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onLocationSelect={onLocationSelect} />
        {location?.lat && (
          <Marker position={[location.lat, location.lng]} />
        )}
      </MapContainer>
      {location?.address && (
        <p className="selected-address">
          Selected: {location.address}
        </p>
      )}
    </div>
  )
}