"use client";

import ServicePage from "@/components/layout/service-page-template";

const keepers = [
  {
    id: 1,
    name: "Sarah's Pet Sitting",
    description: "Reliable pet sitting in your home. Experienced with dogs and cats.",
    rating: 5.0,
    reviews: 45,
    location: "North Hills",
    tags: ["Pet Sitting", "Dog Walking"],
    petTypes: ["Dogs", "Cats"],
    contact: "555-0201",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "The Pet Nanny",
    description: "Professional overnight care and drop-in visits.",
    rating: 4.8,
    reviews: 112,
    location: "City Center",
    tags: ["Overnight", "Drop-in"],
    petTypes: ["Dogs", "Cats", "Birds"],
    contact: "555-0202",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "Wagging Tails Walkers",
    description: "Daily dog walking groups and individual walks.",
    rating: 4.9,
    reviews: 300,
    location: "Suburbs",
    tags: ["Dog Walking", "Group Walks"],
    petTypes: ["Dogs"],
    contact: "555-0203",
     image: "/placeholder.svg?height=200&width=300"
  }
];

export default function KeeperPage() {
  return (
    <ServicePage
      title="Pet Keepers & Walkers"
      subtitle="Trusted professionals to care for your pet when you can't."
      items={keepers}
      filterOptions={["Pet Sitting", "Dog Walking", "Overnight", "Drop-in"]}
      filterLabel="Service"
    />
  );
}
