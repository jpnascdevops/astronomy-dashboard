"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Sparkles, Search } from "lucide-react"
import { getDeepSkyObjects } from "../services/api"
import { ErrorCard } from "./ui/error-card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const CONSTELLATIONS = [
  "Andromeda",
  "Orion",
  "Ursa Major",
  "Cassiopeia",
  "Cygnus",
  "Lyra",
  "Aquila",
  "Sagittarius",
  "Scorpius",
  "Leo",
]

export function DeepSkyExplorer() {
  const [constellation, setConstellation] = useState("Orion")

  const { data, isLoading, error } = useQuery({
    queryKey: ["deep-sky", constellation],
    queryFn: () => getDeepSkyObjects(constellation),
    enabled: !!constellation,
  })

  if (error) return <ErrorCard title="Deep Sky" error={error} />

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Objetos Deep Sky</h3>
        </div>

        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Select value={constellation} onValueChange={setConstellation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione constelação" />
            </SelectTrigger>
            <SelectContent>
              {CONSTELLATIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : data ? (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {data.objects.map((obj, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border bg-gradient-to-br from-muted/50 to-transparent hover:from-muted/70 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{obj.name}</h4>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {obj.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Magnitude</p>
                  <p className="text-lg font-semibold text-primary">{obj.magnitude.toFixed(1)}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{obj.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                <div>
                  <span className="text-muted-foreground">RA: </span>
                  <span className="font-mono">{obj.coordinates.ra}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dec: </span>
                  <span className="font-mono">{obj.coordinates.dec}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tamanho: </span>
                  <span>{obj.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
