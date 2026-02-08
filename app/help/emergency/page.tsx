"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmergencyContacts } from "@/lib/apiUtils";
import { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Ambulance, Shield, Stethoscope } from "lucide-react";
import Loader from "@/components/ui/loader";

const iconMap: { [key: string]: any } = {
  Ambulance: Ambulance,
  Shield: Shield,
  Stethoscope: Stethoscope,
  Phone: Phone,
};

export default function EmergencyPage() {
  const dispatch = useDispatch();
  const { emergencyContacts, loading } = useSelector((state: RootState) => state.help);

  useEffect(() => {
    fetchEmergencyContacts(dispatch);
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Emergency Contacts</h1>
        <p className="text-gray-600">
          Immediate assistance for your furry friends. Available 24/7.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact: any) => {
          const Icon = iconMap[contact.icon] || Phone;
          return (
            <Card key={contact.id} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full text-red-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.type}</p>
                  </div>
                </div>
                <div className="text-right">
                    <a href={`tel:${contact.phone}`} className="text-xl font-mono font-bold text-red-600 hover:underline">
                        {contact.phone}
                    </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
       {emergencyContacts.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            No emergency contacts found.
          </div>
       )}
    </div>
  );
}
