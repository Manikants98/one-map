import L from 'leaflet'
import React, { useEffect, useRef } from 'react'
import { useSelectedLocation } from '../../Context/SelectedLocation'

const liveIcon = L.divIcon({
  html: `
    <div id="live-icon" style="position: relative; width: 60px; height: 60px; border-radius: 50%; background-color: rgba(0, 122, 255, 0.3); display: flex; justify-content: center; align-items: center;">
      <!-- Inner Solid Circle -->
      <div style="position: absolute; width: 20px; height: 20px; border-radius: 50%; background-color: #007aff; border: 3px solid rgba(255, 255, 255, 0.3);"></div>
      <!-- Rotating Arrow -->
      <div class="live-icon-arrow" style="position: absolute; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 12px solid #007aff; transform: rotate(0deg); top: 6px; transform-origin: center 36px;"></div>
    </div>`,
  popupAnchor: [0, -28],
})

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const darkMode = false

  const { selectedLocation } = useSelectedLocation()

  useEffect(() => {
    const map = L.map('map', {
      center: [1.3521, 103.8198],
      zoom: 13,
    })
    mapRef.current = map

    const baseMapUrl = (style: string) =>
      `https://www.onemap.gov.sg/maps/tiles/${style}/{z}/{x}/{y}.png`
    const tileLayer = darkMode ? 'Night' : 'Default'
    L.tileLayer(baseMapUrl(tileLayer), {
      detectRetina: true,
      maxZoom: 19,
      minZoom: 11,
    }).addTo(map)

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude])
          } else {
            markerRef.current = L.marker([latitude, longitude], {
              icon: liveIcon,
            }).addTo(map)
          }
          map.setView([latitude, longitude], 16)
        },
        (error) => {
          console.error(error)
        },
        { enableHighAccuracy: true }
      )
    }

    if (selectedLocation?.LATTITUDE && selectedLocation?.LONGTITUDE) {
      const { LATTITUDE, LONGTITUDE } = selectedLocation
      const lat = parseFloat(LATTITUDE)
      const lng = parseFloat(LONGTITUDE)
      markerRef.current = L.marker([lat, lng], {
        icon: liveIcon,
      }).addTo(map)
      map.setView([lat, lng], 16)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [selectedLocation])

  return <div id="map" className="h-[87vh] w-full" />
}

export default Map
