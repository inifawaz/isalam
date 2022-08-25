import React from "react";
import Loader from "./Loader";

export default function Button({
    children,
    loading,
    disabled,
    color,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            type='submit'
            disabled={disabled}
            className={`bg-${color}-500 text-white w-full transition-all mt-4 rounded-md py-2.5 disabled:bg-gray-400 cursor-pointer hover:bg-${color}-600 transition-all`}>
            {loading ? <Loader /> : children}
        </button>
    );
}

Button.defaultProps = {
    disabled: false,
    color: "primary",
};
