import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Container from "./Container";

export default function AdminNav() {
    const navigations = [
        {
            name: "Overview",
            href: "/admin",
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
            href: "/admin/transactions",
        },
    ];

    const router = useRouter();
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    const a = router.pathname.split("/");
    const pathname = [a[0], a[1], a[2]].join("/");

    return (
        <div className=''>
            <Container>
                {navigations.map((item, index) => (
                    <Link exact href={item.href}>
                        <a
                            className={classNames(
                                "py-3 px-4 inline-block",

                                pathname === item.href
                                    ? "border-b-2 border-primary-500"
                                    : "",
                                router.pathname === item.href
                                    ? "border-b-2 border-primary-500"
                                    : ""
                            )}>
                            {item.name}
                        </a>
                    </Link>
                ))}
            </Container>
        </div>
    );
}
