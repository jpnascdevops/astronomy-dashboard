import { useQuery } from "@tanstack/react-query"
import { Calendar, User } from "lucide-react"
import { getApod } from "../services/api"
import { LoadingCard } from "./ui/loading-card"
import { ErrorCard } from "./ui/error-card"

export function ApodCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["apod"],
    queryFn: getApod,
  })

  if (isLoading) return <LoadingCard title="Astronomy Picture of the Day" />
  if (error) return <ErrorCard title="APOD" error={error} />
  if (!data) return null

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card group">
      <div className="grid md:grid-cols-2 gap-6">
        {data.media_type === "image" ? (
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <img
              src={data.url || "/placeholder.svg"}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-r" />
          </div>
        ) : (
          <div className="relative aspect-video md:aspect-auto">
            <iframe
              src={data.url}
              title={data.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}

        <div className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            <span>{data.date}</span>
            {data.copyright && (
              <>
                <span className="mx-1">•</span>
                <User className="w-4 h-4" />
                <span>{data.copyright}</span>
              </>
            )}
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">{data.title}</h2>

          <p className="text-muted-foreground leading-relaxed line-clamp-6">{data.explanation}</p>
        </div>
      </div>
    </div>
  )
}
