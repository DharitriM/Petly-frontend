"use client";

import ServicePage from "@/components/layout/service-page-template";

const events = [
  {
    id: 1,
    name: "Puppy Playdate in the Park",
    description: "Socialize your puppy with others in a safe environment. Trainers present.",
    location: "Central Park Dog Run",
    tags: ["Social", "Puppy", "Free"],
    petTypes: ["Dogs"],
    contact: "Register Online",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Cat Agility Competition",
    description: "Fun agility course for agile felines. Prizes for winners!",
    location: "PetLy Arena",
    tags: ["Competition", "Agility"],
    petTypes: ["Cats"],
    contact: "Register Online",
     image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "Pet Adoption Fair",
    description: "Meet adorable pets looking for a forever home.",
    location: "Community Center",
    tags: ["Adoption", "Charity", "Free"],
    petTypes: ["Dogs", "Cats", "Birds", "Rabbits"],
    contact: "Walk-in",
     image: "/placeholder.svg?height=200&width=300"
  }
];

export default function EventsPage() {
  return (
    <ServicePage
      title="Pet Events"
      subtitle="Discover exciting events for you and your furry friend."
      items={events}
      filterOptions={["Social", "Competition", "Adoption", "Charity"]}
      filterLabel="Type"
    />
  );
}
