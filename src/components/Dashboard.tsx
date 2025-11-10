"use client"

import { useState } from "react"
import { Header } from "./Header"
import { ApodCard } from "./ApodCard"
import { ObservationConditions } from "./ObservationConditions"
import { MoonPhaseWidget } from "./MoonPhaseWidget"
import { PlanetsVisibility } from "./PlanetsVisibility"
import { CelestialEvents } from "./CelestialEvents"
import { SkyMapSection } from "./SkyMapSection"
import { DeepSkyExplorer } from "./DeepSkyExplorer"
import { useGeolocation } from "../hooks/useGeolocation"
import type { Location } from "../types"

export function Dashboard() {
  const { location: geoLocation, loading, error, requestLocation } = useGeolocation()
  const [location, setLocation] = useState<Location>(
    geoLocation || { lat: -23.5505, lon: -46.6333 }, // Default: São Paulo
  )

  // Update location when geolocation is available
  if (geoLocation && (location.lat !== geoLocation.lat || location.lon !== geoLocation.lon)) {
    setLocation(geoLocation)
  }

  const handleLocationUpdate = (newLocation: Location) => {
    setLocation(newLocation)
  }

  const handleUseGeolocation = () => {
    requestLocation()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header location={location} onLocationUpdate={handleLocationUpdate} onUseGeolocation={handleUseGeolocation} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* APOD Section - Full width featured */}
        <section>
          <ApodCard />
        </section>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Observation Conditions & Moon Phase */}
          <div className="space-y-6">
            <ObservationConditions location={location} />
            <MoonPhaseWidget />
          </div>

          {/* Middle Column - Planets & Celestial Events */}
          <div className="space-y-6">
            <PlanetsVisibility location={location} />
            <CelestialEvents location={location} />
          </div>

          {/* Right Column - Sky Map & Deep Sky */}
          <div className="space-y-6">
            <SkyMapSection location={location} />
            <DeepSkyExplorer />
          </div>
        </div>
      </main>
    </div>
  )
}
