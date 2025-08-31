import { useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useOutletContext();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await register(email, password);
      console.log("Registrierung erfolgreich:", res);

      alert("Registrierung erfolgreich! Bitte logge dich jetzt ein.");
      navigate("/login"); 
    } catch (err: any) {
      setError(err.message || "Fehler bei der Registrierung");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Registrieren
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="deine@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registrieren..." : "Registrieren"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Schon ein Konto?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:text-green-800 hover:underline"
          >
            Jetzt einloggen
          </Link>
        </p>
      </div>
    </main>
  );
}
