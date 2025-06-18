import { notFound } from "next/navigation"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyDetails } from "@/components/property-details"
import { BookingCard } from "@/components/booking-card"
import { PropertyReviews } from "@/components/property-reviews"
import { PropertyMap } from "@/components/property-map"
import { Button } from "@/components/ui/button"
import { Share, Heart, Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react"

// This would normally come from your API
async function getProperty(id: string) {
  // Simulate API call
  const properties = {
    "1": {
      id: "1",
      title: "Luxury Beachfront Villa",
      location: "Malibu, California",
      coordinates: { lat: 34.0259, lng: -118.7798 },
      price: 450,
      rating: 4.9,
      reviewCount: 127,
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "Experience luxury living in this stunning beachfront villa with panoramic ocean views. This property features modern amenities, spacious rooms, and direct beach access. Perfect for families or groups looking for an unforgettable vacation experience.",
      amenities: [
        { icon: Wifi, name: "WiFi" },
        { icon: Waves, name: "Pool" },
        { icon: Utensils, name: "Kitchen" },
        { icon: Car, name: "Parking" },
      ],
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      host: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        joinedDate: "2019",
        isSuper: true,
        responseRate: 100,
        responseTime: "within an hour",
      },
      reviews: [
        {
          id: "1",
          user: "Mike Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          date: "2024-01-15",
          comment: "Absolutely stunning property! The ocean views were breathtaking and the amenities were top-notch.",
        },
        {
          id: "2",
          user: "Emma Davis",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          date: "2024-01-10",
          comment: "Perfect location and beautiful house. Sarah was an excellent host. Highly recommend!",
        },
      ],
    },
  }

  return properties[id as keyof typeof properties] || null
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="underline">{property.location}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <PropertyGallery images={property.images} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetails property={property} />
            <PropertyReviews reviews={property.reviews} rating={property.rating} reviewCount={property.reviewCount} />
            <PropertyMap coordinates={property.coordinates} title={property.title} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
