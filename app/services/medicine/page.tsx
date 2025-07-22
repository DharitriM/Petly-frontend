"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plus, Pill, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"

const medications = [
  {
    id: 1,
    name: "Heartgard Plus",
    type: "Heartworm Prevention",
    dosage: "1 tablet",
    frequency: "Monthly",
    nextDue: new Date(2024, 2, 15),
    petName: "Buddy",
    notes: "Give with food",
    status: "active",
  },
  {
    id: 2,
    name: "Metacam",
    type: "Pain Relief",
    dosage: "0.5ml",
    frequency: "Daily",
    nextDue: new Date(2024, 1, 28),
    petName: "Luna",
    notes: "For arthritis",
    status: "active",
  },
  {
    id: 3,
    name: "Frontline Plus",
    type: "Flea & Tick Prevention",
    dosage: "1 application",
    frequency: "Monthly",
    nextDue: new Date(2024, 2, 10),
    petName: "Max",
    notes: "Apply between shoulder blades",
    status: "active",
  },
]

export default function MedicinePage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newMedication, setNewMedication] = useState({
    name: "",
    type: "",
    dosage: "",
    frequency: "",
    petName: "",
    notes: "",
    startDate: new Date(),
  })
  const [medicineList, setMedicineList] = useState(medications)

  const addMedication = () => {
    const newMed = {
      id: medicineList.length + 1,
      ...newMedication,
      nextDue: selectedDate || new Date(),
      status: "active",
    }
    setMedicineList([...medicineList, newMed])
    // Reset form
    setNewMedication({
      name: "",
      type: "",
      dosage: "",
      frequency: "",
      petName: "",
      notes: "",
      startDate: new Date(),
    })
    setSelectedDate(undefined)
  }

  const deleteMedication = (id: number) => {
    setMedicineList(medicineList.filter((med) => med.id !== id))
  }

  const getStatusColor = (nextDue: Date) => {
    const today = new Date()
    const diffTime = nextDue.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "bg-red-100 text-red-800"
    if (diffDays <= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getStatusText = (nextDue: Date) => {
    const today = new Date()
    const diffTime = nextDue.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due Today"
    if (diffDays <= 3) return `Due in ${diffDays} days`
    return `Due in ${diffDays} days`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Medicine Tracker & Planner</h1>
        <p className="text-gray-600">Keep track of your pet's medications, vaccinations, and treatment schedules</p>
      </div>

      <Tabs defaultValue="tracker" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracker">Medicine Tracker</TabsTrigger>
          <TabsTrigger value="add">Add Medication</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">Due Soon</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">Active</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </CardContent>
              </Card>
            </div>

            {/* Medications List */}
            <div className="space-y-4">
              {medicineList.map((medication) => (
                <Card key={medication.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Pill className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{medication.name}</h3>
                          <p className="text-gray-600 mb-2">{medication.type}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Pet: {medication.petName}</span>
                            <span>Dosage: {medication.dosage}</span>
                            <span>Frequency: {medication.frequency}</span>
                          </div>
                          {medication.notes && <p className="text-sm text-gray-600 mt-2">Note: {medication.notes}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(medication.nextDue)}>
                          {getStatusText(medication.nextDue)}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">Next: {format(medication.nextDue, "MMM dd, yyyy")}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteMedication(medication.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm">Mark Given</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medName">Medication Name</Label>
                    <Input
                      id="medName"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      placeholder="e.g., Heartgard Plus"
                    />
                  </div>

                  <div>
                    <Label htmlFor="medType">Type</Label>
                    <Select
                      value={newMedication.type}
                      onValueChange={(value) => setNewMedication({ ...newMedication, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heartworm">Heartworm Prevention</SelectItem>
                        <SelectItem value="flea-tick">Flea & Tick Prevention</SelectItem>
                        <SelectItem value="pain">Pain Relief</SelectItem>
                        <SelectItem value="antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="supplement">Supplement</SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                      placeholder="e.g., 1 tablet, 0.5ml"
                    />
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={newMedication.frequency}
                      onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="petName">Pet Name</Label>
                    <Input
                      id="petName"
                      value={newMedication.petName}
                      onChange={(e) => setNewMedication({ ...newMedication, petName: e.target.value })}
                      placeholder="e.g., Buddy"
                    />
                  </div>

                  <div>
                    <Label>Next Due Date</Label>
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
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={newMedication.notes}
                      onChange={(e) => setNewMedication({ ...newMedication, notes: e.target.value })}
                      placeholder="Special instructions, side effects to watch for, etc."
                      rows={3}
                    />
                  </div>

                  <Button onClick={addMedication} className="w-full" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Medication Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-4">
                    {selectedDate
                      ? `Medications for ${format(selectedDate, "MMMM dd, yyyy")}`
                      : "Select a date to view medications"}
                  </h3>
                  {selectedDate && (
                    <div className="space-y-3">
                      {medicineList
                        .filter((med) => format(med.nextDue, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
                        .map((medication) => (
                          <div key={medication.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{medication.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {medication.petName} - {medication.dosage}
                                </p>
                              </div>
                              <Badge variant="outline">{medication.frequency}</Badge>
                            </div>
                          </div>
                        ))}
                      {medicineList.filter(
                        (med) => format(med.nextDue, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
                      ).length === 0 && <p className="text-gray-500">No medications scheduled for this date.</p>}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
