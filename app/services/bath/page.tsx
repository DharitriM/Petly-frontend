"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Droplets, MapPin, Clock, Star, Phone } from "lucide-react"
import { format } from "date-fns"

const bathSchedules = [
  {
    id: 1,
    petName: "Buddy",
    petType: "dog",
    breed: "Golden Retriever",
    lastBath: new Date(2024, 1, 15),
    nextBath: new Date(2024, 2, 15),
    frequency: "Monthly",
    notes: "Use hypoallergenic shampoo",
  },
  {
    id: 2,
    petName: "Luna",
    petType: "cat",
    breed: "Persian",
    lastBath: new Date(2024, 1, 20),
    nextBath: new Date(2024, 3, 20),
    frequency: "Every 2 months",
    notes: "Very gentle, gets stressed easily",
  },
]

const groomingShops = [
  {
    id: 1,
    name: "Pampered Paws Grooming",
    address: "123 Main St, Pet City, PC 12345",
    phone: "(555) 123-4567",
    rating: 4.8,
    reviews: 156,
    services: ["Full Grooming", "Bath Only", "Nail Trimming", "Teeth Cleaning"],
    price: "₹45-85",
    hours: "Mon-Sat: 8AM-6PM",
    specialties: ["Dogs", "Cats"],
  },
  {
    id: 2,
    name: "Suds & Bubbles Pet Spa",
    address: "456 Oak Ave, Pet City, PC 12345",
    phone: "(555) 234-5678",
    rating: 4.9,
    reviews: 203,
    services: ["Luxury Spa", "Aromatherapy Bath", "De-shedding", "Flea Treatment"],
    price: "₹60-120",
    hours: "Tue-Sun: 9AM-7PM",
    specialties: ["Dogs", "Cats", "Small Animals"],
  },
  {
    id: 3,
    name: "Quick Clean Pet Wash",
    address: "789 Pine St, Pet City, PC 12345",
    phone: "(555) 345-6789",
    rating: 4.5,
    reviews: 89,
    services: ["Basic Bath", "Self-Service", "Express Grooming", "Nail Clipping"],
    price: "₹25-45",
    hours: "Daily: 7AM-9PM",
    specialties: ["Dogs", "Cats"],
  },
]

export default function BathPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newSchedule, setNewSchedule] = useState({
    petName: "",
    petType: "",
    breed: "",
    frequency: "",
    notes: "",
  })

  const addBathSchedule = () => {
    // Add new bath schedule logic
    console.log("Adding bath schedule:", newSchedule)
  }

  const getStatusColor = (nextBath: Date) => {
    const today = new Date()
    const diffTime = nextBath.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "bg-red-100 text-red-800"
    if (diffDays <= 7) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getStatusText = (nextBath: Date) => {
    const today = new Date()
    const diffTime = nextBath.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due Today"
    if (diffDays <= 7) return `Due in ${diffDays} days`
    return `Due in ${diffDays} days`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Bath Schedule & Grooming Services</h1>
        <p className="text-gray-600">
          Keep your pets clean and healthy with regular bathing schedules and professional grooming services
        </p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Bath Schedule</TabsTrigger>
          <TabsTrigger value="shops">Grooming Shops</TabsTrigger>
          <TabsTrigger value="tips">Bathing Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Schedules */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="w-5 h-5 mr-2" />
                    Current Bath Schedules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bathSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{schedule.petName}</h3>
                          <p className="text-gray-600">
                            {schedule.breed} • {schedule.petType}
                          </p>
                        </div>
                        <Badge className={getStatusColor(schedule.nextBath)}>{getStatusText(schedule.nextBath)}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Last Bath:</span>
                          <p className="font-medium">{format(schedule.lastBath, "MMM dd, yyyy")}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Next Bath:</span>
                          <p className="font-medium">{format(schedule.nextBath, "MMM dd, yyyy")}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Frequency:</span>
                          <p className="font-medium">{schedule.frequency}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Notes:</span>
                          <p className="font-medium">{schedule.notes}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">Mark as Bathed</Button>
                        <Button size="sm" variant="outline">
                          Edit Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Add New Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Bath Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="petName">Pet Name</Label>
                  <Input
                    id="petName"
                    value={newSchedule.petName}
                    onChange={(e) => setNewSchedule({ ...newSchedule, petName: e.target.value })}
                    placeholder="Enter pet name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petType">Pet Type</Label>
                    <Select
                      value={newSchedule.petType}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, petType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="breed">Breed</Label>
                    <Input
                      id="breed"
                      value={newSchedule.breed}
                      onChange={(e) => setNewSchedule({ ...newSchedule, breed: e.target.value })}
                      placeholder="Enter breed"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequency">Bath Frequency</Label>
                  <Select
                    value={newSchedule.frequency}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="bi-monthly">Every 2 months</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="as-needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Next Bath Date</Label>
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

                <Button onClick={addBathSchedule} className="w-full">
                  Add Bath Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shops">
          <div className="space-y-6">
            {groomingShops.map((shop) => (
              <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{shop.address}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{shop.rating}</span>
                          <span className="text-gray-500">({shop.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{shop.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button className="mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <p className="text-sm text-gray-600">{shop.phone}</p>
                      <p className="text-sm font-medium text-green-600">{shop.price}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.services.map((service, index) => (
                          <Badge key={index} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Specializes In</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline">View Details</Button>
                    <Button>Book Appointment</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>🐕 Dog Bathing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Before the Bath</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Brush thoroughly to remove loose fur</li>
                    <li>• Trim nails if needed</li>
                    <li>• Use cotton balls in ears to prevent water entry</li>
                    <li>• Gather all supplies beforehand</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">During the Bath</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Use lukewarm water</li>
                    <li>• Wet from neck down, avoid the head initially</li>
                    <li>• Use dog-specific shampoo</li>
                    <li>• Rinse thoroughly to prevent skin irritation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">After the Bath</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Towel dry immediately</li>
                    <li>• Use blow dryer on cool setting if tolerated</li>
                    <li>• Brush again once dry</li>
                    <li>• Give treats and praise</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🐱 Cat Bathing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Preparation</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Trim nails before bathing</li>
                    <li>• Choose a quiet, warm room</li>
                    <li>• Have towels ready</li>
                    <li>• Consider using a non-slip mat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Bathing Process</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Use shallow water (2-3 inches)</li>
                    <li>• Speak in calm, soothing tones</li>
                    <li>• Work quickly but gently</li>
                    <li>• Avoid getting water in ears and eyes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Special Considerations</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Most cats don't need frequent baths</li>
                    <li>• Long-haired cats may need more frequent bathing</li>
                    <li>• Consider waterless shampoos for anxious cats</li>
                    <li>• Reward with treats after bathing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
