import { AppProvider } from "../context/AppContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <Component {...pageProps} />
            <Toaster />
        </AppProvider>
    );
}

export default MyApp;
