"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ShoppingCart, Star, Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Premium Dog Toy Set",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "toys",
    petType: "dog",
    brand: "PetPlay",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Cozy Cat Bed",
    price: 49.99,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "home",
    petType: "cat",
    brand: "ComfyPet",
    inStock: true,
    badge: "New",
  },
  {
    id: 3,
    name: "Organic Dog Food",
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    petType: "dog",
    brand: "NaturalPet",
    inStock: true,
    badge: "Organic",
  },
  {
    id: 4,
    name: "Stylish Dog Collar",
    price: 19.99,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    petType: "dog",
    brand: "FashionPet",
    inStock: false,
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    price: 39.99,
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "toys",
    petType: "cat",
    brand: "CatFun",
    inStock: true,
  },
  {
    id: 6,
    name: "Pet Shampoo",
    price: 15.99,
    rating: 4.4,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "grooming",
    petType: "both",
    brand: "CleanPet",
    inStock: true,
  },
]

const categories = [
  { id: "toys", name: "Toys", count: 45 },
  { id: "food", name: "Food", count: 32 },
  { id: "accessories", name: "Accessories", count: 28 },
  { id: "home", name: "Home & Beds", count: 19 },
  { id: "grooming", name: "Grooming", count: 15 },
  { id: "health", name: "Health", count: 12 },
]

const petTypes = [
  { id: "dog", name: "Dogs", count: 89 },
  { id: "cat", name: "Cats", count: 67 },
  { id: "bird", name: "Birds", count: 23 },
  { id: "fish", name: "Fish", count: 18 },
]

const brands = [
  { id: "petplay", name: "PetPlay" },
  { id: "comfypet", name: "ComfyPet" },
  { id: "naturalpet", name: "NaturalPet" },
  { id: "fashionpet", name: "FashionPet" },
  { id: "catfun", name: "CatFun" },
  { id: "cleanpet", name: "CleanPet" },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPetType, setSelectedPetType] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesPetType = !selectedPetType || product.petType === selectedPetType || product.petType === "both"
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase())

    return matchesSearch && matchesCategory && matchesPetType && matchesBrand
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Products</h1>
        <p className="text-gray-600">Discover the best products for your furry friends</p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? "block" : "hidden"} space-y-6`}>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <span className="text-xs text-gray-500">({category.count})</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pet Type</h3>
            <div className="space-y-2">
              <Button
                variant={selectedPetType === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedPetType("")}
              >
                All Pets
              </Button>
              {petTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedPetType === type.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedPetType(type.id)}
                >
                  {type.name}
                  <span className="text-xs text-gray-500">({type.count})</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Brands</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <label htmlFor={brand.id} className="text-sm cursor-pointer">
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform cursor-pointer"
                    />
                  </Link>
                  {product.badge && <Badge className="absolute top-2 left-2 bg-red-500">{product.badge}</Badge>}
                  {!product.inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-purple-600 cursor-pointer">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm" disabled={!product.inStock}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("")
                  setSelectedPetType("")
                  setSelectedBrands([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
