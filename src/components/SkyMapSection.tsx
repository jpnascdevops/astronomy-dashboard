"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Map, Star, TrendingUp, Compass } from "lucide-react"
import { getSkyMap } from "../services/api"
import type { Location } from "../types"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface SkyMapSectionProps {
  location: Location
}

export function SkyMapSection({ location }: SkyMapSectionProps) {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"altitude" | "magnitude">("altitude")

  const currentDate = format(new Date(), "yyyy-MM-dd")
  const currentTime = format(new Date(), "HH:mm")

  const { data, isLoading, error } = useQuery({
    queryKey: ["sky-map", location, currentDate, currentTime],
    queryFn: () => getSkyMap(location.lat, location.lon, currentDate, currentTime),
    refetchInterval: 5 * 60 * 1000,
  })

  if (isLoading) return <LoadingCard title="Mapa do Céu" />
  if (error) return <ErrorCard title="Mapa do Céu" error={error} />
  if (!data) return null

  const types = ["all", ...new Set(data.visible.map((obj) => obj.type))]
  const filteredObjects = typeFilter === "all" ? data.visible : data.visible.filter((obj) => obj.type === typeFilter)

  const sortedObjects = [...filteredObjects].sort((a, b) => {
    if (sortBy === "altitude") return b.altitude - a.altitude
    return a.magnitude - b.magnitude
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Objetos Visíveis Agora</h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={sortBy === "altitude" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("altitude")}
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
          <Button
            variant={sortBy === "magnitude" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("magnitude")}
          >
            <Star className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {types.map((type) => (
          <Button
            key={type}
            variant={typeFilter === type ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter(type)}
            className="capitalize"
          >
            {type === "all" ? "Todos" : type}
          </Button>
        ))}
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {sortedObjects.map((obj, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                <span className="font-semibold">{obj.name}</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {obj.type}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{obj.constellation}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Alt:</span>
                <span className="font-medium">{obj.altitude.toFixed(1)}°</span>
              </div>
              <div className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Az:</span>
                <span className="font-medium">{obj.azimuth.toFixed(1)}°</span>
              </div>
              <div>
                <span className="text-muted-foreground">Mag:</span>
                <span className="font-medium ml-1">{obj.magnitude.toFixed(1)}</span>
              </div>
              <div className="text-muted-foreground text-xs font-mono">
                {obj.rightAscension} / {obj.declination}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
