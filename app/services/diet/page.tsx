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
import { Calculator, Heart, Utensils, Clock, Download, Share2 } from "lucide-react"

const dietPlans = [
  {
    id: 1,
    name: "Puppy Growth Plan",
    petType: "dog",
    ageRange: "2-12 months",
    description: "High-protein diet for growing puppies",
    calories: "400-800 per day",
    meals: 3,
    features: ["High Protein", "DHA for Brain Development", "Easy Digestion"],
  },
  {
    id: 2,
    name: "Adult Dog Maintenance",
    petType: "dog",
    ageRange: "1-7 years",
    description: "Balanced nutrition for active adult dogs",
    calories: "800-1200 per day",
    meals: 2,
    features: ["Balanced Nutrition", "Joint Support", "Healthy Weight"],
  },
  {
    id: 3,
    name: "Senior Dog Care",
    petType: "dog",
    ageRange: "7+ years",
    description: "Gentle nutrition for senior dogs",
    calories: "600-900 per day",
    meals: 2,
    features: ["Joint Support", "Easy Digestion", "Heart Health"],
  },
  {
    id: 4,
    name: "Kitten Growth Plan",
    petType: "cat",
    ageRange: "2-12 months",
    description: "Complete nutrition for growing kittens",
    calories: "200-400 per day",
    meals: 3,
    features: ["High Protein", "Taurine", "Small Kibble Size"],
  },
]

export default function DietPage() {
  const [petInfo, setPetInfo] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
    activityLevel: "",
    healthConditions: "",
  })
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setPetInfo((prev) => ({ ...prev, [field]: value }))
  }

  const generateDietPlan = () => {
    // Logic to generate custom diet plan
    console.log("Generating diet plan for:", petInfo)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Diet Planning</h1>
        <p className="text-gray-600">
          Create customized nutrition plans based on your pet's breed, age, and health needs
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Diet Calculator</TabsTrigger>
          <TabsTrigger value="plans">Pre-made Plans</TabsTrigger>
          <TabsTrigger value="tips">Nutrition Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pet Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Pet Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="petName">Pet Name</Label>
                  <Input
                    id="petName"
                    value={petInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your pet's name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petType">Pet Type</Label>
                    <Select value={petInfo.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="breed">Breed</Label>
                    <Input
                      id="breed"
                      value={petInfo.breed}
                      onChange={(e) => handleInputChange("breed", e.target.value)}
                      placeholder="e.g., Golden Retriever"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={petInfo.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="e.g., 2 years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      value={petInfo.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="e.g., 45"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={petInfo.activityLevel}
                    onValueChange={(value) => handleInputChange("activityLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Indoor, minimal exercise)</SelectItem>
                      <SelectItem value="moderate">Moderate (Daily walks, some play)</SelectItem>
                      <SelectItem value="high">High (Very active, lots of exercise)</SelectItem>
                      <SelectItem value="working">Working (Working dog, very high activity)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="healthConditions">Health Conditions (Optional)</Label>
                  <Textarea
                    id="healthConditions"
                    value={petInfo.healthConditions}
                    onChange={(e) => handleInputChange("healthConditions", e.target.value)}
                    placeholder="Any allergies, medical conditions, or dietary restrictions..."
                    rows={3}
                  />
                </div>

                <Button onClick={generateDietPlan} className="w-full" size="lg">
                  <Utensils className="w-4 h-4 mr-2" />
                  Generate Custom Diet Plan
                </Button>
              </CardContent>
            </Card>

            {/* Diet Plan Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Recommended Diet Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {petInfo.name ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">Diet Plan for {petInfo.name}</h3>
                      <p className="text-gray-600">Based on the information provided</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">850</div>
                        <div className="text-sm text-gray-600">Calories/Day</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">2</div>
                        <div className="text-sm text-gray-600">Meals/Day</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Recommended Foods</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-gray-50 rounded">
                          <span>High-Quality Dry Food</span>
                          <span className="font-medium">1.5 cups/day</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded">
                          <span>Wet Food (Optional)</span>
                          <span className="font-medium">0.5 can/day</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded">
                          <span>Healthy Treats</span>
                          <span className="font-medium">10% of calories</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Feeding Schedule</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span>Morning: 7:00 AM - 0.75 cups</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span>Evening: 6:00 PM - 0.75 cups</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Download Plan
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Plan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Utensils className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Fill out your pet's information to generate a custom diet plan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid md:grid-cols-2 gap-6">
            {dietPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all ${selectedPlan === plan.id ? "ring-2 ring-purple-500" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    <Badge variant="outline" className="capitalize">
                      {plan.petType}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Age Range:</span>
                      <span className="text-sm font-medium">{plan.ageRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Daily Calories:</span>
                      <span className="text-sm font-medium">{plan.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Meals per Day:</span>
                      <span className="text-sm font-medium">{plan.meals}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Select This Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>🐕 Dog Nutrition Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Feeding Guidelines</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Feed at consistent times daily</li>
                    <li>• Measure portions to prevent overfeeding</li>
                    <li>• Provide fresh water at all times</li>
                    <li>• Avoid feeding table scraps</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Foods to Avoid</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Chocolate and caffeine</li>
                    <li>• Grapes and raisins</li>
                    <li>• Onions and garlic</li>
                    <li>• Xylitol (artificial sweetener)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🐱 Cat Nutrition Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Feeding Guidelines</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Cats are obligate carnivores</li>
                    <li>• Provide multiple small meals</li>
                    <li>• Wet food helps with hydration</li>
                    <li>• Monitor weight regularly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Essential Nutrients</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Taurine (essential amino acid)</li>
                    <li>• Arachidonic acid</li>
                    <li>• Vitamin A</li>
                    <li>• High-quality protein</li>
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
