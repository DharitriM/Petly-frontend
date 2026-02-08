"use client";

import ServicePage from "@/components/layout/service-page-template";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn Calendar exists or use input date
import { useState } from "react";
import { Plus } from "lucide-react";

export default function MedicinePage() {
    // Custom implementation for Medicine Tracker as it's more functional than listing
    const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold mb-2">Medicine Tracker</h1>
                <p className="text-gray-600">Never miss a dose. Track your pet's medications.</p>
            </div>
            <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
            </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 h-fit">
                <CardContent className="p-6">
                     <h3 className="font-semibold mb-4">Calendar</h3>
                      {/* Placeholder for Calendar component if not installed, otherwise use it */}
                     <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <p className="mb-2">Select Date</p>
                        <input type="date" className="p-2 border rounded" />
                     </div>
                </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
                <h3 className="font-semibold text-xl">Scheduled for Today</h3>
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                             <h4 className="font-bold">Heartworm Preventative</h4>
                             <p className="text-sm text-gray-500">Rover - 1 Tablet</p>
                        </div>
                        <div className="text-right">
                             <div className="font-mono text-lg bg-green-100 text-green-800 px-3 py-1 rounded">08:00 AM</div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                             <h4 className="font-bold">Joint Supplement</h4>
                             <p className="text-sm text-gray-500">Bella - 1 Chew</p>
                        </div>
                         <div className="text-right">
                             <div className="font-mono text-lg bg-yellow-100 text-yellow-800 px-3 py-1 rounded">06:00 PM</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
