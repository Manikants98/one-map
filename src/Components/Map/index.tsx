import L from 'leaflet'
import React, { useEffect, useRef } from 'react'
import { useSelectedLocation } from 'Context/SelectedLocation'
import { useThemeContext } from 'Context/Theme'

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
  const { selectedLocation } = useSelectedLocation()
  const { mode } = useThemeContext()
  const darkMode = mode === 'dark'

  useEffect(() => {
    const map = L.map('map')
    mapRef.current = map

    const baseMapUrl = (style: string): string =>
      `https://www.onemap.gov.sg/maps/tiles/${style}/{z}/{x}/{y}.png`

    const tileLayer = darkMode ? 'Night' : 'Default'

    L.tileLayer(baseMapUrl(tileLayer), {
      detectRetina: true,
      maxZoom: 19,
      minZoom: 11,
    }).addTo(map)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [darkMode])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Set initial marker
    const initialLat = selectedLocation?.LATTITUDE || 1.3521 // Fallback: Singapore lat
    const initialLng = selectedLocation?.LONGTITUDE || 103.8198 // Fallback: Singapore lng
    const marker = L.marker([initialLat as number, initialLng as number], { icon: liveIcon }).addTo(
      map
    )
    markerRef.current = marker

    const updateMarkerPosition = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      marker.setLatLng([latitude, longitude])
    }

    const watchId = navigator.geolocation.watchPosition(
      updateMarkerPosition,
      (error) => console.error('Error watching position:', error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 200000 }
    )

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const alpha = event.alpha || 0
      const correctedAlpha = (360 - alpha) % 360
      const element = document.getElementById('live-icon')
      if (element) {
        element.style.transform = `translate(-50%, -50%) rotate(${correctedAlpha}deg)`
      }
    }

    window.addEventListener('deviceorientation', handleDeviceOrientation)

    // Fit bounds to marker
    map.fitBounds([[initialLat as number, initialLng as number]], { padding: [50, 50] })

    return () => {
      // Cleanup geolocation and event listeners
      navigator.geolocation.clearWatch(watchId)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
  }, [selectedLocation])

  return <div id="map" className="lg:h-[83.6vh] h-[87.5vh] w-full" />
}

export default Map
