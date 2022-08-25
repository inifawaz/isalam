import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { axios } from "../lib/axiosInstance";
import { useRouter } from "next/router";

export default function NavSideAuth() {
    const { bio, setBio, setToken } = useContext(AppContext);
    const router = useRouter();

    const navigationsAuth = [
        {
            href: "/me/transactions",
            text: "Pembayaran",
        },
        {
            href: "/",
            text: "Program Wakaf",
        },
        {
            href: "/about",
            text: "Atur Profile",
        },
    ];
    const handleLogout = async () => {
        await axios
            .post(
                "/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                deleteCookie("token");
                deleteCookie("bio");
                router.push("/");

                setBio(false);
                setToken(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                router.push("/");
            });
    };
    return (
        <div className='p-4 bg-white border sticky top-[58px] rounded-md shadow-md'>
            <div className='flex items-center space-x-1'>
                <div className='relative h-8 w-8 rounded-full overflow-hidden shadow-lg border'>
                    <Image src={bio.avatar_url} layout='fill' alt='avatar' />
                </div>
                <div className='hidden md:block'>
                    <p className=' leading-none'>{bio.full_name}</p>
                    <p className='text-sm leading-none'>{bio.email}</p>
                </div>
            </div>
            <div className='mt-4'>
                {navigationsAuth.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <a
                            className={
                                "block p-2 rounded-md transition-all hover:bg-gray-100"
                            }>
                            {item.text}
                        </a>
                    </Link>
                ))}
                <button
                    onClick={handleLogout}
                    className={
                        "block bg-primary-100 text-primary-600 p-1.5 w-full rounded-md transition-all hover:bg-gray-100"
                    }>
                    Keluar
                </button>
            </div>
        </div>
    );
}
