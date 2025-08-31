import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { isAdmin } from "../services/auth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useOutletContext<{ user: any }>();
  const loc = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
