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
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function PetTypesPage() {
  const [petTypes, setPetTypes] = useState<pet_type[]>([]);
  const [formData, setFormData] = useState({ id: "", name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchPetTypes = async () => {
    const res = await fetch("/api/pet-types");
    const data = await res.json();
    setPetTypes(data.pet_types || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? "PUT" : "POST";

    await fetch("/api/pet-types", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData }),
    });

    setFormData({ id: "", name: "" });
    setOpen(false);
    setIsEditing(false);
    fetchPetTypes();
  };

  const handleEdit = (pet_type: pet_type) => {
    setFormData({
      id: pet_type.id,
      name: pet_type.name,
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/pet-types", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPetTypes();
  };

  useEffect(() => {
    fetchPetTypes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pet Types</h1>
          <p className="text-gray-600">
            Manage the pet types for your products
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({ id: "", name: "" });
                setIsEditing(false);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Pet Type
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
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {petTypes?.length > 0 ? (
                  petTypes.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{c.name}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(c)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(c.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <span className="py-3 px-4 w-full">No pet types found 😞</span>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
