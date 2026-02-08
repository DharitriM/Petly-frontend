"use client";

import ServicePage from "@/components/layout/service-page-template";

const dietPlans = [
  {
    id: 1,
    name: "Puppy Growth Plan",
    description: "Balanced nutrition for growing puppies, focusing on bone density and muscle development.",
    price: "₹1500/mo",
    rating: 4.8,
    reviews: 120,
    tags: ["Puppy", "Growth", "Nutrition"],
    petTypes: ["Dogs"],
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Senior Cat Wellness",
    description: "Low-calorie, kidney-friendly diet for ageing cats to maintain health and vitality.",
    price: "₹1200/mo",
    rating: 4.9,
    reviews: 85,
    tags: ["Senior", "Weight Management", "Cat"],
    petTypes: ["Cats"],
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "Active Dog Performance",
    description: "High-protein diet for active and working dogs to sustain energy levels.",
    price: "₹2000/mo",
    rating: 4.7,
    reviews: 150,
    tags: ["Active", "High Protein"],
    petTypes: ["Dogs"],
     image: "/placeholder.svg?height=200&width=300"
  },
   {
    id: 4,
    name: "Kitten Starter Pack",
    description: "Essential nutrients for playful kittens.",
    price: "₹1100/mo",
    rating: 4.8,
    reviews: 90,
    tags: ["Kitten", "Growth"],
    petTypes: ["Cats"],
     image: "/placeholder.svg?height=200&width=300"
  },
];

export default function DietPage() {
  return (
    <ServicePage
      title="Pet Diet Plans"
      subtitle="Customized nutrition plans for every stage of your pet's life."
      items={dietPlans}
      filterOptions={["Puppy", "Senior", "Weight Management", "Active", "Kitten"]}
      filterLabel="Goal"
    />
  );
}
