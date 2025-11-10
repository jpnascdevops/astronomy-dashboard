export interface Location {
  lat: number
  lon: number
}

export interface ApodResponse {
  date: string
  title: string
  explanation: string
  url: string
  media_type: string
  copyright?: string
}

export interface MoonPhaseResponse {
  phase: string
  illumination: number
  age: number
  distance: number
  nextNewMoon: string
  nextFullMoon: string
}

export interface CelestialEvent {
  date: string
  type: string
  name: string
  description: string
  visibility: string
}

export interface CelestialEventsResponse {
  events: CelestialEvent[]
}

export interface ObservationConditionsResponse {
  location: string
  current: {
    temp: number
    humidity: number
    clouds: number
    visibility: number
  }
  score: number
  recommendation: string
  nextBestTime: string
}

export interface SkyObject {
  name: string
  type: string
  constellation: string
  altitude: number
  azimuth: number
  magnitude: number
  rightAscension: string
  declination: string
}

export interface SkyMapResponse {
  timestamp: string
  location: {
    lat: number
    lon: number
  }
  visible: SkyObject[]
}

export interface Planet {
  name: string
  constellation: string
  magnitude: number
  distance: number
  rise: string
  set: string
  visible: boolean
}

export interface PlanetsResponse {
  date: string
  planets: Planet[]
}

export interface DeepSkyObject {
  name: string
  type: string
  magnitude: number
  coordinates: {
    ra: string
    dec: string
  }
  size: string
  description: string
}

export interface DeepSkyResponse {
  constellation: string
  objects: DeepSkyObject[]
}
