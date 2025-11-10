import { Loader2 } from "lucide-react"

interface LoadingCardProps {
  title: string
}

export function LoadingCard({ title }: LoadingCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  )
}
