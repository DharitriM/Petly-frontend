"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
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
import { petTypes, productCategories } from "@/lib/utils";

const supabase = require("@/lib/supabaseClient").supabase;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    original_price: 0,
    rating: 0,
    reviews: 0,
    category: "",
    pet_type: "",
    brand: "",
    in_stock: true,
    images: [] as string[],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

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
    const user = await supabase.auth.getUser();
    const imageUrls = await uploadImages();
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          ...newProduct,
          price: Number(newProduct.price),
          original_price: Number(newProduct.original_price),
          rating: Number(newProduct.rating),
          reviews: Number(newProduct.reviews),
          images: imageUrls,
          created_by: user.data.user?.id,
        },
      ])
      .select();

    if (!error && data) {
      setProducts([...products, ...data]);
      resetForm();
    } else {
      console.error("Failed to insert product:", error?.message);
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    const imageUrls = await uploadImages();
    const { data, error } = await supabase
      .from("products")
      .update({
        ...newProduct,
        images: imageUrls.length > 0 ? imageUrls : newProduct.images,
      })
      .eq("id", selectedProduct.id)
      .select();

    if (!error && data) {
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? data[0] : p))
      );
      resetForm();
    } else {
      console.error("Failed to update product:", error?.message);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: 0,
      original_price: 0,
      rating: 0,
      reviews: 0,
      category: "Food",
      pet_type: "Dog",
      brand: "",
      in_stock: true,
      images: [],
    });
    setImageFiles([]);
    setDialogOpen(false);
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
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
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <InputField
                label="Product Name"
                value={newProduct.name}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <InputField
                label="Brand"
                value={newProduct.brand}
                onChange={(e: any) =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
              />
              <InputField
                label="Price"
                type="number"
                value={newProduct.price}
                onChange={(e: any) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <InputField
                label="Original Price"
                type="number"
                value={newProduct.original_price}
                onChange={(e: any) =>
                  setNewProduct({
                    ...newProduct,
                    original_price: parseFloat(e.target.value),
                  })
                }
              />
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Pet Type</Label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newProduct.pet_type}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, pet_type: e.target.value })
                  }
                >
                  <option value="">Select Pet Type</option>
                  {petTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Upload Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files)
                      setImageFiles(Array.from(e.target.files));
                  }}
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

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <>{console.log({ filteredProducts })}</>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Original Price
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Rating</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span>{product.category}</span>
                      <p className="text-sm text-gray-500">
                        {product.pet_type}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ₹{product.original_price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">⭐ {product.rating}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedProduct(product);
                            setNewProduct({
                              ...product,
                              images: product.images || [],
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
                ))}
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
