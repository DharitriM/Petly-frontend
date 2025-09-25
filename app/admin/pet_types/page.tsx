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
import { pet_type } from "@/lib/interfaces/pet_type";
import { uploadImage } from "@/lib/utils";
import { setPetTypes } from "@/store/slices/petTypeSlice";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function PetTypesPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ id: "", name: "", image_url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { petTypes, count } = useSelector((state: any) => state.petType);

  const fetchPetTypes = async () => {
    try {
      const res = await fetch("/api/pet-types");
      const data = await res.json();

      if (data.pet_types) {
        dispatch(setPetTypes(data.pet_types));
      }
    } catch (error: any) {
      toast.error("Error fetching pet types: " + error.message);
      console.error("Error fetching pet types:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const method = formData.id ? "PUT" : "POST";
      const imageUrl = await uploadImage(file, "brand-images");
      const updatedFormData = { ...formData, image_url: imageUrl };

      await fetch("/api/pet-types", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      setFormData({ id: "", name: "", image_url: "" });
      setFile(null);
      setOpen(false);
      setIsEditing(false);
      toast.success(
        `Pet type ${formData.id ? "updated" : "added"} successfully`
      );
      fetchPetTypes();
    } catch (error: any) {
      toast.error("Error submitting form: " + error.message);
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (pet_type: pet_type) => {
    setFormData({
      id: pet_type.id,
      name: pet_type.name,
      image_url: pet_type.image_url || "",
    });
    setFile(null);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/pet-types", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Pet type deleted successfully");
      fetchPetTypes();
    } catch (error: any) {
      toast.error("Error deleting pet type: " + error.message);
      console.error("Error deleting pet type:", error);
    }
  };

  useEffect(() => {
    fetchPetTypes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pet Types ({count})</h1>
          <p className="text-gray-600">
            Manage the pet types for your products
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({ id: "", name: "", image_url: "" });
                setIsEditing(false);
              }}
            >
              <Plus/> Add Pet Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Edit Pet Type" : "Add Pet Type"}
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
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Image</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Product Count
                  </th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {petTypes?.length > 0 ? (
                  petTypes.map((pet: pet_type) => (
                    <tr key={pet.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{pet.id}</td>
                      <td className="py-3 px-4">
                        {pet.image_url ? (
                          <Image
                            src={pet.image_url}
                            alt={pet.name}
                            width={60}
                            height={60}
                            className="rounded"
                          />
                        ) : (
                          <Image
                            src="/placeholder.png"
                            alt={pet.name}
                            width={60}
                            height={60}
                            className="rounded"
                          />
                        )}
                      </td>
                      <td className="py-3 px-4">{pet.name}</td>
                      <td className="py-3 px-4">{pet.product_count}</td>
                      <td className="py-3 flex justify-end">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(pet)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(pet.id)}
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
                      No pet types found 😞
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
