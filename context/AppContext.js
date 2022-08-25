import { deleteCookie, getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
import { axios } from "../lib/axiosInstance";
import { useRouter } from "next/router";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [bio, setBio] = useState(false);
    const [token, setToken] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const checkToken = async () => {
        await axios
            .get("/me", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {})
            .catch((error) => {
                if (error.response.status === 401) {
                    deleteCookie("token");
                    deleteCookie("bio");
                    router.push("/login");
                }
            });
    };
    useEffect(() => {
        if (getCookie("token") && getCookie("bio")) {
            setBio(JSON.parse(getCookie("bio")));
            setToken(getCookie("token"));
            checkToken();
        }
    }, []);
    return (
        <AppContext.Provider
            value={{
                bio,
                setBio,
                token,
                setToken,
                pageLoading,
                setPageLoading,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
