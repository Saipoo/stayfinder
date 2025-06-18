import { Suspense } from "react"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Hero } from "@/components/hero"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users, Home } from "lucide-react"

// This would normally come from your API
const featuredProperties = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviewCount: 127,
    images: ["/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Pool", "Kitchen", "Parking"],
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: "2",
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 280,
    rating: 4.8,
    reviewCount: 89,
    images: ["/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Fireplace", "Kitchen", "Hot Tub"],
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: "3",
    title: "Modern City Apartment",
    location: "New York, NY",
    price: 180,
    rating: 4.7,
    reviewCount: 203,
    images: ["/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Gym", "Kitchen", "Balcony"],
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: "4",
    title: "Rustic Farmhouse",
    location: "Tuscany, Italy",
    price: 320,
    rating: 4.9,
    reviewCount: 156,
    images: ["/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Garden", "Kitchen", "Wine Cellar"],
    guests: 10,
    bedrooms: 5,
    bathrooms: 3,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBar />
        </Suspense>

        {/* Stats Section */}
        <section className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-muted-foreground">Properties</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-muted-foreground">Happy Guests</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Beachfront", icon: "🏖️", count: "1,200+ properties" },
              { name: "Mountain", icon: "🏔️", count: "800+ properties" },
              { name: "City", icon: "🏙️", count: "2,500+ properties" },
              { name: "Countryside", icon: "🌾", count: "600+ properties" },
            ].map((category) => (
              <div
                key={category.name}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
