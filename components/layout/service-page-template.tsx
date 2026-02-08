"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Phone, Star, MapPin, Clock } from "lucide-react";
import Image from "next/image";

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  tags: string[];
  location?: string;
  contact?: string;
  petTypes?: string[];
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
  filterOptions: string[];
  filterLabel: string;
}

export default function ServicePage({
  title,
  subtitle,
  items,
  filterOptions,
  filterLabel,
}: ServicePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedPetType, setSelectedPetType] = useState("All Pets");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || item.tags.includes(selectedFilter);
    const matchesPetType = selectedPetType === "All Pets" || !item.petTypes || item.petTypes.includes(selectedPetType);

    return matchesSearch && matchesFilter && matchesPetType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${filterLabel}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All {filterLabel}s</SelectItem>
                {filterOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

             <Select value={selectedPetType} onValueChange={setSelectedPetType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Pets">All Pets</SelectItem>
                <SelectItem value="Dogs">Dogs</SelectItem>
                <SelectItem value="Cats">Cats</SelectItem>
                <SelectItem value="Birds">Birds</SelectItem>
                <SelectItem value="Rabbits">Rabbits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
            {item.image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                </div>
            )}
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                   {item.rating && (
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-gray-500 text-sm">({item.reviews})</span>
                    </div>
                   )}
                   {item.location && (
                       <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                           <MapPin className="w-4 h-4" />
                           {item.location}
                       </div>
                   )}
                </div>
                {item.price && (
                    <Badge variant="secondary" className="text-lg font-bold text-green-700">
                        {item.price}
                    </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">{item.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                      </Badge>
                  ))}
              </div>

              <div className="mt-auto">
                 {item.contact ? (
                      <Button className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                      </Button>
                 ) : (
                      <Button className="w-full">View Details</Button>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

       {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setSelectedFilter("All")
              setSelectedPetType("All Pets")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
