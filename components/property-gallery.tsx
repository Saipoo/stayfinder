"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
        <div className="col-span-2 row-span-2">
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Property main image"
            className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
            onClick={() => setIsGalleryOpen(true)}
          />
        </div>
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt={`Property image ${index + 2}`}
              className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition-all"
              onClick={() => setIsGalleryOpen(true)}
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button variant="secondary" onClick={() => setIsGalleryOpen(true)} className="gap-2">
                  <Grid3X3 className="h-4 w-4" />+{images.length - 5} photos
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <div className="relative h-full flex items-center justify-center">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={`Property image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
