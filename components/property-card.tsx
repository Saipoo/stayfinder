import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MapPin, Users, Bed, Bath } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    price: number
    rating: number
    reviewCount: number
    images: string[]
    amenities: string[]
    guests: number
    bedrooms: number
    bathrooms: number
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link href={`/property/${property.id}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link href={`/property/${property.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-muted-foreground">({property.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {property.guests}
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-3 w-3" />
            {property.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3 w-3" />
            {property.bathrooms}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${property.price}</span>
            <span className="text-muted-foreground"> / night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
