const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/stayfinder"

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa", // password123
    isHost: true,
    verified: true,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa", // password123
    isHost: false,
    verified: true,
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa", // password123
    isHost: true,
    verified: true,
  },
]

const sampleListings = [
  {
    title: "Luxury Beachfront Villa",
    description:
      "Experience luxury living in this stunning beachfront villa with panoramic ocean views. This property features modern amenities, spacious rooms, and direct beach access.",
    location: "Malibu, California",
    price: 450,
    images: [
      "/placeholder.svg?height=400&width=600&text=Villa1",
      "/placeholder.svg?height=400&width=600&text=Villa2",
      "/placeholder.svg?height=400&width=600&text=Villa3",
    ],
    propertyType: "villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Air Conditioning"],
    coordinates: { lat: 34.0259, lng: -118.7798 },
    rating: 4.9,
    reviewCount: 127,
    isActive: true,
  },
  {
    title: "Cozy Mountain Cabin",
    description:
      "Escape to this charming mountain cabin surrounded by nature. Perfect for a peaceful retreat with modern comforts and stunning mountain views.",
    location: "Aspen, Colorado",
    price: 280,
    images: [
      "/placeholder.svg?height=400&width=600&text=Cabin1",
      "/placeholder.svg?height=400&width=600&text=Cabin2",
      "/placeholder.svg?height=400&width=600&text=Cabin3",
    ],
    propertyType: "cabin",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Fireplace", "Kitchen", "Hot Tub"],
    coordinates: { lat: 39.1911, lng: -106.8175 },
    rating: 4.8,
    reviewCount: 89,
    isActive: true,
  },
  {
    title: "Modern City Apartment",
    description:
      "Stylish apartment in the heart of the city with all modern amenities. Walking distance to restaurants, shops, and attractions.",
    location: "New York, NY",
    price: 180,
    images: [
      "/placeholder.svg?height=400&width=600&text=Apartment1",
      "/placeholder.svg?height=400&width=600&text=Apartment2",
      "/placeholder.svg?height=400&width=600&text=Apartment3",
    ],
    propertyType: "apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Gym", "Kitchen", "Balcony"],
    coordinates: { lat: 40.7128, lng: -74.006 },
    rating: 4.7,
    reviewCount: 203,
    isActive: true,
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("listings").deleteMany({})
    await db.collection("bookings").deleteMany({})

    console.log("Cleared existing data")

    // Insert users
    const userResult = await db.collection("users").insertMany(sampleUsers)
    console.log(`Inserted ${userResult.insertedCount} users`)

    // Get user IDs for listings
    const users = await db.collection("users").find({ isHost: true }).toArray()

    // Add hostId to listings
    const listingsWithHosts = sampleListings.map((listing, index) => ({
      ...listing,
      hostId: users[index % users.length]._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    // Insert listings
    const listingResult = await db.collection("listings").insertMany(listingsWithHosts)
    console.log(`Inserted ${listingResult.insertedCount} listings`)

    // Create some sample bookings
    const listings = await db.collection("listings").find().toArray()
    const guestUser = await db.collection("users").findOne({ isHost: false })

    const sampleBookings = [
      {
        userId: guestUser._id,
        listingId: listings[0]._id,
        startDate: new Date("2024-03-15"),
        endDate: new Date("2024-03-20"),
        guests: 2,
        totalAmount: 2250,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: guestUser._id,
        listingId: listings[1]._id,
        startDate: new Date("2024-04-10"),
        endDate: new Date("2024-04-15"),
        guests: 4,
        totalAmount: 1400,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const bookingResult = await db.collection("bookings").insertMany(sampleBookings)
    console.log(`Inserted ${bookingResult.insertedCount} bookings`)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
