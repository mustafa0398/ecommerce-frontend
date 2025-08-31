import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout, getUserFromToken, getToken } from "./services/auth";
import { useCart } from "./store/cart";

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const cartCount = useCart((s) => s.count());
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = getUserFromToken();
      setUser(decoded);
    }
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 bg-white/95 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
          <Link to="/" className="font-semibold">E-Commerce</Link>

          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link to="/products" className="hover:underline">Produkte</Link>
            <Link to="/cart" className="hover:underline">Warenkorb ({cartCount})</Link>
            <Link to="/checkout" className="hover:underline">Kasse</Link>

            {user && (
              <Link to="/orders" className="hover:underline">Bestellungen</Link>
            )}

            {user?.role === "ADMIN" || user?.role === "ROLE_ADMIN" ? (
              <>
                <Link to="/admin" className="hover:underline">Admin</Link>
                <Link to="/admin/products" className="hover:underline">Produkte (Admin)</Link>
              </>
            ) : null}

            {user ? (
              <>
                <span className="hidden sm:inline text-gray-600">{user.sub}</span>
                <button
                  onClick={handleLogout}
                  className="border rounded px-3 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="border rounded px-3 py-1">Login</Link>
                <Link to="/register" className="border rounded px-3 py-1">Registrieren</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Outlet context={{ user, setUser }} />
    </div>
  );
}
