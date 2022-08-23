import React from "react";
import Loader from "./Loader";

export default function Button({ children, loading }) {
    return (
        <button
            type='submit'
            className='bg-primary-500 text-white w-full rounded-md py-2.5 cursor-pointer hover:bg-primary-600 transition-all'>
            {loading ? <Loader /> : children}
        </button>
    );
}
