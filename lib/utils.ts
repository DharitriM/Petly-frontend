import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function uploadImage(file: File | null, supabaseBucket: string) {
  try {
    if (!file) {
      console.error("No file selected");
      toast.error("No file selected");
      return null
    };

    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const { error } = await supabase.storage
      .from(supabaseBucket) // specific Supabase bucket
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error.message);
      return null;
    }

    const { data } = supabase.storage
      .from(supabaseBucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error: any) {
    console.error("Upload failed:", error.message);
    toast.error("Image upload failed: " + error.message);
    return null;
  }
}