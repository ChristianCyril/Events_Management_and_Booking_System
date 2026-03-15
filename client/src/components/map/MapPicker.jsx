// components/MapPicker.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import './MapPicker.css'
import { useState } from "react"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// This inner component listens for clicks on the map
function ClickHandler({ setLocation }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
        const data = await response.json()
        const address = data.display_name || `${lat}, ${lng}`
        setLocation({ lat, lng, address })
      } catch (error) {
        setLocation({ lat, lng, address: `${lat}, ${lng}` })
      }
    },
  })
  return null
}

export default function MapPicker({ location, setLocation }) {
  // Default center -- Yaounde, Cameroon
  const defaultCenter = [3.8667, 11.5167]
  const center = location?.lat ? [location.lat, location.lng] : defaultCenter
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [searchFailed, setSearchFailed] = useState(false);

  //search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    setIsValidLocation(true)
    setSearchFailed(false)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      )
      const data = await response.json()

      if (data.length === 0) {
        setIsValidLocation(false)
        return
      }

      const { lat, lon, display_name } = data[0]

      setLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        address: display_name
      })
    } catch (error) {
      setSearchFailed(true)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div>
      <div className="map-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearch()
            }
          }}
        />
        <button type="button" onClick={handleSearch} disabled={searching}>
          {searching ? "Searching..." : "Search"}
        </button>
      </div>
      {!isValidLocation && <p className="server-error">Location not found. Try a different search.</p> /*they inherit style*/}
      {searchFailed && <p className="server-error">Search failed. Try clicking the map instead.</p> /*from parent container*/}
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
        <ClickHandler setLocation={setLocation} />
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

/*
The Simple Rule
Anything that uses useMapEvents, useMap, 
or any other react-leaflet hook must be a child component rendered inside MapContainer, 
not the same component that renders MapContainer itself.

*/