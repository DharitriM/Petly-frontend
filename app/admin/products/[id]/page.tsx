"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/lib/interfaces/product";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetailCard = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchProduct = async (id: string) => {
    try {
      if (!id) {
        toast.error("Invalid product ID");
        return;
      }
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      if (data?.images?.length > 0) setSelectedImage(data.images[0]);
    } catch (err) {
      toast.error("Error fetching product");
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProduct(id as string);
  }, [id]);

  if (!product) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Button>

      <Card className="shadow-xl rounded-xl border border-gray-200 overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <p className="text-sm text-gray-500 font-mono">{product.id}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Images */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[300px] relative mb-3 md:mb-4">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain rounded border"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 border rounded cursor-pointer overflow-hidden ${
                        selectedImage === img
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`thumb-${idx}`}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
                <h3 className="font-semibold text-lg">Description:</h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "No description available",
                  }}
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoBox label="Category" value={product.category?.name} />
                <InfoBox label="Brand" value={product.brand?.name} />
                <InfoBox label="Price" value={`₹${product.price}`} />
                <InfoBox
                  label="Original Price"
                  value={`₹${product.original_price}`}
                />
                <InfoBox label="Weight" value={`${product.weight} kg`} />
                <InfoBox label="Dimensions" value={product.dimensions || "-"} />
                <InfoBox label="Quantity" value={product.quantity.toString()} />
                <InfoBox
                  label="Stock"
                  value={product.in_stock ? "In Stock" : "Out of Stock"}
                  className={
                    product.in_stock ? "text-green-600" : "text-red-600"
                  }
                />
                <InfoBox
                  label="Rating"
                  value={`${product.rating} ⭐ (${product.reviews_count})`}
                />
                <InfoBox
                  label="Pet Type"
                  value={product.pet_type?.name || "-"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailCard;

// Helper Component
const InfoBox = ({ label, value, className = "" }: any) => (
  <div
    className={`bg-gray-50 p-2 rounded border border-gray-200 flex flex-col ${className}`}
  >
    <span className="text-gray-500 text-sm">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);
