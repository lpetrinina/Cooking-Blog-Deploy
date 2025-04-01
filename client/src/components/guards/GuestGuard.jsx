import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
