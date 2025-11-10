import axios from "axios"
import type {
  ApodResponse,
  MoonPhaseResponse,
  CelestialEventsResponse,
  ObservationConditionsResponse,
  SkyMapResponse,
  PlanetsResponse,
  DeepSkyResponse,
} from "../types"

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
})

export const getApod = async (): Promise<ApodResponse> => {
  const { data } = await api.get("/astronomy/apod")
  return data
}

export const getMoonPhase = async (date: string): Promise<MoonPhaseResponse> => {
  const { data } = await api.get("/astronomy/moon-phase", { params: { date } })
  return data
}

export const getCelestialEvents = async (start: string, end: string): Promise<CelestialEventsResponse> => {
  const { data } = await api.get("/astronomy/celestial-events", {
    params: { start, end },
  })
  return data
}

export const getObservationConditions = async (lat: number, lon: number): Promise<ObservationConditionsResponse> => {
  const { data } = await api.get("/weather/observation-conditions", {
    params: { lat, lon },
  })
  return data
}

export const getSkyMap = async (lat: number, lon: number, date: string, time: string): Promise<SkyMapResponse> => {
  const { data } = await api.get("/astronomy/sky-map", {
    params: { lat, lon, date, time },
  })
  return data
}

export const getPlanets = async (date: string): Promise<PlanetsResponse> => {
  const { data } = await api.get("/astronomy/planets", { params: { date } })
  return data
}

export const getDeepSkyObjects = async (constellation: string): Promise<DeepSkyResponse> => {
  const { data } = await api.get("/astronomy/deep-sky", {
    params: { constellation },
  })
  return data
}
