import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Globe, Sunrise, Sunset, Eye } from "lucide-react"
import { getPlanets } from "../services/api"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"
import { Badge } from "./ui/badge"

export function PlanetsVisibility() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["planets"],
    queryFn: () => getPlanets(format(new Date(), "yyyy-MM-dd")),
  })

  if (isLoading) return <LoadingCard title="Planetas Visíveis" />
  if (error) return <ErrorCard title="Planetas" error={error} />
  if (!data) return null

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Planetas Visíveis</h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {data.planets.map((planet) => (
          <div
            key={planet.name}
            className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-lg">{planet.name}</h4>
                <p className="text-sm text-muted-foreground">{planet.constellation}</p>
              </div>
              {planet.visible && (
                <Badge variant="default" className="gap-1">
                  <Eye className="w-3 h-3" />
                  Visível
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Sunrise className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Nasce:</span>
                <span className="font-medium">{planet.rise}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sunset className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Põe:</span>
                <span className="font-medium">{planet.set}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-sm text-muted-foreground">Magnitude: {planet.magnitude.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">{planet.distance.toFixed(2)} AU</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
