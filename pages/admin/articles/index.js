import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineTag } from "react-icons/hi";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";

export default function index({ articles }) {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const tabs = [{ name: "Semua" }, { name: "Disembunyikan" }];
    console.log(articles);
    return (
        <Layout>
            <Container className={"flex space-x-8"}>
                <AdminNav />
                <div className='w-full'>
                    <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                        Artikel
                    </h1>
                    <Tab.Group>
                        <Tab.List className={"border-b mb-4 border-gray-300"}>
                            {tabs.map((item, index) => (
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
                            <Tab.Panel className={"flex flex-col space-y-4"}>
                                {articles.map((item, index) => (
                                    // <Link href={`/admin/articles/${item.id}`}>
                                    <div className=' h-fit flex   transition-all'>
                                        <div className='relative w-60 h-60 shadow-md aspect-square'>
                                            <Image
                                                src={item.featured_image_url}
                                                layout='fill'
                                                alt='project image'
                                            />
                                        </div>
                                        <div className='p-4 bg-white border shadow-md'>
                                            <div className='flex space-x-4 justify-between items-center'>
                                                <div className='flex items-center  space-x-1'>
                                                    <HiOutlineTag className='text-gray-400' />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.topic}
                                                    </p>
                                                </div>
                                                <time className='text-xs text-gray-400'>
                                                    {item.created_at}
                                                </time>
                                            </div>
                                            <div
                                                className=' prose line-clamp-4 w-full '
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}></div>
                                            <div className='flex space-x-4 mt-4'>
                                                <button className='inline-block py-1 px-2 rounded text-sm bg-warning-100  text-warning-600'>
                                                    Hapus
                                                </button>
                                                <Link
                                                    href={`/admin/articles/${item.id}`}>
                                                    <a className='inline-block py-1 px-2 rounded text-sm bg-primary-500 text-white'>
                                                        Detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                ))}
                            </Tab.Panel>
                            <Tab.Panel>
                                {articles
                                    .filter((item) => item.is_shown === 0)
                                    .map((item, index) => (
                                        <Link
                                            href={`/admin/articles/${item.id}`}>
                                            <div className=' h-fit flex cursor-pointer  transition-all'>
                                                <div className='relative w-60 h-60 shadow-md aspect-square'>
                                                    <Image
                                                        src={
                                                            item.featured_image_url
                                                        }
                                                        layout='fill'
                                                        alt='project image'
                                                    />
                                                </div>
                                                <div className='p-4 bg-white border shadow-md'>
                                                    <div className='flex space-x-4 justify-between items-center'>
                                                        <div className='flex items-center space-x-1'>
                                                            <HiOutlineTag className='text-gray-400' />
                                                            <p className='text-xs text-gray-400'>
                                                                {item.topic}
                                                            </p>
                                                        </div>
                                                        <time className='text-xs text-gray-400'>
                                                            {item.created_at}
                                                        </time>
                                                    </div>
                                                    <div
                                                        className=' prose line-clamp-5 w-full '
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.content,
                                                        }}></div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    let articles = [];
    await axios
        .get("/admin/articles", {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            articles = response.data.articles;
            console.log(response.data.articles);
        })
        .catch((error) => {
            console.log(error);
        });
    return {
        props: {
            articles,
        },
    };
}