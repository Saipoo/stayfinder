import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Booking } from "@/models/Booking"
import { Listing } from "@/models/Listing"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    const { propertyId, checkIn, checkOut, guests, total } = await request.json()

    // Verify listing exists
    const listing = await Listing.findById(propertyId)
    if (!listing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 })
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      listingId: propertyId,
      $or: [
        {
          startDate: { $lte: new Date(checkIn) },
          endDate: { $gte: new Date(checkIn) },
        },
        {
          startDate: { $lte: new Date(checkOut) },
          endDate: { $gte: new Date(checkOut) },
        },
        {
          startDate: { $gte: new Date(checkIn) },
          endDate: { $lte: new Date(checkOut) },
        },
      ],
    })

    if (conflictingBooking) {
      return NextResponse.json({ message: "Property is not available for selected dates" }, { status: 400 })
    }

    // Create booking
    const booking = await Booking.create({
      userId: decoded.userId,
      listingId: propertyId,
      startDate: new Date(checkIn),
      endDate: new Date(checkOut),
      guests,
      totalAmount: total,
      status: "confirmed",
    })

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    const bookings = await Booking.find({ userId: decoded.userId })
      .populate("listingId", "title location images price")
      .sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
