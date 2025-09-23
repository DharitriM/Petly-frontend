"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Search, Plus, Edit, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "@/store/slices/productSlice";

const supabase = require("@/lib/supabaseClient").supabase;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    original_price: 0,
    weight: 0,
    dimensions: "",
    rating: 0,
    reviews_count: 0,
    quantity: 0,
    images: [] as string[],
    category_id: "",
    brand_id: "",
    pet_type_id: "",
  });
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        dispatch(setProducts(data.products));
      }
    };
    fetchProducts();
  }, [dispatch]);

  const uploadImages = async () => {
    const urls: string[] = [];
    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);
      if (error) {
        console.error("Image upload failed:", error.message);
        continue;
      }
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleAddProduct = async () => {
    const imageUrls = await uploadImages();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price),
        original_price: Number(newProduct.original_price),
        weight: Number(newProduct.weight),
        quantity: Number(newProduct.quantity),
        images: imageUrls,
      }),
    });

    const data = await res.json();
    if (data.product) {
      dispatch(setProducts([...products, data.product]));
      resetForm();
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;

    const imageUrls = await uploadImages();
    const res = await fetch(`/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        images: imageUrls.length > 0 ? imageUrls : newProduct.images,
      }),
    });

    const data = await res.json();
    if (data.product) {
      dispatch(
        setProducts(
          products.map((p) => (p.id === selectedProduct.id ? data.product : p))
        )
      );
      resetForm();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    dispatch(setProducts(products.filter((p) => p.id !== id)));
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      original_price: 0,
      weight: 0,
      dimensions: "",
      rating: 0,
      reviews_count: 0,
      quantity: 0,
      images: [],
      category_id: "",
      brand_id: "",
      pet_type_id: "",
    });
    setImageFiles([]);
    setDialogOpen(false);
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.pet_type?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Manage the product catalog</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedProduct(null);
                setIsEditing(false);
                setDialogOpen(true);
              }}
            >
              <Plus className="h-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            {/* Form fields */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <InputField
                label="Product Name"
                value={newProduct.name}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <InputField
                label="Description"
                value={newProduct.description}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
              <InputField
                label="Price"
                type="number"
                value={newProduct.price}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <InputField
                label="Original Price"
                type="number"
                value={newProduct.original_price}
                onChange={(e: any) =>
                  setNewProduct({
                    ...newProduct,
                    original_price: e.target.value,
                  })
                }
              />
              <InputField
                label="Weight"
                type="number"
                value={newProduct.weight}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, weight: e.target.value })
                }
              />
              <InputField
                label="Dimensions"
                value={newProduct.dimensions}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, dimensions: e.target.value })
                }
              />
              <InputField
                label="Quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
              />

              {/* Category, Brand, Pet Type will be dropdowns */}
              <DropdownField
                label="Category"
                value={newProduct.category_id}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, category_id: e.target.value })
                }
                endpoint="/api/categories"
              />
              <DropdownField
                label="Brand"
                value={newProduct.brand_id}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, brand_id: e.target.value })
                }
                endpoint="/api/brands"
              />
              <DropdownField
                label="Pet Type"
                value={newProduct.pet_type_id}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, pet_type_id: e.target.value })
                }
                endpoint="/api/pet-types"
              />

              <div className="col-span-2 space-y-2">
                <Label>Upload Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    e.target.files && setImageFiles(Array.from(e.target.files))
                  }
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={isEditing ? handleEditProduct : handleAddProduct}
                >
                  {isEditing ? "Update" : "Add"} Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <div className="relative w-[20vw]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Brand</th>
                  <th className="text-left py-3 px-4 font-medium">Pet Type</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Stock</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={
                              product?.images?.length > 0
                                ? product.images[0]
                                : "/placeholder.svg"
                            }
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {product.category?.name ?? "-"}
                      </td>
                      <td className="py-3 px-4">
                        {product.brand?.name ?? "-"}
                      </td>
                      <td className="py-3 px-4">
                        {product.pet_type?.name ?? "-"}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ₹{product.price}
                      </td>
                      <td className="py-3 px-4">
                        {product.quantity}{" "}
                        {product.in_stock ? (
                          <span className="text-green-600">(In Stock)</span>
                        ) : (
                          <span className="text-red-600">(Out of Stock)</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setIsEditing(true);
                              setSelectedProduct(product);
                              const imageUrls = product.images
                                ? product.images
                                : [];
                              setNewProduct({
                                name: product.name ?? "",
                                description: product.description ?? "",
                                price: product.price ?? 0,
                                original_price: product.original_price ?? 0,
                                weight: product.weight ?? 0,
                                dimensions: product.dimensions ?? "",
                                rating: product.rating ?? 0,
                                reviews_count: product.reviews_count ?? 0,
                                quantity: product.quantity ?? 0,
                                images: imageUrls,
                                category_id: product.category_id ?? "",
                                brand_id: product.brand_id ?? "",
                                pet_type_id: product.pet_type_id ?? "",
                              });
                              setDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No product found 😞
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// helper field
function InputField({ label, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </div>
  );
}

// Dropdown that fetches options from API
function DropdownField({ label, value, onChange, endpoint }: any) {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) =>
        setOptions(
          data.items || data.categories || data.brands || data.pet_types || []
        )
      );
  }, [endpoint]);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        className="border rounded px-3 py-2 w-full"
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
