import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
}

interface PropertyReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export function PropertyReviews({ reviews, rating, reviewCount }: PropertyReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-current text-yellow-400" />
          <span className="text-2xl font-bold">{rating}</span>
        </div>
        <span className="text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                  <AvatarFallback>
                    {review.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{review.user}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Show all {reviewCount} reviews
      </Button>
    </div>
  )
}
