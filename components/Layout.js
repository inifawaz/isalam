import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className='min-h-screen  flex flex-col justify-between'>
            <Header />
            <div className='pt-14 relative'>{children}</div>
            <Footer />
        </div>
    );
}
