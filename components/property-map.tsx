"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  title: string
}

export function PropertyMap({ coordinates, title }: PropertyMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Where you'll be
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Interactive map would be displayed here</p>
            <p className="text-sm">
              Coordinates: {coordinates.lat}, {coordinates.lng}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The exact location will be provided after booking confirmation.
        </p>
      </CardContent>
    </Card>
  )
}
