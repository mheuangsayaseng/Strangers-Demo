import { createContext, useEffect } from "react";
import { useState } from "react";
import { fetchMe } from "../api";

//Create the context
export const AuthContext = createContext();

//Create the Provider (wrapper component)
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState ({});

    useEffect(()=>{
        async function getMe(){
            const APIResponse = await fetchMe(token);
            setUser(APIResponse.data);
        }
        if(token) {
            getMe();
        } else {
            setUser({});
        }
    }, [token]);

    const contextValue = {
        token,
        setToken,
        user,
        setUser,
    };

    return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;