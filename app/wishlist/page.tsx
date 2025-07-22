"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Trash2, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Dog Toy Set",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    category: "Toys",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Luxury Cat Tree",
    price: 89.99,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
    inStock: true,
    badge: "New",
  },
  {
    id: 3,
    name: "Organic Pet Treats",
    price: 19.99,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Food",
    inStock: false,
  },
  {
    id: 4,
    name: "Interactive Puzzle Feeder",
    price: 34.99,
    rating: 4.6,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Add to cart logic
    console.log("Added to cart:", id)
  }

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)
    // Add all in-stock items to cart
    console.log(
      "Moving to cart:",
      inStockItems.map((item) => item.id),
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save items you love for later by clicking the heart icon.</p>
          <Link href="/products">
            <Button size="lg">Explore Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600">{wishlistItems.length} items saved for later</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button onClick={moveAllToCart} disabled={!wishlistItems.some((item) => item.inStock)}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add All to Cart
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Wishlist
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-xl transition-shadow">
            <div className="relative overflow-hidden">
              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform cursor-pointer"
                />
              </Link>
              {item.badge && <Badge className="absolute top-2 left-2 bg-red-500">{item.badge}</Badge>}
              {!item.inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full p-2"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
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
                        i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({item.reviews})</span>
              </div>
              <Link href={`/products/${item.id}`}>
                <h3 className="font-semibold mb-2 hover:text-purple-600 cursor-pointer">{item.name}</h3>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-green-600">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" size="sm" onClick={() => addToCart(item.id)} disabled={!item.inStock}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
