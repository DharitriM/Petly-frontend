"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import { Product } from "@/lib/interfaces/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";

export default function ProductDetailPage() {
  const dispatch = useDispatch()
  const { products } = useSelector((state: RootState) => state.product)
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const relatedProducts = products
    .filter((p) => p.id !== id && (p.category?.id === product.category?.id || p.brand?.id === product.brand?.id))
    .slice(0, 3);


  // Fetch product data based on ID
  async function fetchProduct() {
    try {
      setLoading(true);
      const res = await fetch("/api/products/" + id);
      const data = await res.json();
      if (data) setProduct(data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      toast.error("Error fetching products", err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity, size: selectedSize }));
    toast.success("Added to cart");
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist");
  };

  const handleBuyNow = () => {
    // Redirect to checkout
    window.location.href = "/checkout";
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  console.log({ product });

  if (loading) return <Loader />;

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
          <span className="text-gray-900">{product?.name}</span>
        </div>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={
                product?.images?.length > 0
                  ? product?.images[selectedImage]
                  : "/placeholder.svg"
              }
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-96 object-cover"
            />
            {/* {product.badge && (
              <Badge className="absolute top-4 left-4 bg-red-500">
                {product.badge}
              </Badge>
            )} */}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-purple-500"
                    : "border-gray-200"
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
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} 
                  {/* ({product.reviews} reviews) */}
                </span>
              </div>
              <Badge variant="outline">{product.brand?.name}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-xl text-gray-500 line-through">
                ₹{product.original_price}
              </span>
            )}
            {product.original_price && (
              <Badge className="bg-green-100 text-green-800">
                Save ₹{(product.original_price - product.price).toFixed(2)}
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
                onClick={() =>
                  setQuantity(Math.min(product.quantity, quantity + 1))
                }
                disabled={quantity >= product.quantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {product.quantity} items available
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
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
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              onClick={handleBuyNow}
            >
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

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews_count || 2})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
             <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed mb-6">
                {product.description || "No description available for this product."}
              </p>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>High quality material safe for pets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Durable and long-lasting design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Easy to clean and maintain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Perfect for {product.pet_type?.name || "all pets"}</span>
                  </li>
              </ul>
            </CardContent> 
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Product Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Brand:</span>
                    <span className="text-gray-600">{product.brand?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Category:</span>
                    <span className="text-gray-600">{product.category?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Pet Type:</span>
                    <span className="text-gray-600">{product.pet_type?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Weight:</span>
                    <span className="text-gray-600">{product.weight ? `${product.weight} kg` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Dimensions:</span>
                    <span className="text-gray-600">{product.dimensions || "N/A"}</span>
                  </div>
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
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-sm text-gray-500">
                      Verified Purchase
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {
                      "My pet absolutely loves this! Great quality and very durable. Highly recommended!"
                    }
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Mike R.</span>
                    <span className="text-sm text-gray-500">
                      Verified Purchase
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {
                      "Good value for money. The product is well-made and my pets enjoy it."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden">
                <Link href={`/products/${relatedProduct.id}`}>
                  <Image
                    src={relatedProduct.images?.[0] || "/placeholder.svg"}
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
                          i < Math.floor(relatedProduct.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({relatedProduct.rating})
                  </span>
                </div>
                <Link href={`/products/${relatedProduct.id}`}>
                  <h3 className="font-semibold mb-2 hover:text-purple-600 cursor-pointer">
                    {relatedProduct.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ₹{relatedProduct.price}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => {
                    dispatch(addToCart({ product: relatedProduct, quantity: 1 }));
                    toast.success("Added to cart");
                  }}>
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
