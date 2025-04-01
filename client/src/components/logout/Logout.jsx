import { Navigate } from "react-router";
import { useLogout } from "../../api/authApi";
import Spinner from "../common/spinner/Spinner";

export default function Logout() {
  const { isLoggedOut } = useLogout();

  return isLoggedOut ? <Navigate to={"/"} /> : <Spinner />;
}
