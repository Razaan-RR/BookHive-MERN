import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

function Coverage({ centerLocations }) {
  const position = [23.685, 90.3563]
  const [search, setSearch] = useState('')

  const filteredLocations = centerLocations.filter(
    (center) =>
      center.district.toLowerCase().includes(search.toLowerCase()) ||
      center.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-(--secondary) opacity-20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-(--primary) opacity-20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block mb-6 px-6 py-2 rounded-full text-2xl sm:text-3xl font-bold bg-(--secondary)/25 text-(--text) shadow-sm">
            📍 Coverage Area
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
            We are available in
            <br />
            <span className="text-(--primary)">10 districts across Bangladesh 🇧🇩</span>
          </h2>

          <p className="mt-4 opacity-70">
            Find your nearest BookHive delivery center and explore books without limits 📚✨
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by district or city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 sm:w-80 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
          <button
            className="px-6 py-2 rounded-r-full text-white font-medium shadow-md transition"
            style={{
              background:
                'linear-gradient(to right, var(--primary), var(--secondary))',
            }}
          >
            🔍 Search
          </button>
        </div>

        <div className="relative rounded-4xl overflow-hidden shadow-2xl backdrop-blur-xl bg-(--card-bg)/60">
          <div className="h-[420px] w-full">
            <MapContainer
              className="h-full w-full"
              center={position}
              zoom={8}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredLocations.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>📍 {center.district}</strong>
                    <br />
                    <span className="opacity-70">{center.city}</span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="absolute top-6 right-6 z-1000 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-sm font-semibold">
            🚚 Fast Delivery Zones
          </div>
        </div>
      </div>
    </section>
  )
}

export default Coverage
