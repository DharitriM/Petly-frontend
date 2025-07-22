"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Clock, Star, Search, Filter, Navigation } from "lucide-react"

const hospitals = [
  {
    id: 1,
    name: "PetCare Emergency Hospital",
    address: "123 Main St, Pet City, PC 12345",
    phone: "(555) 123-4567",
    rating: 4.8,
    reviews: 245,
    distance: "0.5 miles",
    services: ["Emergency Care", "Surgery", "X-Ray", "Laboratory"],
    hours: "24/7",
    isEmergency: true,
    specialties: ["Dogs", "Cats", "Exotic Pets"],
  },
  {
    id: 2,
    name: "Happy Paws Veterinary Clinic",
    address: "456 Oak Ave, Pet City, PC 12345",
    phone: "(555) 234-5678",
    rating: 4.6,
    reviews: 189,
    distance: "1.2 miles",
    services: ["General Care", "Vaccinations", "Dental", "Grooming"],
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    isEmergency: false,
    specialties: ["Dogs", "Cats"],
  },
  {
    id: 3,
    name: "Animal Medical Center",
    address: "789 Pine St, Pet City, PC 12345",
    phone: "(555) 345-6789",
    rating: 4.9,
    reviews: 312,
    distance: "2.1 miles",
    services: ["Specialty Care", "Cardiology", "Oncology", "Neurology"],
    hours: "Mon-Sat: 7AM-8PM",
    isEmergency: true,
    specialties: ["Dogs", "Cats", "Birds", "Rabbits"],
  },
  {
    id: 4,
    name: "Countryside Veterinary Hospital",
    address: "321 Elm Dr, Pet City, PC 12345",
    phone: "(555) 456-7890",
    rating: 4.5,
    reviews: 156,
    distance: "3.5 miles",
    services: ["Farm Animals", "Large Animals", "Emergency Care"],
    hours: "24/7",
    isEmergency: true,
    specialties: ["Horses", "Cattle", "Dogs", "Cats"],
  },
]

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedService, setSelectedService] = useState("All Services")
  const [emergencyOnly, setEmergencyOnly] = useState(false)

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = selectedService === "All Services" || hospital.services.includes(selectedService)
    const matchesEmergency = !emergencyOnly || hospital.isEmergency

    return matchesSearch && matchesService && matchesEmergency
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Emergency Hospitals & Veterinary Clinics</h1>
        <p className="text-gray-600">Find the best veterinary care for your pet in your area</p>
      </div>

      {/* Emergency Banner */}
      <Card className="mb-8 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Pet Emergency?</h3>
              <p className="text-red-700">Call the nearest 24/7 emergency hospital immediately</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Phone className="w-4 h-4 mr-2" />
              Emergency Hotline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Services">All Services</SelectItem>
                <SelectItem value="Emergency Care">Emergency Care</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="General Care">General Care</SelectItem>
                <SelectItem value="Specialty Care">Specialty Care</SelectItem>
                <SelectItem value="Dental">Dental</SelectItem>
              </SelectContent>
            </Select>

            <Button variant={emergencyOnly ? "default" : "outline"} onClick={() => setEmergencyOnly(!emergencyOnly)}>
              <Filter className="w-4 h-4 mr-2" />
              24/7 Emergency Only
            </Button>

            <Button variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{hospital.name}</h3>
                    {hospital.isEmergency && <Badge className="bg-red-100 text-red-800">24/7 Emergency</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.address}</span>
                    <span className="text-purple-600 font-medium">• {hospital.distance}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hospital.rating}</span>
                      <span className="text-gray-500">({hospital.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{hospital.hours}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Button className="mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <p className="text-sm text-gray-600">{hospital.phone}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.services.map((service, index) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, index) => (
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
                <Button variant="outline">Book Appointment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hospitals found matching your criteria.</p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setSelectedService("All Services")
              setEmergencyOnly(false)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
