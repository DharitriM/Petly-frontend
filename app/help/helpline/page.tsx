"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHelplines } from "@/lib/apiUtils";
import { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Heart, MessageCircle } from "lucide-react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: any } = {
  Phone: Phone,
  Heart: Heart,
  MessageCircle: MessageCircle,
};

export default function HelplinePage() {
  const dispatch = useDispatch();
  const { helplines, loading } = useSelector((state: RootState) => state.help);

  useEffect(() => {
    fetchHelplines(dispatch);
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-600">24/7 Helpline</h1>
        <p className="text-gray-600">
          We are here to help you with any questions or concerns about your pets.
        </p>
      </div>

      <div className="grid gap-6">
        {helplines.map((helpline: any) => {
          const Icon = iconMap[helpline.icon] || Phone;
          return (
            <Card key={helpline.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:flex items-center justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-4 bg-purple-100 rounded-full text-purple-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{helpline.name}</h3>
                    <p className="text-green-600 font-medium flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Available: {helpline.available_hours}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <a href={`tel:${helpline.number}`} className="text-3xl font-bold text-gray-800 hover:text-purple-600 transition-colors">
                        {helpline.number}
                    </a>
                    <Button className="w-full md:w-auto" size="lg" asChild>
                         <a href={`tel:${helpline.number}`}>Call Now</a>
                    </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

       {helplines.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            No helplines found.
          </div>
       )}
    </div>
  );
}
