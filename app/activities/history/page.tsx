"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar } from "lucide-react";

export default function HistoryPage() {
  const history = [
    {
      id: 1,
      event: "Puppy Playdate",
      date: "2024-05-15",
      location: "Central Park Dog Run",
      status: "Attended",
    },
    {
      id: 2,
      event: "Basic Obedience Class",
      date: "2024-04-10",
      location: "Positive Paws Academy",
      status: "Completed",
      grade: "A",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Participation History</h1>
        <p className="text-gray-600">Track your pet's events and training progress.</p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.event}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                 <Badge variant={item.status === "Completed" ? "default" : "secondary"}>
                    {item.status} {item.grade && `- Grade: ${item.grade}`}
                 </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {history.length === 0 && (
            <p className="text-center text-gray-500">No participation history found.</p>
        )}
      </div>
    </div>
  );
}
