"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Share2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock product data - in real app, this would come from API
const product = {
  id: 1,
  name: "Premium Dog Toy Set",
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviews: 124,
  description:
    "A complete set of premium dog toys designed to keep your furry friend entertained for hours. Made from safe, non-toxic materials that are durable and long-lasting.",
  features: [
    "Made from 100% safe, non-toxic materials",
    "Durable construction for long-lasting play",
    "Variety of textures and sounds to engage your pet",
    "Easy to clean and maintain",
    "Suitable for dogs of all sizes",
  ],
  specifications: {
    Material: "Natural Rubber & Cotton",
    Size: "Mixed sizes (Small to Large)",
    Weight: "1.2 lbs",
    Color: "Assorted Colors",
    "Age Range": "All Ages",
    Brand: "PetPlay",
  },
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  category: "toys",
  petType: "dog",
  brand: "PetPlay",
  inStock: true,
  stockCount: 15,
  badge: "Best Seller",
}

const relatedProducts = [
  {
    id: 2,
    name: "Interactive Puzzle Toy",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Rope Chew Toy",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Squeaky Ball Set",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", { productId: product.id, quantity, size: selectedSize })
  }

  const handleAddToWishlist = () => {
    // Add to wishlist logic
    console.log("Added to wishlist:", product.id)
  }

  const handleBuyNow = () => {
    // Redirect to checkout
    window.location.href = "/checkout"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={product?.images?.length > 0 ? product.images[selectedImage] : "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-96 object-cover"
            />
            {product.badge && <Badge className="absolute top-4 left-4 bg-red-500">{product.badge}</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-purple-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <Badge className="bg-green-100 text-green-800">
                Save ₹{(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                disabled={quantity >= product.stockCount}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">{product.stockCount} items available</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <Button className="w-full" size="lg" variant="secondary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over ₹50</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Quality Guarantee</p>
              <p className="text-xs text-gray-500">100% satisfaction</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-gray-500">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {/* Sample reviews */}
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-sm text-gray-500">Verified Purchase</span>
                  </div>
                  <p className="text-gray-600">
                    {"My dog absolutely loves these toys! Great quality and very durable. Highly recommended!"}
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Mike R.</span>
                    <span className="text-sm text-gray-500">Verified Purchase</span>
                  </div>
                  <p className="text-gray-600">
                    {"Good value for money. The toys are well-made and my pets enjoy them."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <Link href={`/products/${relatedProduct.id}`}>
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform cursor-pointer"
                  />
                </Link>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(relatedProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({relatedProduct.rating})</span>
                </div>
                <Link href={`/products/${relatedProduct.id}`}>
                  <h3 className="font-semibold mb-2 hover:text-purple-600 cursor-pointer">{relatedProduct.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">₹{relatedProduct.price}</span>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
