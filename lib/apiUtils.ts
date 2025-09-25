import { setUsers } from "@/store/slices/userSlice";
import { setProducts } from "@/store/slices/productSlice";
import { toast } from "sonner";
import { setCategories } from "@/store/slices/categorySlice";
import { setBrands } from "@/store/slices/brandSlice";
import { setPetTypes } from "@/store/slices/petTypeSlice";

export async function fetchUsers(dispatch: any) {
    try {
        const res = await fetch("/api/users");
        const data = await res.json();
        dispatch(setUsers(data));
    } catch (err: any) {
        console.error("Error fetching users:", err);
        toast.error("Error fetching users", err.message);
    }
}

export async function fetchProducts(dispatch: any) {
    try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) dispatch(setProducts(data.products));
    } catch (err: any) {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products", err.message);
    }
}

export async function fetchCategories(dispatch: any) {
    try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.categories) dispatch(setCategories(data.categories));
    }
    catch (err: any) {
        console.error("Error fetching categories:", err.message);
        toast.error("Error fetching categories", err.message);
    }
}

export async function fetchBrands(dispatch: any) {
    try {
        const res = await fetch("/api/brands");
        const data = await res.json();
        if (data.brands) dispatch(setBrands(data.brands));
    }
    catch (err: any) {
        console.error("Error fetching brands:", err.message);
        toast.error("Error fetching brands", err.message);
    }
}

export async function fetchPetTypes(dispatch: any) {
    try {
        const res = await fetch("/api/pet-types");
        const data = await res.json();
        if (data.pet_types) dispatch(setPetTypes(data.pet_types));
    }
    catch (err: any) {
        console.error("Error fetching pet types:", err.message);
        toast.error("Error fetching pet types", err.message);
    }
}