import { SearchBar } from "@/components/search-bar"

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
        }}
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Stay</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Discover unique places to stay around the world</p>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  )
}
