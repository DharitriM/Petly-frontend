export interface Pet {
  name: string;
  type: string;
  breed: string;
  age: string; // e.g., "puppy-kitten"
}

export interface User {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  has_pets: string;
  interests: string[];
  newsletter: boolean;
  pets: Pet[];
  is_admin: boolean;
}
