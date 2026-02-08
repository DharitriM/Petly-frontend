import { setUsers, setLoading as setUserLoading, setError as setUserError } from "@/store/slices/userSlice";
import { setProducts, setLoading as setProductLoading, setError as setProductError } from "@/store/slices/productSlice";
import { toast } from "sonner";
import { setCategories, setLoading as setCategoryLoading, setError as setCategoryError } from "@/store/slices/categorySlice";
import { setBrands, setLoading as setBrandLoading, setError as setBrandError } from "@/store/slices/brandSlice";
import { setPetTypes, setLoading as setPetTypeLoading, setError as setPetTypeError } from "@/store/slices/petTypeSlice";
import { setEmergencyContacts, setHelplines, setFaqs, setLoading, setError } from "@/store/slices/helpSlice";

export async function fetchUsers(dispatch: any) {
    try {
        dispatch(setUserLoading(true));
        const res = await fetch("/api/users");
        const data = await res.json();
        dispatch(setUsers(data));
    } catch (err: any) {
        console.error("Error fetching users:", err);
        dispatch(setUserError(err.message));
        toast.error("Error fetching users", err.message);
    } finally {
        dispatch(setUserLoading(false));
    }
}

export async function fetchProducts(dispatch: any) {
    try {
        dispatch(setProductLoading(true));
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) dispatch(setProducts(data.products));
    } catch (err: any) {
        console.error("Error fetching products:", err);
        dispatch(setProductError(err.message));
        toast.error("Error fetching products", err.message);
    } finally {
        dispatch(setProductLoading(false));
    }
}

export async function fetchCategories(dispatch: any) {
    try {
        dispatch(setCategoryLoading(true));
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.categories) dispatch(setCategories(data.categories));
    }
    catch (err: any) {
        console.error("Error fetching categories:", err.message);
        dispatch(setCategoryError(err.message));
        toast.error("Error fetching categories", err.message);
    } finally {
        dispatch(setCategoryLoading(false));
    }
}

export async function fetchBrands(dispatch: any) {
    try {
        dispatch(setBrandLoading(true));
        const res = await fetch("/api/brands");
        const data = await res.json();
        if (data.brands) dispatch(setBrands(data.brands));
    }
    catch (err: any) {
        console.error("Error fetching brands:", err.message);
        dispatch(setBrandError(err.message));
        toast.error("Error fetching brands", err.message);
    } finally {
        dispatch(setBrandLoading(false));
    }
}

export async function fetchPetTypes(dispatch: any) {
    try {
        dispatch(setPetTypeLoading(true));
        const res = await fetch("/api/pet-types");
        const data = await res.json();
        if (data.pet_types) dispatch(setPetTypes(data.pet_types));
    }
    catch (err: any) {
        console.error("Error fetching pet types:", err.message);
        dispatch(setPetTypeError(err.message));
        toast.error("Error fetching pet types", err.message);
    } finally {
        dispatch(setPetTypeLoading(false));
    }
}

export async function fetchEmergencyContacts(dispatch: any) {
  try {
    dispatch(setLoading(true));
    const res = await fetch("/api/help/emergency");
    const data = await res.json();
    if (data.emergency_contacts) dispatch(setEmergencyContacts(data.emergency_contacts));
  } catch (err: any) {
    console.error("Error fetching emergency contacts:", err);
    dispatch(setError(err.message));
    toast.error("Error fetching emergency contacts", err.message);
  } finally {
      dispatch(setLoading(false));
  }
}

export async function fetchHelplines(dispatch: any) {
  try {
    dispatch(setLoading(true));
    const res = await fetch("/api/help/helpline");
    const data = await res.json();
    if (data.helplines) dispatch(setHelplines(data.helplines));
  } catch (err: any) {
    console.error("Error fetching helplines:", err);
    dispatch(setError(err.message));
    toast.error("Error fetching helplines", err.message);
  } finally {
      dispatch(setLoading(false));
  }
}

export async function fetchFaqs(dispatch: any) {
  try {
    dispatch(setLoading(true));
    const res = await fetch("/api/help/faq");
    const data = await res.json();
    if (data.faqs) dispatch(setFaqs(data.faqs));
  } catch (err: any) {
    console.error("Error fetching FAQs:", err);
    dispatch(setError(err.message));
    toast.error("Error fetching FAQs", err.message);
  } finally {
      dispatch(setLoading(false));
  }
}
