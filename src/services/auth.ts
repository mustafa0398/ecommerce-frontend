const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registrierung fehlgeschlagen");
  return await res.text();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const token = await res.text();
  if (!res.ok || token === "Invalid credentials") {
    throw new Error("Login fehlgeschlagen");
  }

  localStorage.setItem("token", token);
  return token;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // z.B. { sub: "...", role: "ADMIN" }
    return payload;
  } catch (e) {
    return null;
  }
}

export function isAdmin(user: any): boolean {
  // 🔑 Wichtig: prüfe exakt wie es im Token steht
  return user?.role === "ADMIN" || user?.role === "ROLE_ADMIN";
}
