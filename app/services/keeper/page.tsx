"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Users, Star, MapPin, Heart, Shield, Award } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

const petKeepers = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    reviews: 127,
    experience: "5 years",
    location: "Downtown Pet City",
    distance: "1.2 miles",
    services: ["Pet Sitting", "Dog Walking", "Overnight Care", "Pet Taxi"],
    specialties: ["Dogs", "Cats", "Senior Pets"],
    price: "$25-45/day",
    availability: "Available",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    description:
      "Experienced pet sitter with a passion for animal care. I provide loving, reliable care for your furry family members.",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    rating: 4.8,
    reviews: 89,
    experience: "3 years",
    location: "Westside Pet City",
    distance: "2.1 miles",
    services: ["Dog Walking", "Pet Sitting", "Playtime", "Basic Training"],
    specialties: ["Dogs", "Puppies", "Active Breeds"],
    price: "$20-35/day",
    availability: "Available",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    description:
      "Active dog lover specializing in high-energy breeds. I ensure your pets get the exercise and attention they need.",
  },
  {
    id: 3,
    name: "Emma Thompson",
    rating: 4.7,
    reviews: 156,
    experience: "7 years",
    location: "Eastside Pet City",
    distance: "3.5 miles",
    services: ["Pet Sitting", "Overnight Care", "Medication Administration", "Special Needs Care"],
    specialties: ["Cats", "Senior Pets", "Medical Care"],
    price: "$30-50/day",
    availability: "Busy until March 15",
    image: "/placeholder.svg?height=100&width=100",
    verified: true,
    description:
      "Certified veterinary assistant offering specialized care for pets with medical needs and senior animals.",
  },
]

export default function KeeperPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [bookingForm, setBookingForm] = useState({
    petName: "",
    petType: "",
    serviceType: "",
    duration: "",
    specialInstructions: "",
    emergencyContact: "",
  })

  const handleBooking = () => {
    console.log("Booking pet keeper:", bookingForm)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Keeper Services</h1>
        <p className="text-gray-600">Find trusted pet sitters, dog walkers, and caregivers for when you're away</p>
      </div>

      <Tabs defaultValue="keepers" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keepers">Find Pet Keepers</TabsTrigger>
          <TabsTrigger value="book">Book Service</TabsTrigger>
          <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="keepers">
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <Input placeholder="Search by name or location..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sitting">Pet Sitting</SelectItem>
                      <SelectItem value="walking">Dog Walking</SelectItem>
                      <SelectItem value="overnight">Overnight Care</SelectItem>
                      <SelectItem value="daycare">Daycare</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dogs</SelectItem>
                      <SelectItem value="cat">Cats</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 mile</SelectItem>
                      <SelectItem value="3">Within 3 miles</SelectItem>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pet Keepers List */}
            <div className="space-y-6">
              {petKeepers.map((keeper) => (
                <Card key={keeper.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative">
                        <Image
                          src={keeper.image || "/placeholder.svg"}
                          alt={keeper.name}
                          width={100}
                          height={100}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        {keeper.verified && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold">{keeper.name}</h3>
                              {keeper.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                            </div>
                            <div className="flex items-center gap-4 text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{keeper.rating}</span>
                                <span>({keeper.reviews} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                <span>{keeper.experience} experience</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>
                                  {keeper.location} • {keeper.distance}
                                </span>
                              </div>
                              <Badge variant={keeper.availability === "Available" ? "default" : "secondary"}>
                                {keeper.availability}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600 mb-2">{keeper.price}</p>
                            <Button>Contact</Button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{keeper.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Services</h4>
                            <div className="flex flex-wrap gap-2">
                              {keeper.services.map((service, index) => (
                                <Badge key={index} variant="outline">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Specializes In</h4>
                            <div className="flex flex-wrap gap-2">
                              {keeper.specialties.map((specialty, index) => (
                                <Badge key={index} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <Button variant="outline">View Profile</Button>
                          <Button variant="outline">
                            <Heart className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button>Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="book">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Book Pet Keeper Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="petName">Pet Name</Label>
                  <Input
                    id="petName"
                    value={bookingForm.petName}
                    onChange={(e) => setBookingForm({ ...bookingForm, petName: e.target.value })}
                    placeholder="Enter your pet's name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petType">Pet Type</Label>
                    <Select
                      value={bookingForm.petType}
                      onValueChange={(value) => setBookingForm({ ...bookingForm, petType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={bookingForm.serviceType}
                      onValueChange={(value) => setBookingForm({ ...bookingForm, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sitting">Pet Sitting</SelectItem>
                        <SelectItem value="walking">Dog Walking</SelectItem>
                        <SelectItem value="overnight">Overnight Care</SelectItem>
                        <SelectItem value="daycare">Daycare</SelectItem>
                        <SelectItem value="taxi">Pet Taxi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Service Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={bookingForm.duration}
                    onValueChange={(value) => setBookingForm({ ...bookingForm, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 Hour</SelectItem>
                      <SelectItem value="2-hours">2 Hours</SelectItem>
                      <SelectItem value="half-day">Half Day (4 hours)</SelectItem>
                      <SelectItem value="full-day">Full Day (8 hours)</SelectItem>
                      <SelectItem value="overnight">Overnight</SelectItem>
                      <SelectItem value="weekend">Weekend</SelectItem>
                      <SelectItem value="week">1 Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={bookingForm.emergencyContact}
                    onChange={(e) => setBookingForm({ ...bookingForm, emergencyContact: e.target.value })}
                    placeholder="Emergency contact number"
                  />
                </div>

                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={bookingForm.specialInstructions}
                    onChange={(e) => setBookingForm({ ...bookingForm, specialInstructions: e.target.value })}
                    placeholder="Any special care instructions, feeding schedule, medications, etc."
                    rows={4}
                  />
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Request Booking
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingForm.petName ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Service Request for {bookingForm.petName}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Pet Type:</span>
                          <span className="capitalize">{bookingForm.petType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="capitalize">{bookingForm.serviceType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{bookingForm.duration}</span>
                        </div>
                        {selectedDate && (
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{format(selectedDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">What happens next?</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        <li>We'll match you with available pet keepers</li>
                        <li>You'll receive profiles and can choose your preferred keeper</li>
                        <li>Meet & greet session (recommended)</li>
                        <li>Confirm booking and payment</li>
                        <li>Enjoy peace of mind while your pet is cared for</li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Fill out the form to see your booking summary</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-bookings">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No bookings yet</p>
                <p>Your pet keeper bookings will appear here</p>
                <Button className="mt-4">Book Your First Service</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
