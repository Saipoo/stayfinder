import { Suspense } from "react"
import { SearchFilters } from "@/components/search-filters"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

// This would normally come from your API based on search params
const searchResults = [
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
]

export default function SearchPage({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const location = (searchParams.location as string) || ""
  const checkin = (searchParams.checkin as string) || ""
  const checkout = (searchParams.checkout as string) || ""
  const guests = (searchParams.guests as string) || ""

  return (
    <div className="min-h-screen">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <SearchFilters />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">{location ? `Stays in ${location}` : "Search Results"}</h1>
                <p className="text-muted-foreground">
                  {searchResults.length} properties found
                  {checkin && checkout && ` • ${checkin} - ${checkout}`}
                  {guests && ` • ${guests} guests`}
                </p>
              </div>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
