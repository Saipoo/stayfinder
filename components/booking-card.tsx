"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Users, Star } from "lucide-react"
import { format } from "date-fns"

interface BookingCardProps {
  property: {
    id: string
    price: number
    rating: number
    reviewCount: number
  }
}

export function BookingCard({ property }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("1")
  const [isLoading, setIsLoading] = useState(false)

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const subtotal = nights * property.price
  const serviceFee = Math.round(subtotal * 0.14)
  const cleaningFee = 50
  const total = subtotal + serviceFee + cleaningFee

  const handleBooking = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: checkIn?.toISOString(),
          checkOut: checkOut?.toISOString(),
          guests: Number.parseInt(guests),
          total,
        }),
      })

      if (response.ok) {
        // Redirect to booking confirmation or payment
        window.location.href = "/booking/confirmation"
      } else {
        alert("Booking failed. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${property.price}</span>
            <span className="text-base font-normal text-muted-foreground"> night</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-muted-foreground">({property.reviewCount})</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM dd") : "Check in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM dd") : "Check out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger>
            <Users className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Guest</SelectItem>
            <SelectItem value="2">2 Guests</SelectItem>
            <SelectItem value="3">3 Guests</SelectItem>
            <SelectItem value="4">4 Guests</SelectItem>
            <SelectItem value="5">5+ Guests</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full" size="lg" onClick={handleBooking} disabled={!checkIn || !checkOut || isLoading}>
          {isLoading ? "Booking..." : "Reserve"}
        </Button>

        {nights > 0 && (
          <>
            <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  ${property.price} x {nights} nights
                </span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
