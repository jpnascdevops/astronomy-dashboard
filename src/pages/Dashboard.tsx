"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { ApodCard } from "../components/ApodCard"
import { ObservationConditions } from "../components/ObservationConditions"
import { MoonPhaseWidget } from "../components/MoonPhaseWidget"
import { PlanetsVisibility } from "../components/PlanetsVisibility"
import { CelestialEvents } from "../components/CelestialEvents"
import { SkyMapSection } from "../components/SkyMapSection"
import { DeepSkyExplorer } from "../components/DeepSkyExplorer"
import { useGeolocation } from "../hooks/useGeolocation"
import type { Location } from "../types"

export function Dashboard() {
  const [location, setLocation] = useState<Location>(() => {
    const saved = localStorage.getItem("astronomy-location")
    return saved ? JSON.parse(saved) : { lat: 0, lon: 0 }
  })

  const { requestLocation } = useGeolocation()

  useEffect(() => {
    localStorage.setItem("astronomy-location", JSON.stringify(location))
  }, [location])

  const handleLocationUpdate = (newLocation: Location) => {
    setLocation(newLocation)
  }

  const handleUseGeolocation = async () => {
    const coords = await requestLocation()
    if (coords) {
      setLocation(coords)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header location={location} onLocationUpdate={handleLocationUpdate} onUseGeolocation={handleUseGeolocation} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section - APOD */}
        <ApodCard />

        {/* Primary Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ObservationConditions location={location} />
          <MoonPhaseWidget />
          <PlanetsVisibility />
        </div>

        {/* Events Timeline */}
        <CelestialEvents />

        {/* Sky Data */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SkyMapSection location={location} />
          <DeepSkyExplorer />
        </div>
      </main>
    </div>
  )
}
