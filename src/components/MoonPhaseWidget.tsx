import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Moon, Calendar } from "lucide-react"
import { getMoonPhase } from "../services/api"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"

export function MoonPhaseWidget() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["moon-phase"],
    queryFn: () => getMoonPhase(format(new Date(), "yyyy-MM-dd")),
  })

  if (isLoading) return <LoadingCard title="Fase da Lua" />
  if (error) return <ErrorCard title="Lua" error={error} />
  if (!data) return null

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Moon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Fase da Lua</h3>
      </div>

      <div className="flex flex-col items-center mb-6">
        {/* Moon visualization */}
        <div className="relative w-32 h-32 mb-4">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg"
            style={{
              clipPath: `inset(0 ${data.illumination > 50 ? 100 - data.illumination * 2 : 0}% 0 ${data.illumination <= 50 ? 100 - data.illumination * 2 : 0}%)`,
            }}
          />
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
        </div>

        <h4 className="text-2xl font-bold text-center mb-2">{data.phase}</h4>
        <p className="text-3xl font-bold text-primary">{data.illumination.toFixed(1)}%</p>
        <p className="text-sm text-muted-foreground">Iluminação</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <span className="text-sm text-muted-foreground">Idade</span>
          <span className="font-semibold">{data.age.toFixed(1)} dias</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <span className="text-sm text-muted-foreground">Distância</span>
          <span className="font-semibold">{data.distance.toLocaleString()} km</span>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Próxima Lua Nova:</span>
            <span className="font-medium">{format(new Date(data.nextNewMoon), "dd/MM")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Próxima Lua Cheia:</span>
            <span className="font-medium">{format(new Date(data.nextFullMoon), "dd/MM")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
