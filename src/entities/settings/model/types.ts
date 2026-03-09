export interface SettingsAdminDTO {
  id: string
  companyName: string
  siteTitle: string
  description: string
  address?: string
  phone?: string
  email?: string
  mapsUrl?: string
  imageUrl?: string
  routes: RoutesSettingsDTO[]
}

export interface SettingsPublicDTO {
  companyName: string
  siteTitle: string
  description: string
  address?: string
  phone?: string
  email?: string
  mapsUrl?: string
  imageUrl?: string
  routes: RoutesPublicSettingsDTO[]
}

export interface UpdateSettingsDTO {
  companyName: string
  siteTitle: string
  description: string
  address?: string
  phone?: string
  email?: string
  mapsUrl?: string
}

export interface LogoImage {
  file?: File
  url?: string
}

export interface RoutesSettingsDTO {
  id: string
  title: string
  isActive: boolean
}
export interface RoutesPublicSettingsDTO {
  title: string
  isActive: boolean
}