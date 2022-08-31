import Image from "next/image";
import React, { useContext } from "react";
import Container from "./Container";
import isalamDark from "../public/isalam-dark.png";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { deleteCookie, getCookie } from "cookies-next";
import { axios } from "../lib/axiosInstance";

const navigations = [
    {
        href: "/",
        text: "Beranda",
    },
    {
        href: "/projects",
        text: "Wakaf",
    },
    {
        href: "/articles",
        text: "Artikel",
    },
    {
        href: "/about",
        text: "Tentang Kami",
    },
];

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
        href: "/me/setting",
        text: "Atur Profile",
    },
];

export default function Header() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const router = useRouter();
    const handleLogout = async () => {
        await axios
            .post(
                "/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                deleteCookie("token");
                deleteCookie("user");
                setUser(false);
                setToken(false);
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='shadow bg-white   fixed z-20 inset-x-0 top-0'>
            <Container className={"flex justify-between items-center "}>
                <Link href={"/"}>
                    <div className=' relative cursor-pointer  w-32  '>
                        <Image
                            src={isalamDark}
                            layout='responsive'
                            alt='isalam logo'
                        />
                    </div>
                </Link>

                <div className='flex  items-center '>
                    <Menu
                        as={"div"}
                        className={`relative order-1  ${
                            user && token ? "" : "md:hidden"
                        }`}>
                        <Menu.Button as='div' className={"cursor-pointer ml-8"}>
                            {user && token ? (
                                <div className='flex items-center space-x-1'>
                                    <div className='relative h-8 w-8 rounded-full overflow-hidden shadow-lg border'>
                                        <Image
                                            src={user.avatar_url}
                                            layout='fill'
                                            alt='avatar'
                                        />
                                    </div>
                                    <div className='hidden md:block'>
                                        <p className='text-sm leading-none'>
                                            {user.full_name}
                                        </p>
                                        <p className='text-xs leading-none'>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <HiMenu
                                    size={"2em"}
                                    className='text-primary-600'
                                />
                            )}
                        </Menu.Button>
                        <Menu.Items
                            className={
                                "absolute right-0 focus:outline-none bg-white w-60 rounded-md shadow-md border text-sm p-2"
                            }>
                            {/* TODO: tidak perlu render ketika md */}
                            {navigations.map((item, index) => (
                                <Menu.Item className='md:hidden' key={index}>
                                    {({ active }) => (
                                        <div>
                                            <Link href={item.href}>
                                                <a
                                                    className={classNames(
                                                        "block p-2 rounded-md transition-all",
                                                        active
                                                            ? "bg-gray-100"
                                                            : ""
                                                    )}>
                                                    {item.text}
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                            {user && token && (
                                <>
                                    {navigationsAuth.map((item, index) => (
                                        <Menu.Item key={index}>
                                            {({ active }) => (
                                                <div>
                                                    <Link href={item.href}>
                                                        <a
                                                            className={classNames(
                                                                "block p-2 rounded-md transition-all",
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : ""
                                                            )}>
                                                            {item.text}
                                                        </a>
                                                    </Link>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    ))}
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={classNames(
                                                    "block bg-primary-100 text-primary-600 p-1.5 w-full rounded-md transition-all",
                                                    active
                                                        ? "bg-primary-200"
                                                        : ""
                                                )}>
                                                Keluar
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            )}

                            {!user && !token && (
                                <div className='flex justify-between space-x-2'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push("/login")
                                                }
                                                className={classNames(
                                                    "bg-primary-100 text-primary-600 p-1.5 w-full rounded-md transition-all",
                                                    active
                                                        ? "bg-primary-200"
                                                        : ""
                                                )}>
                                                Masuk
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => {
                                                    router.push("/register");
                                                }}
                                                className={classNames(
                                                    "bg-primary-500 text-white p-1.5 w-full rounded-md transition-all",
                                                    active
                                                        ? "bg-primary-600"
                                                        : ""
                                                )}>
                                                Daftar
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            )}
                        </Menu.Items>
                    </Menu>

                    <div className='text-sm space-x-8  hidden md:flex items-center'>
                        {navigations.map((item, index) => (
                            <Link key={index} href={item.href}>
                                <a>{item.text}</a>
                            </Link>
                        ))}
                        {!user && !token && (
                            <div className='space-x-2'>
                                <button
                                    onClick={() => router.push("/login")}
                                    className='bg-primary-100 text-primary-600 hover:bg-primary-200 p-1.5 w-16 rounded-md transition-all'>
                                    Masuk
                                </button>
                                <button
                                    onClick={() => {
                                        router.push("/register");
                                    }}
                                    className='bg-primary-500 text-white hover:bg-primary-600 p-1.5 w-16 rounded-md transition-all'>
                                    Daftar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
