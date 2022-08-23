import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <div className='pt-14'>{children}</div>
            <Footer />
        </div>
    );
}
