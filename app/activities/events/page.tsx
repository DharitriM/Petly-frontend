"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, Search, Filter, Heart, Share2 } from "lucide-react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Annual Dog Show & Competition",
    date: new Date(2024, 2, 15),
    time: "10:00 AM - 4:00 PM",
    location: "Pet City Convention Center",
    address: "123 Main St, Pet City, PC 12345",
    category: "Competition",
    petTypes: ["Dogs"],
    price: "Free",
    capacity: 200,
    registered: 156,
    image: "/placeholder.svg?height=200&width=300",
    description: "Join us for the biggest dog show of the year! Categories for all breeds and ages.",
    organizer: "Pet City Kennel Club",
    featured: true,
  },
  {
    id: 2,
    title: "Puppy Socialization Playdate",
    date: new Date(2024, 2, 20),
    time: "2:00 PM - 4:00 PM",
    location: "Sunny Park Dog Area",
    address: "456 Oak Ave, Pet City, PC 12345",
    category: "Social",
    petTypes: ["Dogs"],
    price: "₹10",
    capacity: 30,
    registered: 18,
    image: "/placeholder.svg?height=200&width=300",
    description: "Perfect for puppies 3-6 months old to socialize and play in a safe environment.",
    organizer: "Happy Tails Training",
    featured: false,
  },
  {
    id: 3,
    title: "Cat Adoption Fair",
    date: new Date(2024, 2, 22),
    time: "11:00 AM - 5:00 PM",
    location: "Pet City Mall",
    address: "789 Pine St, Pet City, PC 12345",
    category: "Adoption",
    petTypes: ["Cats"],
    price: "Free",
    capacity: 100,
    registered: 45,
    image: "/placeholder.svg?height=200&width=300",
    description: "Meet adorable cats and kittens looking for their forever homes.",
    organizer: "Feline Friends Rescue",
    featured: true,
  },
  {
    id: 4,
    title: "Pet Photography Workshop",
    date: new Date(2024, 2, 25),
    time: "1:00 PM - 3:00 PM",
    location: "Community Center",
    address: "321 Elm Dr, Pet City, PC 12345",
    category: "Educational",
    petTypes: ["Dogs", "Cats"],
    price: "₹25",
    capacity: 15,
    registered: 12,
    image: "/placeholder.svg?height=200&width=300",
    description: "Learn professional tips for photographing your pets like a pro!",
    organizer: "Pawsome Photography",
    featured: false,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPetType, setSelectedPetType] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesPetType = selectedPetType === "all" || event.petTypes.includes(selectedPetType)
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && event.price === "Free") ||
      (priceFilter === "paid" && event.price !== "Free")

    return matchesSearch && matchesCategory && matchesPetType && matchesPrice
  })

  const registerForEvent = (eventId: number) => {
    console.log("Registering for event:", eventId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Events & Activities</h1>
        <p className="text-gray-600">Discover fun events, competitions, and activities for you and your pet</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="featured">Featured Events</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Adoption">Adoption</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPetType} onValueChange={setSelectedPetType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pets</SelectItem>
                    <SelectItem value="Dogs">Dogs</SelectItem>
                    <SelectItem value="Cats">Cats</SelectItem>
                    <SelectItem value="Birds">Birds</SelectItem>
                    <SelectItem value="Rabbits">Rabbits</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free Events</SelectItem>
                    <SelectItem value="paid">Paid Events</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {event.featured && <Badge className="absolute top-2 left-2 bg-purple-600">Featured</Badge>}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {event.price}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.petTypes.map((petType, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {petType}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => registerForEvent(event.id)}
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? "Full" : "Register"}
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedPetType("all")
                  setPriceFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid md:grid-cols-2 gap-8">
            {events
              .filter((event) => event.featured)
              .map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">Featured Event</Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        {event.price}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>{event.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>
                          {event.registered}/{event.capacity}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">Organized by: {event.organizer}</p>

                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={() => registerForEvent(event.id)}>
                        Register Now
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events">
          <Card>
            <CardHeader>
              <CardTitle>My Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No events registered yet</p>
                <p>Your registered events will appear here</p>
                <Button className="mt-4">Browse Events</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
