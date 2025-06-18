import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { Listing } from "@/models/Listing"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const guests = searchParams.get("guests")

    const query: any = {}

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.price.$lte = Number.parseInt(maxPrice)
    }

    if (guests) {
      query.guests = { $gte: Number.parseInt(guests) }
    }

    const listings = await Listing.find(query).populate("hostId", "name email").sort({ createdAt: -1 })

    return NextResponse.json(listings)
  } catch (error) {
    console.error("Get listings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

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

    const formData = await request.formData()

    const listingData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      price: Number.parseInt(formData.get("price") as string),
      guests: Number.parseInt(formData.get("guests") as string),
      bedrooms: Number.parseInt(formData.get("bedrooms") as string),
      bathrooms: Number.parseInt(formData.get("bathrooms") as string),
      propertyType: formData.get("propertyType") as string,
      amenities: JSON.parse(formData.get("amenities") as string),
      hostId: decoded.userId,
      images: [] as string[],
    }

    // Handle image uploads (in a real app, you'd upload to cloud storage)
    const imageFiles = []
    let index = 0
    while (formData.get(`image${index}`)) {
      imageFiles.push(formData.get(`image${index}`) as File)
      index++
    }

    // For demo purposes, we'll use placeholder URLs
    listingData.images = imageFiles.map((_, i) => `/placeholder.svg?height=400&width=600&text=Image${i + 1}`)

    const listing = await Listing.create(listingData)

    return NextResponse.json({
      message: "Listing created successfully",
      listing,
    })
  } catch (error) {
    console.error("Create listing error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
