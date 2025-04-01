import { useState } from "react";


export default function usePersistedState(key, initialState) {

    const [state, setState] = useState(() => {

        const persistedState = localStorage.getItem(key);

        if (!persistedState) {
            return typeof initialState === 'function' ? initialState() : initialState; //Check if intial state is a function
        }

        const persistedStateData = JSON.parse(persistedState);
        return persistedStateData;
    });

    const setPersistedState = (input) => {

        const data = typeof input === 'function' ? input(state) : input;

        const persistedData = JSON.stringify(data);
        localStorage.setItem(key, persistedData);

        setState(data);
    }


    return [
        state,
        setPersistedState
    ]

}