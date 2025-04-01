import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useAuth() {
    const authData = useContext(UserContext);

    const options = {
        headers: {
            'X-Authorization': authData.accessToken
        }
    };

    return {
        isAuthenticated: !!authData.accessToken,
        authData,
        options
    }
}