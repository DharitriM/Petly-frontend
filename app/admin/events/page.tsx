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
import { Search, Plus, Edit, Trash2, Calendar } from "lucide-react"

const initialEvents = [
  {
    id: 1,
    title: "Annual Dog Show & Competition",
    date: "2024-07-15",
    time: "10:00 AM - 4:00 PM",
    location: "Pet City Convention Center",
    category: "Competition",
    capacity: 200,
    registered: 156,
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Puppy Socialization Playdate",
    date: "2024-07-20",
    time: "2:00 PM - 4:00 PM",
    location: "Sunny Park Dog Area",
    category: "Social",
    capacity: 30,
    registered: 18,
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Cat Adoption Fair",
    date: "2024-07-22",
    time: "11:00 AM - 5:00 PM",
    location: "Pet City Mall",
    category: "Adoption",
    capacity: 100,
    registered: 45,
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Pet Photography Workshop",
    date: "2024-06-25",
    time: "1:00 PM - 3:00 PM",
    location: "Community Center",
    category: "Educational",
    capacity: 15,
    registered: 15,
    status: "Completed",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "Competition",
    capacity: 0,
    status: "Upcoming",
    description: "",
  })

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return

    const newId = Math.max(...events.map((event) => event.id)) + 1
    const eventToAdd = {
      id: newId,
      ...newEvent,
      registered: 0,
    }

    setEvents([...events, eventToAdd])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "Competition",
      capacity: 0,
      status: "Upcoming",
      description: "",
    })
    setIsAddingEvent(false)
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-gray-600">Manage your pet events and activities</p>
        </div>
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  placeholder="e.g. 10:00 AM - 2:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Adoption">Adoption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newEvent.capacity || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, capacity: Number.parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4 col-span-2">
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Create Event</Button>
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.registered}/{event.capacity} registered
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
