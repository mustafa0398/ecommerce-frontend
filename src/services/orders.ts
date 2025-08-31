import type { CartItem } from "../store/cart";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type OrderItemDto = {
  quantity: number;
  price: number;
  title: string;
  imageUrl: string;
  product: { id: number };
};

export type OrderResponse = {
  id: string;
  createdAt: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  total: number;
  items: {
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
};


export type OrderDto = {
  userId: string;
  total: number;
  status?: "pending" | "paid" | "shipped" | "cancelled";
  items: OrderItemDto[];
};

export async function createOrder(order: OrderDto): Promise<void> {
const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Bestellung fehlgeschlagen");
  }
}

export async function listMyOrders(userId: string): Promise<OrderResponse[]> {
const res = await fetch(`${API_URL}/orders/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) {
    throw new Error("Bestellungen konnten nicht geladen werden");
  }

  return res.json();
}

