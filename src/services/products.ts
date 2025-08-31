export type Product = {
  id?: number;             
  title: string;
  price: number;           
  description?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: number;
};

const API_PUBLIC = `${import.meta.env.VITE_API_BASE_URL}/products`;
const API_ADMIN = `${import.meta.env.VITE_API_BASE_URL}/admin/products`;

export async function listProducts(): Promise<Product[]> {
  const res = await fetch(API_PUBLIC);
  if (!res.ok) throw new Error("Produkte konnten nicht geladen werden");
  return res.json();
}

export async function addProduct(p: Omit<Product, "id">): Promise<void> {
  const res = await fetch(API_ADMIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(p),
  });
  if (!res.ok) throw new Error("Produkt konnte nicht hinzugefügt werden");
}

export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<void> {
  const res = await fetch(`${API_ADMIN}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Produkt konnte nicht aktualisiert werden");
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_ADMIN}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Produkt konnte nicht gelöscht werden");
}
