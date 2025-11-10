"use client"

import { useState } from "react"
import type { Location } from "../types"

export function useGeolocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = async (): Promise<Location | null> => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo navegador")
      return null
    }

    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false)
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (err) => {
          setLoading(false)
          setError(err.message)
          resolve(null)
        },
      )
    })
  }

  return { requestLocation, loading, error }
}
