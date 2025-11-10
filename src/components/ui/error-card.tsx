import { AlertCircle } from "lucide-react"

interface ErrorCardProps {
  title: string
  error: unknown
}

export function ErrorCard({ title, error }: ErrorCardProps) {
  const errorMessage = error instanceof Error ? error.message : "Erro ao carregar dados"

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <p className="text-muted-foreground">{errorMessage}</p>
      </div>
    </div>
  )
}
