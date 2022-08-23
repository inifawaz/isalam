import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [bio, setBio] = useState(false);
    const [token, setToken] = useState(false);
    useEffect(() => {
        if (getCookie("token") && getCookie("bio")) {
            setBio(JSON.parse(getCookie("bio")));
            setToken(getCookie("token"));
        }
    }, []);
    return (
        <AppContext.Provider
            value={{
                bio,
                setBio,
                token,
                setToken,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
