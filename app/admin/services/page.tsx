"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

const initialServices = [
  {
    id: 1,
    name: "Veterinary Services",
    category: "Medical",
    price: 50,
    duration: 30,
    status: "Active",
    bookings: 45,
  },
  {
    id: 2,
    name: "Pet Grooming",
    category: "Grooming",
    price: 35,
    duration: 60,
    status: "Active",
    bookings: 32,
  },
  {
    id: 3,
    name: "Pet Training",
    category: "Training",
    price: 40,
    duration: 45,
    status: "Active",
    bookings: 28,
  },
  {
    id: 4,
    name: "Pet Walking",
    category: "Care",
    price: 15,
    duration: 30,
    status: "Active",
    bookings: 67,
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingService, setIsAddingService] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    category: "Medical",
    price: 0,
    duration: 30,
    status: "Active",
    description: "",
  })

  const filteredServices = services.filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddService = () => {
    if (!newService.name || newService.price <= 0) return

    const newId = Math.max(...services.map((service) => service.id)) + 1
    const serviceToAdd = {
      id: newId,
      ...newService,
      bookings: 0,
    }

    setServices([...services, serviceToAdd])
    setNewService({
      name: "",
      category: "Medical",
      price: 0,
      duration: 30,
      status: "Active",
      description: "",
    })
    setIsAddingService(false)
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-gray-600">Manage your pet services</p>
        </div>
        <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Enter service name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newService.category}
                    onValueChange={(value) => setNewService({ ...newService, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Grooming">Grooming</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Care">Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price || ""}
                    onChange={(e) => setNewService({ ...newService, price: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newService.duration || ""}
                  onChange={(e) => setNewService({ ...newService, duration: Number.parseInt(e.target.value) || 0 })}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Enter service description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingService(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddService}>Add Service</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Service</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Bookings</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{service.name}</td>
                    <td className="py-3 px-4">{service.category}</td>
                    <td className="py-3 px-4 font-medium">${service.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{formatDuration(service.duration)}</td>
                    <td className="py-3 px-4">{service.bookings}</td>
                    <td className="py-3 px-4">
                      <Badge variant={service.status === "Active" ? "default" : "secondary"}>{service.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
