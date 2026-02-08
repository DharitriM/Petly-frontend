"use client";

import ServicePage from "@/components/layout/service-page-template";

const competitions = [
  {
    id: 1,
    name: "National Dog Show",
    description: "Prestigious dog show featuring various breeds.",
    location: "Convention Center",
    tags: ["Show", "National"],
    petTypes: ["Dogs"],
    contact: "Register",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Agility Championship",
    description: "High-octane agility course competition.",
    location: "Sports Complex",
    tags: ["Agility", "Sports"],
    petTypes: ["Dogs"],
    contact: "Register",
    image: "/placeholder.svg?height=200&width=300"
  },
];

export default function CompetitionsPage() {
  return (
    <ServicePage
      title="Pet Competitions"
      subtitle="Showcase your pet's talents and win prizes!"
      items={competitions}
      filterOptions={["Show", "Agility", "Sports"]}
      filterLabel="Type"
    />
  );
}
