import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Listing } from "@/models/Listing"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const listing = await Listing.findById(params.id).populate("hostId", "name email createdAt")

    if (!listing) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 })
    }

    return NextResponse.json(listing)
  } catch (error) {
    console.error("Get listing error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
