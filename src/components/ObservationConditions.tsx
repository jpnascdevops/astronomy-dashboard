import { useQuery } from "@tanstack/react-query"
import { Cloud, Droplets, Eye, Thermometer, Clock, TrendingUp } from "lucide-react"
import { getObservationConditions } from "../services/api"
import type { Location } from "../types"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"

interface ObservationConditionsProps {
  location: Location
}

export function ObservationConditions({ location }: ObservationConditionsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["observation-conditions", location],
    queryFn: () => getObservationConditions(location.lat, location.lon),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) return <LoadingCard title="Condições de Observação" />
  if (error) return <ErrorCard title="Condições" error={error} />
  if (!data) return null

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-6">Condições de Observação</h3>

      {/* Score Gauge */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - data.score / 100)}`}
              className={getScoreColor(data.score)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`text-4xl font-bold ${getScoreColor(data.score)}`}>{data.score}</span>
            <span className="text-sm text-muted-foreground">Score</span>
          </div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Thermometer className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Temperatura</p>
            <p className="text-lg font-semibold">{data.current.temp}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Droplets className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Umidade</p>
            <p className="text-lg font-semibold">{data.current.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Cloud className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Nuvens</p>
            <p className="text-lg font-semibold">{data.current.clouds}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Eye className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Visibilidade</p>
            <p className="text-lg font-semibold">{(data.current.visibility / 1000).toFixed(1)}km</p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Recomendação</p>
            <p className="text-sm text-muted-foreground">{data.recommendation}</p>
          </div>
        </div>

        {data.nextBestTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Melhor horário: {data.nextBestTime}</span>
          </div>
        )}
      </div>
    </div>
  )
}
