import { useContext, useEffect } from "react";
import { request } from "../utils/requester";
import { UserContext } from "../contexts/UserContext";

const baseURL = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

// use hook on event
export const useLogin = () => {

    const login = async (email, password) => {

        const authData = await request('POST', `${baseURL}/login`, { email, password });

        return authData;
    }

    return {
        login,
    }
}

// use hook on event
export const useRegister = () => {

    const register = async (username, email, password) => {

        const authData = await request('POST', `${baseURL}/register`, { username, email, password });

        return authData;
    }

    return {
        register
    }
}

// use hook on mount
export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {

        if (!accessToken) {
            return
        }

        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        };

        request('GET', `${baseURL}/logout`, null, options)
            .finally(() => userLogoutHandler());

    }, [accessToken, userLogoutHandler])

    return {
        isLoggedOut: !!accessToken
    }

}