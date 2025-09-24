"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, Edit, Save, X, Plus, Trash2, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pets: [{
      name: "",
      type: "",
      breed: "",
      age: "",
    }],
    hasPets: "no",
    interests: [],
    newsletter: false,
    membershipLevel: "Basic",
    joinDate: "",
  })

  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "65 lbs",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      breed: "Persian",
      age: "2 years",
      weight: "8 lbs",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "1 year",
      weight: "6 lbs",
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    petReminders: true,
    eventUpdates: true,
  })

const handleSave = async () => {
  setIsEditing(false)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("User not found:", userError)
    return
  }

  const updates = {
    first_name: profileData.firstName,
    last_name: profileData.lastName,
    phone: profileData.phone,
    has_pets: profileData.hasPets === "yes",
    pets: profileData.hasPets === "yes" ? pets : [],
    preferences,
  }

  const { error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", user.id)

  if (error) {
    console.error("Error saving profile:", error)
  } else {
    console.log("Profile updated:", updates)
  }
}

  const handleAddPet = () => {
    const newPet = {
      id: pets.length + 1,
      name: "",
      type: "",
      breed: "",
      age: "",
      weight: "",
      image: "/placeholder.svg?height=80&width=80",
    }
    setPets([...pets, newPet])
  }

  const handleRemovePet = (id: number) => {
    setPets(pets.filter((pet) => pet.id !== id))
  }

  useEffect(() => {
  const fetchUserProfile = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found or error:", userError);
      return;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      const initialProfileData = {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: user.email || "",
        phone: data.phone || "",
        hasPets: data.has_pets ? "yes" : "no",
        pets: data.pets || [],
        interests: data.interests ? data.interests : [],
        newsletter: data.newsletter || false,
        membershipLevel: data.membership_level || "Basic",
        joinDate: new Date(data.created_at).toLocaleDateString(),
      };
      setProfileData(initialProfileData);

      if (data.pets && data.has_pets) {
        setPets(data.pets)
      } else {
        setPets([])
      }

      if (data.preferences) {
        setPreferences(data.preferences);
      }
    }
  };

  fetchUserProfile();
}, []);


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and pet information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="pets">My Pets</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {profileData.membershipLevel} Member
                    </Badge>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined {profileData.joinDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Member since {profileData.joinDate}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="space-y-2">
  <Label htmlFor="firstName">First Name</Label>
  <Input
    id="firstName"
    value={profileData.firstName}
    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
    disabled={!isEditing}
  />
</div>

<div className="space-y-2">
  <Label htmlFor="lastName">Last Name</Label>
  <Input
    id="lastName"
    value={profileData.lastName}
    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
    disabled={!isEditing}
  />
</div>

                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div> */}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pets" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Pets</CardTitle>
                <CardDescription>Manage your pet profiles and information</CardDescription>
              </div>
              <Button onClick={handleAddPet} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Pet
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {pets.map((pet, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={pet.image || "/placeholder.svg"} />
                        <AvatarFallback>{pet.name.charAt(0) || "P"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">Name</Label>
                          <Input
                            value={pet.name}
                            onChange={(e) => {
                              const updatedPets = pets.map((p) =>
                                p.id === pet.id ? { ...p, name: e.target.value } : p,
                              )
                              setPets(updatedPets)
                            }}
                            placeholder="Pet name"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">Type</Label>
                          <Select
                            value={pet.type}
                            onValueChange={(value) => {
                              const updatedPets = pets.map((p) => (p.id === pet.id ? { ...p, type: value } : p))
                              setPets(updatedPets)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" >{pet.type}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dog">Dog</SelectItem>
                              <SelectItem value="Cat">Cat</SelectItem>
                              <SelectItem value="Bird">Bird</SelectItem>
                              <SelectItem value="Fish">Fish</SelectItem>
                              <SelectItem value="Rabbit">Rabbit</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">Breed</Label>
                          <Input
                            value={pet.breed}
                            onChange={(e) => {
                              const updatedPets = pets.map((p) =>
                                p.id === pet.id ? { ...p, breed: e.target.value } : p,
                              )
                              setPets(updatedPets)
                            }}
                            placeholder="Breed"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">Age</Label>
                          <Input
                            value={pet.age}
                            onChange={(e) => {
                              const updatedPets = pets.map((p) => (p.id === pet.id ? { ...p, age: e.target.value } : p))
                              setPets(updatedPets)
                            }}
                            placeholder="Age"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePet(pet.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive order updates and important announcements</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Get text messages for urgent updates</p>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive promotional offers and new product updates</p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pet Care Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminders for vet appointments, grooming, etc.</p>
                  </div>
                  <Switch
                    checked={preferences.petReminders}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, petReminders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Event Updates</Label>
                    <p className="text-sm text-gray-500">Stay informed about local pet events and activities</p>
                  </div>
                  <Switch
                    checked={preferences.eventUpdates}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, eventUpdates: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Change Password</Label>
                  <p className="text-sm text-gray-500 mb-4">Update your password to keep your account secure</p>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button className="w-full md:w-auto">Update Password</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-base font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <Separator />
                <div>
                  <Label className="text-base font-medium">Account Deletion</Label>
                  <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
