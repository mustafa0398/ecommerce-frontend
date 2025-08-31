import { useEffect, useState } from "react";
import { getUserFromToken } from "../services/auth";
import { listMyOrders, type OrderResponse } from "../services/orders";
import { formatPrice } from "../utils/format";

export default function Orders() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUserFromToken();
    setUser(u);

    async function fetchOrders() {
      if (u) {
        const list = await listMyOrders(u.sub);
        setOrders(list);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (!user) return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Meine Bestellungen</h1>
      <div>Bitte einloggen.</div>
    </main>
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Meine Bestellungen</h1>
      {loading ? (
        <div>Lade…</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-600">Noch keine Bestellungen.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">Bestellung #{o.id.toString().slice(0,6)}</div>
                  <div className="text-sm text-gray-500">
                    Status: {o.status} • {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="font-semibold">{formatPrice(o.total)}</div>
              </div>
              <div className="divide-y">
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2">
                    {it.imageUrl && <img src={it.imageUrl} className="w-12 h-12 object-cover rounded" />}
                    <div className="flex-1">
                      <div className="font-medium">{it.title}</div>
                      <div className="text-sm text-gray-500">
                        {it.quantity} × {formatPrice(it.price)}
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatPrice(it.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
