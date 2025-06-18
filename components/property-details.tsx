import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Bed, Bath, Star, Shield, Award } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    title: string
    guests: number
    bedrooms: number
    bathrooms: number
    description: string
    amenities: Array<{ icon: any; name: string }>
    host: {
      name: string
      avatar: string
      joinedDate: string
      isSuper: boolean
      responseRate: number
      responseTime: string
    }
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Property Info */}
      <div>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {property.guests} guests
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.bedrooms} bedrooms
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} bathrooms
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      <Separator />

      {/* Host Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={property.host.avatar || "/placeholder.svg"} alt={property.host.name} />
              <AvatarFallback>
                {property.host.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                Hosted by {property.host.name}
                {property.host.isSuper && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3" />
                    Superhost
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">Joined in {property.host.joinedDate}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{property.host.responseRate}% response rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Responds {property.host.responseTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3">
              <amenity.icon className="h-5 w-5" />
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
