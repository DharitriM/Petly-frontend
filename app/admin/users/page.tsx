"use client";

import { useEffect, useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const supabase = require("@/lib/supabaseClient").supabase;

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    newsletter: false,
    has_pets: "",
    is_admin: false,
  });

  useEffect(() => {
    async function fetchUsers() {
      const user = await supabase.auth.getUser();
      setCurrentUserId(user?.data?.user?.id);

      const { data, error } = await supabase.from("user_profiles").select("*");
      if (!error) setUsers(data);
      else console.error("Error fetching users:", error.message);
    }
    fetchUsers();
  }, []);

  const handleEditUser = async () => {
    const { data, error } = await supabase
      .from("user_profiles")
      .update({ ...newUser })
      .eq("id", selectedUser.id)
      .select();

    if (!error && data) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? data[0] : u)));
      resetForm();
    } else {
      console.error("Failed to update user:", error?.message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    const { error } = await supabase.from("user_profiles").delete().eq("id", id);
    if (!error) {
      setUsers(users.filter((u) => u.id !== id));
    } else {
      console.error("Failed to delete user:", error?.message);
    }
  };

  const resetForm = () => {
    setNewUser({
      first_name: "",
      last_name: "",
      phone: "",
      newsletter: false,
      has_pets: "",
      is_admin: false,
    });
    setDialogOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
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
                  <th className="text-left py-3 px-4">First Name</th>
                  <th className="text-left py-3 px-4">Last Name</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Interests</th>
                  <th className="text-left py-3 px-4">Pets</th>
                  <th className="text-left py-3 px-4">Admin</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{user.first_name}</td>
                    <td className="py-3 px-4 font-medium">{user.last_name}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">
                      {user.interests?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.interests.map((interest: string) => (
                            <Badge key={interest}>{interest}</Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 align-top">
                      {user.has_pets && user.pets?.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {user.pets.map((pet: any, index: number) => (
                            <div
                              key={index}
                              className="flex flex-wrap items-center gap-2 w-fit p-2 rounded-md shadow-sm border border-gray-200"
                            >
                              <span className="text-sm font-medium text-gray-800">
                                {pet.name}
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase">
                                {pet.type}
                              </span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                {pet.breed}
                              </span>
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full capitalize">
                                {pet.age.replace("-", " ")}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="default">
                        {user.is_admin
                          ? user.id === currentUserId
                            ? "Admin / you"
                            : "Admin"
                          : "User"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedUser(user);
                            setNewUser(user);
                            setDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
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

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <InputField
              label="First Name"
              value={newUser.first_name}
              onChange={(e: any) =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
            />
            <InputField
              label="Last Name"
              value={newUser.last_name}
              onChange={(e: any) =>
                setNewUser({ ...newUser, last_name: e.target.value })
              }
            />
            <InputField
              label="Phone"
              value={newUser.phone}
              onChange={(e: any) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <div className="space-y-2">
              <Label>Admin</Label>
              <select
                className="border px-3 py-2 w-full rounded"
                value={newUser.is_admin ? "true" : "false"}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    is_admin: e.target.value === "true",
                  })
                }
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Has Pets</Label>
              <select
                className="border px-3 py-2 w-full rounded"
                value={newUser.has_pets}
                onChange={(e) =>
                  setNewUser({ ...newUser, has_pets: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>Update</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </div>
  );
}
