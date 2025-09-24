"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ShoppingCart, Star, Filter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/slices/productSlice";
import { toast } from "sonner";

const categories = [
  { id: "toys", name: "Toys", count: 45 },
  { id: "food", name: "Food", count: 32 },
  { id: "accessories", name: "Accessories", count: 28 },
  { id: "home", name: "Home & Beds", count: 19 },
  { id: "grooming", name: "Grooming", count: 15 },
  { id: "health", name: "Health", count: 12 },
];

const petTypes = [
  { id: "dog", name: "Dogs", count: 89 },
  { id: "cat", name: "Cats", count: 67 },
  { id: "bird", name: "Birds", count: 23 },
  { id: "fish", name: "Fish", count: 18 },
];

const brands = [
  { id: "petplay", name: "PetPlay" },
  { id: "comfypet", name: "ComfyPet" },
  { id: "naturalpet", name: "NaturalPet" },
  { id: "fashionpet", name: "FashionPet" },
  { id: "catfun", name: "CatFun" },
  { id: "cleanpet", name: "CleanPet" },
];

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const products = useSelector((state: RootState) => state.product.products);
  console.log({ products });
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category?.id === selectedCategory;
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product?.brand?.id ? product.brand.id : "");
    const matchesPetType =
      !selectedPetType || product.pet_type?.id === selectedPetType;
    return matchesSearch && matchesCategory && matchesBrand && matchesPetType;
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        dispatch(setProducts(data.products));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      default:
        return 0;
    }
  });

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Products</h1>
        <p className="text-gray-600">
          Discover the best products for your furry friends
        </p>
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
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div
          className={`lg:block ${showFilters ? "block" : "hidden"} space-y-6`}
        >
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
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <span className="text-xs text-gray-500">
                    ({category.count})
                  </span>
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
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.id, checked as boolean)
                    }
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
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={
                        product?.images?.length > 0
                          ? product.images[0]
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform cursor-pointer"
                    />
                  </Link>
                  {/* {!product.inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>} */}
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
                    {/* <span className="text-sm text-gray-500">({product.reviews})</span> */}
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-purple-600 cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.brand?.name} | {product.category?.name}
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
                    <Button
                      className="flex-1"
                      size="sm"
                      disabled={!product.in_stock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.in_stock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedPetType("");
                  setSelectedBrands([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
