import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import Container from "./Container";

export default function AdminNav() {
    const [pageLoading, setPageLoading] = useState(false);

    const { user, setUser, setToken } = useContext(AppContext);
    const navigations = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
        },
        {
            name: "Program Wakaf",
            href: "/admin/projects",
        },
        {
            name: "Artikel",
            href: "/admin/articles",
        },
        {
            name: "Transaksi",
            href: "/admin/payments",
        },
    ];

    const router = useRouter();
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    const a = router.pathname.split("/");
    const pathname = [a[0], a[1], a[2]].join("/");
    // console.log(pathname);

    const handleLogout = async () => {
        setPageLoading(true);
        await axios
            .get(
                "/logout",

                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
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
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    return (
        // <div className=''>
        //     <Container>
        //         {navigations.map((item, index) => (
        //             <Link exact href={item.href}>
        //                 <a
        //                     className={classNames(
        //                         " font-medium  py-3 md:px-6 px-4 focus:outline-none ",

        //                         pathname === item.href
        //                             ? "border-b-2  text-primary-500 border-primary-500"
        //                             : "text-gray-400",
        //                         router.pathname === item.href
        //                             ? "border-b-2  text-primary-500 border-primary-500"
        //                             : "text-gray-400"
        //                     )}>
        //                     {item.name}
        //                 </a>
        //             </Link>
        //         ))}
        //     </Container>
        // </div>
        <div className='bg-slate-800 sticky top-[68px] rounded-md h-fit shrink-0  w-60 shadow-md border p-4'>
            <div className='flex flex-col items-center w-full space-x-1 mb-2'>
                <div className='relative h-20 w-20 rounded-full overflow-hidden shadow-lg '>
                    <Image src={user.avatar_url} layout='fill' alt='avatar' />
                </div>
                <div className='hidden mt-2 md:block'>
                    <p className='text-sm  text-center whitespace-nowrap w-full  text-white'>
                        {user.full_name}
                    </p>
                    <p className='text-xs  text-center whitespace-nowrap text-white'>
                        {user.role}
                    </p>
                </div>
            </div>
            {navigations.map((item, index) => (
                <Link key={index} href={item.href}>
                    <a
                        className={classNames(
                            "block w-full outline-none whitespace-nowrap text-sm text-left px-2 py-0.5  border-l-2     ",

                            router.pathname === item.href
                                ? "border-primary-500 text-white"
                                : "border-slate-800 text-slate-400",
                            pathname === item.href
                                ? "border-primary-500 text-white"
                                : "border-slate-800 text-slate-400"
                        )}>
                        {item.name}
                    </a>
                </Link>
            ))}
            <button
                onClick={handleLogout}
                className='block w-full py-0.5 text-sm text-left px-2 border-slate-800 text-slate-400  border-l-2 '>
                Logout
            </button>
        </div>
    );
}
