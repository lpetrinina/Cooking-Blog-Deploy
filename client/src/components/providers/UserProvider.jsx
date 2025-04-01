import { UserContext } from "../../contexts/UserContext";
import usePersistedState from "../../hooks/usePersistedState";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", null);

  const userLoginHandler = (currentUserData) => {
    setAuthData(currentUserData);
  };

  const userLogoutHandler = () => {
    setAuthData(null);
  };

  return (
    <UserContext.Provider
      value={{ ...authData, userLoginHandler, userLogoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}
