"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brand } from "@/lib/interfaces/brand";
import { supabase } from "@/lib/supabaseClient";
import { uploadImage } from "@/lib/utils";
import { RootState } from "@/store";
import { setBrands } from "@/store/slices/brandSlice";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function BrandsPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ id: "", name: "", logo_url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { brands, count } = useSelector((state: RootState) => state.brand);

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();

      if (data.brands) {
        dispatch(setBrands(data.brands));
      }
    } catch (error: any) {
      toast.error("Error fetching brands: " + error.message);
      console.error("Error fetching brands:", error);
    }
  };

  // const uploadImage = async (): Promise<string | null> => {
  //   try {
  //     if (!file) return formData.logo_url; // keep old image if editing
  //     const ext = file.name.split(".").pop();
  //     const fileName = `${uuidv4()}.${ext}`;
  //     const { error } = await supabase.storage
  //       .from("brand-images") // ✅ your Supabase bucket
  //       .upload(fileName, file);

  //     if (error) {
  //       console.error("Upload failed:", error.message);
  //       return null;
  //     }

  //     const { data } = supabase.storage
  //       .from("brand-images")
  //       .getPublicUrl(fileName);

  //     return data.publicUrl;
  //   } catch (error: any) {
  //     toast.error("Image upload failed: " + error.message);
  //     console.error("Upload failed:", error.message);
  //     return null;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const method = formData.id ? "PUT" : "POST";

      const imageUrl = await uploadImage(file, "brand-images");
      const updatedFormData = { ...formData, logo_url: imageUrl };

      await fetch("/api/brands", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      setFormData({ id: "", name: "", logo_url: "" });
      setFile(null);
      setOpen(false);
      setIsEditing(false);
      toast.success(`Brand ${formData.id ? "updated" : "added"} successfully`);
      fetchBrands();
    } catch (error: any) {
      toast.error("Error: " + error.message);
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (brand: brand) => {
    setFormData({
      id: brand.id,
      name: brand.name,
      logo_url: brand.logo_url || "",
    });
    setFile(null);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/brands", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    toast.success("Brand deleted successfully");
    fetchBrands();
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Brands ({count})</h1>
          <p className="text-gray-600">Manage the Brands for your products</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({ id: "", name: "", logo_url: "" });
                setIsEditing(false);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit" : "Add"} Brand</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                {/* Show preview */}
                {(file || formData.logo_url) && (
                  <div className="mt-2">
                    <Image
                      src={file ? URL.createObjectURL(file) : formData.logo_url}
                      alt="Preview"
                      width={60}
                      height={60}
                      className="rounded"
                    />
                  </div>
                )}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!formData.name.trim()}>
                  {isEditing ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="shadow-lg">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Logo</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Product Count
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands?.length > 0 ? (
                  brands.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{c.id}</td>
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 relative">
                          <Image
                            src={c?.logo_url ? c.logo_url : "/placeholder.svg"}
                            alt={c.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{c.name}</td>
                      <td className="py-3 px-4">{c.product_count}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(c)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDelete(c.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No brand found 😞
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
