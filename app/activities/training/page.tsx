"use client";

import ServicePage from "@/components/layout/service-page-template";

const trainingCenters = [
  {
    id: 1,
    name: "Positive Paws Academy",
    description: "Positive reinforcement training for dogs of all ages. Basic obedience to advanced tricks.",
    rating: 4.9,
    reviews: 320,
    location: "Eastside",
    tags: ["Obedience", "Puppy", "Positive Reinforcement"],
    petTypes: ["Dogs"],
    contact: "555-0301",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Behavioral Balance",
    description: "Specialized in behavioral issues and aggression rehabilitation.",
    rating: 4.8,
    reviews: 150,
    location: "Westside",
    tags: ["Behavioral", "Rehabilitation"],
    petTypes: ["Dogs", "Cats"],
    contact: "555-0302",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "K9 Sports Center",
    description: "Training for agility, flyball, and dock diving.",
    rating: 4.7,
    reviews: 200,
    location: "Northside",
    tags: ["Sports", "Agility"],
    petTypes: ["Dogs"],
    contact: "555-0303",
     image: "/placeholder.svg?height=200&width=300"
  }
];

export default function TrainingPage() {
  return (
    <ServicePage
      title="Pet Training Centers"
      subtitle="Professional training to help your pet be their best self."
      items={trainingCenters}
      filterOptions={["Obedience", "Behavioral", "Sports", "Puppy"]}
      filterLabel="Focus"
    />
  );
}
