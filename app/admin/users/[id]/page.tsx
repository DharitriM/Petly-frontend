"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, User2, Crown, Dog, Mail, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  if (!user) return <Loader />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/users")}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users
      </Button>

      <Card className="shadow-xl rounded-xl border border-gray-200 overflow-hidden">
        <CardHeader className="bg-blue-50 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <User2 className="w-10 h-10 text-blue-600" />
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {user.first_name} {user.last_name}
                  {user.is_admin && (
                    <Badge
                      className="flex items-center text-xs bg-blue-600/60"
                    >
                      <Crown className="w-3 h-3 text-white" />
                      Admin
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-gray-500 text-sm">User ID: {user.id}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" /> {user.phone || "—"}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" /> {user.email || "—"}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Interests</h2>
            {user.interests?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest: string) => (
                  <Badge key={interest} className="capitalize">
                    {interest}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No interests listed</p>
            )}
          </div>

          {/* Pets */}
          <div>
            <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Dog className="w-5 h-5 text-green-600" /> Pets
            </h2>
            {user.has_pets && user.pets?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.pets.map((pet: any, i: number) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 shadow-sm flex flex-col gap-2 hover:shadow-lg transition"
                  >
                    <span className="font-medium text-lg">{pet.name}</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{pet.type}</Badge>
                      <Badge variant="secondary">{pet.breed}</Badge>
                      <Badge className="capitalize">{pet.age.replace("-", " ")}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pets listed</p>
            )}
          </div>

          {/* Preferences */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Preferences</h2>
            <span>
              Newsletter:{" "}
              <Badge variant={user.newsletter ? "default" : "outline"}>
                {user.newsletter ? "Subscribed" : "Not Subscribed"}
              </Badge>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
