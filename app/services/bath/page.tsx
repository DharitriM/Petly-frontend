"use client";

import ServicePage from "@/components/layout/service-page-template";

const bathServices = [
  {
    id: 1,
    name: "Bubbles & Barks Grooming",
    description: "Full service grooming and spa for your pampered pooch.",
    rating: 4.7,
    reviews: 210,
    location: "Downtown Pet City",
    tags: ["Grooming", "Spa", "Bath"],
    petTypes: ["Dogs"],
    contact: "555-0101",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Purrfect Shine",
    description: "Specialized cat grooming services including bath and nail trim.",
    rating: 4.9,
    reviews: 80,
    location: "Westside",
    tags: ["Cat Grooming", "Nail Trim"],
    petTypes: ["Cats"],
     contact: "555-0102",
      image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "Mobile Pet Wash",
    description: "We come to you! Convenient mobile bathing service.",
    rating: 4.5,
    reviews: 130,
    location: "Serves All Areas",
    tags: ["Mobile", "Convenient"],
    petTypes: ["Dogs", "Cats"],
     contact: "555-0103",
      image: "/placeholder.svg?height=200&width=300"
  }
];

export default function BathPage() {
  return (
    <ServicePage
      title="Bath & Grooming"
      subtitle="Find the best groomers and bathing services near you."
      items={bathServices}
      filterOptions={["Grooming", "Mobile", "Spa", "Cat Grooming"]}
      filterLabel="Service Type"
    />
  );
}
