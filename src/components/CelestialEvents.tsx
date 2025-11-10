"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format, addDays } from "date-fns"
import { Calendar, Filter, Star } from "lucide-react"
import { getCelestialEvents } from "../services/api"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export function CelestialEvents() {
  const [filter, setFilter] = useState<string>("all")

  const startDate = format(new Date(), "yyyy-MM-dd")
  const endDate = format(addDays(new Date(), 30), "yyyy-MM-dd")

  const { data, isLoading, error } = useQuery({
    queryKey: ["celestial-events", startDate, endDate],
    queryFn: () => getCelestialEvents(startDate, endDate),
  })

  if (isLoading) return <LoadingCard title="Eventos Celestiais" />
  if (error) return <ErrorCard title="Eventos" error={error} />
  if (!data) return null

  const eventTypes = ["all", ...new Set(data.events.map((e) => e.type))]
  const filteredEvents = filter === "all" ? data.events : data.events.filter((e) => e.type === filter)

  const getVisibilityColor = (visibility: string) => {
    if (visibility.toLowerCase().includes("excellent") || visibility.toLowerCase().includes("excelente"))
      return "default"
    if (visibility.toLowerCase().includes("good") || visibility.toLowerCase().includes("boa")) return "secondary"
    return "outline"
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Eventos Celestiais</h3>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className="capitalize"
            >
              {type === "all" ? "Todos" : type}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-gradient-to-r from-muted/50 to-transparent hover:from-muted/70 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-2xl font-bold text-primary">{format(new Date(event.date), "dd")}</div>
                <div className="text-xs text-muted-foreground uppercase">{format(new Date(event.date), "MMM")}</div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      {event.name}
                    </h4>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {event.type}
                    </Badge>
                  </div>
                  <Badge variant={getVisibilityColor(event.visibility)}>{event.visibility}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
