"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { setProducts } from "@/store/slices/productSlice";
import { Product } from "@/lib/interfaces/product";
import { Category } from "@/lib/interfaces/category";
import { pet_type } from "@/lib/interfaces/pet_type";
import { brand } from "@/lib/interfaces/brand";
import {
  fetchBrands,
  fetchCategories,
  fetchPetTypes,
  fetchProducts,
  fetchUsers,
} from "@/lib/apiUtils";
import { RootState } from "@/store";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.product.products);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const petTypes = useSelector((state: RootState) => state.petType.petTypes);
  const brands = useSelector((state: RootState) => state.brand.brands);

  useEffect(() => {
    fetchUsers(dispatch);
    fetchProducts(dispatch);
    fetchCategories(dispatch);
    fetchBrands(dispatch);
    fetchPetTypes(dispatch);
  }, [dispatch]);

  const productList = Array.isArray(products) ? products : products || [];

  const featuredProducts =
    productList.length > 0 && searchTerm
      ? productList.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : productList.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="p-2 align-middle font-mono text-xl bg-white/20 text-white border-white/30 hover:bg-pink-200 hover:text-purple-800 border-2">
                🐾Welcome to PetLy
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Everything Your Pet Needs, All in One Place
              </h1>
              <p className="text-xl opacity-90">
                From premium food to cozy beds, toys to healthcare - discover
                the best products and services for your furry friends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Explore Services
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm opacity-80">Happy Pets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                // src="/hero.jpg?height=600&width=600"
                // src="/heroBlueBg.jpg?height=600&width=600"
                src="/1.jpg?height=600&width=600"
                alt="Happy pets"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-2 -right-[-7rem] bg-yellow-400 text-black p-4 rounded-full animate-bounce">
                <span className="text-2xl">🐕</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 text-white p-4 rounded-full animate-bounce">
                <span className="text-2xl">🐱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Free Delivery</h3>
              <p className="text-gray-600">Free shipping on orders over ₹300</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guaranteed</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-gray-600">
                Always here to help you and your pet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pet Categories</h2>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              <b>Petly</b> serves for these pet categories
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {petTypes?.length > 0 &&
              petTypes.map((pet: pet_type, index: number) => (
                <Link
                  key={index}
                  href={`/products?category=${pet?.name?.toLowerCase()}`}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group w-40 h-40 flex items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center text-center pb-3">
                      <div className="my-4 group-hover:scale-110 transition-transform">
                        <Image
                          src={pet?.image_url || "/placeholder.svg"}
                          alt={pet.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                      <h3 className="font-semibold mb-1">{pet.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Find exactly what your pet needs
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.length > 0 &&
              categories.map((category: Category, index: number) => (
                <Link
                  key={index}
                  href={`/products?category=${category.name.toLowerCase()}`}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group w-60 h-55 flex items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center text-center pb-3">
                      <div className="my-4 group-hover:scale-110 transition-transform">
                        <Image
                          src={category?.image_url || "/placeholder.svg"}
                          alt={category.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.product_count}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Brands</h2>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Trusted Brands
            </p>
          </div>
          <div className="overflow-hidden relative">
            <div className="flex animate-marquee gap-2">
              {[...brands, ...brands].map((brand: brand, index: number) => (
                <div
                  key={index}
                  className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md group"
                >
                  <Image
                    src={brand.logo_url || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Handpicked favorites for your furry friends
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.length > 0 ? (
              featuredProducts.map((product: Product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-shadow"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        product?.images?.length > 0
                          ? product.images[0]
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2"
                      >
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
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {/* <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span> */}
                    </div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <h5 className="mb-2 text-gray-600">
                      {product.brand?.name}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">
                        ₹{product.price}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.original_price}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-4">
                <p className="text-gray-600 text-center">
                  No featured products found 😞
                </p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/products")}
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">Complete care for your beloved pets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="font-semibold mb-2">Emergency Care</h3>
              <p className="text-sm text-gray-600">
                24/7 veterinary emergency services
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold mb-2">Diet Planning</h3>
              <p className="text-sm text-gray-600">
                Customized nutrition plans
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-sm text-gray-600">Professional pet training</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛁</span>
              </div>
              <h3 className="font-semibold mb-2">Grooming</h3>
              <p className="text-sm text-gray-600">
                Professional grooming services
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-80">
            Get the latest pet care tips, product updates, and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4 items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
