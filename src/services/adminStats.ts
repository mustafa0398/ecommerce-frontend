export type DashboardStats = {
  totalOrders: number;
  pendingOrders: number;
  revenueToday: number;
  revenue30d: number;
  topProducts30d: { title: string; qty: number }[];
  recentOrders: { id: string; createdAt: number; status: string; total: number }[];
};

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admin/stats`;

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  if (!res.ok) throw new Error("Stats konnten nicht geladen werden");
  return res.json();
}
