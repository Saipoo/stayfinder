"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPropertyTypes([...propertyTypes, type])
    } else {
      setPropertyTypes(propertyTypes.filter((t) => t !== type))
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity])
    } else {
      setAmenities(amenities.filter((a) => a !== amenity))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-base font-semibold">Price Range</Label>
          <div className="mt-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="w-full" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div>
          <Label className="text-base font-semibold">Property Type</Label>
          <div className="mt-4 space-y-3">
            {["House", "Apartment", "Villa", "Cabin", "Condo", "Townhouse"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={propertyTypes.includes(type)}
                  onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <Label className="text-base font-semibold">Amenities</Label>
          <div className="mt-4 space-y-3">
            {["WiFi", "Kitchen", "Pool", "Parking", "Air Conditioning", "Hot Tub", "Fireplace", "Gym"].map(
              (amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ),
            )}
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Clear All
          </Button>
          <Button className="flex-1">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
