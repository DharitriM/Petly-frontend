"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/lib/interfaces/category";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabaseClient";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCategories } from "@/store/slices/categorySlice";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ id: "", name: "", image_url: "" });
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { categories, count} = useSelector((state: RootState) => state.category);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.categories) {
        dispatch(setCategories(data.categories));
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories: " + error.message);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    try {
    if (!file) return formData.image_url;
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const { error } = await supabase.storage
      .from("category-images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error.message);
      toast.error("Image upload failed: " + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("category-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed: " + error.message);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const method = formData.id ? "PUT" : "POST";

      const imageUrl = await uploadImage();
      if (!imageUrl && !isEditing) {
        toast.error("Image upload is required.");
        return;
      }
      const updatedFormData = { ...formData, image_url: imageUrl };

      await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      setFormData({ id: "", name: "", image_url: "" });
      setFile(null);
      setOpen(false);
      setIsEditing(false);
      toast.success(`Category ${formData.id ? "updated" : "added"} successfully`);
      fetchCategories();
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast.error("Error saving category: " + error.message);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      id: category.id,
      name: category.name,
      image_url: category.image_url || "",
    });
    setFile(null);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category: " + error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories ({count})</h1>
          <p className="text-gray-600">Manage the Categories</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({ id: "", name: "", image_url: "" });
                setIsEditing(false);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Edit Category" : "Add Category"}
              </DialogTitle>
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
                {(file || formData.image_url) && (
                  <div className="mt-2">
                    <Image
                      src={
                        file ? URL.createObjectURL(file) : formData.image_url
                      }
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
                  <th className="text-left py-3 px-4 font-medium">Image</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Product Count
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.length > 0 ? (
                  categories.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{c.id}</td>
                      <td className="py-3 px-4">
                        <Image
                          src={c?.image_url ? c.image_url : "/placeholder.svg"}
                          alt={c.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </td>
                      <td className="py-3 px-4">{c.name}</td>
                      <td className="py-3 px-4">{c.product_count}</td>
                      <td className="py-3">
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
                    <td
                      colSpan={3}
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No category found 😞
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
