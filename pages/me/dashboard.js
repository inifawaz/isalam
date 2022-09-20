import { Tab } from "@headlessui/react";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import PaymentItem from "../../components/PaymentItem";
import PageLoading from "../../components/PageLoading";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";
import formatToCurreny from "../../utils/formatToCurreny";

import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const { user, setUser, setToken } = useContext(AppContext);
    const [pageLoading, setPageLoading] = useState(true);
    const [myStatistics, setMyStatistics] = useState([]);
    const [myPayments, setMyPayments] = useState([]);
    const [myProjects, setMyProjects] = useState([]);
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const tabs = [
        {
            name: "Dashboard",
        },
        {
            name: "Pembayaran",
        },
        {
            name: "Wakaf Saya",
        },
    ];

    const paymentTabs = [
        { name: "Menunggu" },
        { name: "Berhasil" },
        { name: "Gagal" },
    ];

    const getMyDashboardData = async () => {
        await axios
            .get(`/me/dashboard`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                console.log(response);
                setMyStatistics(response.data.statistics);
                setMyPayments(response.data.payments);
                setMyProjects(response.data.projects);
                setPageLoading(false);
            });
    };

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

    useEffect(() => {
        getMyDashboardData();
    }, []);
    return (
        <Layout>
            {pageLoading && <PageLoading />}
            <Container className={""}>
                <Tab.Group as={"div"} vertical className={"flex space-x-8"}>
                    <div className='bg-slate-800 sticky top-[68px] rounded-md h-fit shrink-0  w-60 shadow-md border p-4'>
                        <div className='flex flex-col items-center w-full space-x-1 mb-2'>
                            <div className='relative h-20 w-20 rounded-full overflow-hidden shadow-lg '>
                                <Image
                                    src={user.avatar_url}
                                    layout='fill'
                                    alt='avatar'
                                />
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
                        <Tab.List>
                            {tabs.map((item, index) => (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        classNames(
                                            "block w-full outline-none whitespace-nowrap text-sm text-left px-2 py-0.5  border-l-2     ",
                                            selected
                                                ? "border-primary-500 text-white"
                                                : "border-slate-800 text-slate-400"
                                        )
                                    }>
                                    {item.name}
                                </Tab>
                            ))}
                        </Tab.List>
                        <button
                            onClick={handleLogout}
                            className='block w-full py-0.5 text-sm text-left px-2 border-slate-800 text-slate-400  border-l-2 '>
                            Logout
                        </button>
                    </div>

                    <Tab.Panels className={"grow"}>
                        <Tab.Panel>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Dashboard
                            </h1>
                            <div className='grid md:grid-cols-3 gap-4'>
                                <div className='p-4 shadow-md border'>
                                    <p className='text-sm'>Total Wakaf Saya</p>
                                    <p className='text-xl font-medium'>
                                        {myStatistics.total_projects ?? 0}
                                    </p>
                                </div>
                                <div className='p-4 shadow-md border'>
                                    <p className='text-sm'>
                                        Total Nominal Diberikan
                                    </p>
                                    <p className='text-xl font-medium'>
                                        {formatToCurreny(
                                            myStatistics.total_given_amount ?? 0
                                        )}
                                    </p>
                                </div>
                                <div className='p-4 shadow-md border'>
                                    <p className='text-sm'>
                                        Total Pembayaran Berhasil
                                    </p>
                                    <p className='text-xl font-medium'>
                                        {myStatistics.total_transactions ?? 0}x
                                    </p>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Pembayaran
                            </h1>
                            <Tab.Group>
                                <Tab.List
                                    className={"border-b mb-4 border-gray-300"}>
                                    {paymentTabs.map((item, index) => (
                                        <Tab
                                            key={index}
                                            className={({ selected }) =>
                                                classNames(
                                                    "  whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2     ",
                                                    selected
                                                        ? "border-primary-500  text-primary-500"
                                                        : "border-white text-gray-400"
                                                )
                                            }>
                                            {item.name}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        {myPayments
                                            .filter(
                                                (item) =>
                                                    item.status.statusCode ===
                                                    "01"
                                            )
                                            .map((item, index) => (
                                                <PaymentItem
                                                    data={item}
                                                    key={index}
                                                />
                                            ))}
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        {myPayments
                                            .filter(
                                                (item) =>
                                                    item.status.statusCode ===
                                                    "00"
                                            )
                                            .map((item, index) => (
                                                <PaymentItem
                                                    data={item}
                                                    key={index}
                                                />
                                            ))}
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        {myPayments
                                            .filter(
                                                (item) =>
                                                    item.status.statusCode ===
                                                    "02"
                                            )
                                            .map((item, index) => (
                                                <PaymentItem
                                                    data={item}
                                                    key={index}
                                                />
                                            ))}
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </Tab.Panel>
                        <Tab.Panel>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Wakaf Saya
                            </h1>
                            <div>
                                {myProjects.map((item, index) => (
                                    <div className='p-6 bg-white shadow-md border '>
                                        <time className='text-sm text-gray-400'>
                                            {item.created_at}
                                        </time>

                                        <Link href={`/projects/${item.id}`}>
                                            <h2 className='text-primary-600 mb-2 cursor-pointer text-xl'>
                                                {item.name}
                                            </h2>
                                        </Link>
                                        <div className='flex space-x-8'>
                                            <div>
                                                <p className='text-sm text-gray-400'>
                                                    Total Nominal Wakaf Anda
                                                </p>
                                                <p className='text-secondary-500 font-semibold'>
                                                    {formatToCurreny(
                                                        item.total_given_amount
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Container>
        </Layout>
    );
}
