"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Telescope, MapPin, Navigation } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { Location } from "../types"

interface HeaderProps {
  location: Location
  onLocationUpdate: (location: Location) => void
  onUseGeolocation: () => void
}

export function Header({ location, onLocationUpdate, onUseGeolocation }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [lat, setLat] = useState(location.lat.toString())
  const [lon, setLon] = useState(location.lon.toString())

  const handleSave = () => {
    const newLat = Number.parseFloat(lat)
    const newLon = Number.parseFloat(lon)

    if (!isNaN(newLat) && !isNaN(newLon) && newLat >= -90 && newLat <= 90 && newLon >= -180 && newLon <= 180) {
      onLocationUpdate({ lat: newLat, lon: newLon })
      setIsEditing(false)
    }
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Telescope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Observação Astronômica</h1>
              <p className="text-sm text-muted-foreground">{format(new Date(), "PPpp")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Latitude</Label>
                  <Input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-28 h-8"
                    step="0.0001"
                    min="-90"
                    max="90"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Longitude</Label>
                  <Input
                    type="number"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    className="w-28 h-8"
                    step="0.0001"
                    min="-180"
                    max="180"
                  />
                </div>
                <Button onClick={handleSave} size="sm" className="mt-5">
                  Salvar
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono">
                    {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
                  </span>
                </div>
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  Editar
                </Button>
                <Button onClick={onUseGeolocation} variant="outline" size="sm">
                  <Navigation className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
