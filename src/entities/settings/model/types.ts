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