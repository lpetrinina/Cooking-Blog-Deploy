import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}
