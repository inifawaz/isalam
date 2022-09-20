import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { BiTimer } from "react-icons/bi";
import {
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineUserGroup,
} from "react-icons/hi";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";
import formatToCurreny from "../../../utils/formatToCurreny";

const tab = ["Semua", "Berlangsung", "Berakhir", "Disembunyikan"];

export default function Index({ projects }) {
    const { setPageLoading } = useContext(AppContext);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    return (
        <Layout>
            <AdminNav />
            <Container className={"flex justify-between items-start"}>
                <Input placeholder='cari program' />
                <Link href={"/admin/projects/create"}>
                    <a className='bg-primary-500 block rounded-md text-white py-2 px-3'>
                        Buat Program Wakaf Baru
                    </a>
                </Link>
            </Container>
            <Container>
                <Tab.Group className='  bg-white' as={"div"}>
                    <Tab.List
                        className={
                            "border-b bg-primary-50 z-10 sticky top-[58px]"
                        }>
                        {tab.map((item, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    classNames(
                                        " text-sm font-medium  py-3 md:px-6 px-4 focus:outline-none ",
                                        selected
                                            ? "border-b-2  text-primary-500 border-primary-500"
                                            : "text-gray-400"
                                    )
                                }>
                                {item}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className={"md:py-6 py-4"}>
                        <Tab.Panel className={"grid grid-cols-3 gap-8"}>
                            {projects.map((item, index) => (
                                <Link href={`/admin/projects/${item.id}`}>
                                    <div
                                        onClick={() => setPageLoading(true)}
                                        className=' h-fit cursor-pointer'>
                                        <div className='relative shadow-md aspect-square'>
                                            <Image
                                                src={item.picture_url}
                                                layout='fill'
                                                alt='project image'
                                            />
                                        </div>
                                        <div className='p-4 bg-white border shadow-md'>
                                            <div className='flex space-x-4 items-center'>
                                                <div className='flex items-center space-x-1'>
                                                    <HiOutlineTag className='text-gray-400' />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.category}
                                                    </p>
                                                </div>
                                                <div className='flex items-center space-x-1'>
                                                    <HiOutlineLocationMarker className='text-gray-400' />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className='text-primary-600 my-1 text-lg font-medium line-clamp-2'>
                                                {item.name}
                                            </h1>
                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <p className='text-xs text-gray-400 leading-none'>
                                                        Terkumpul (
                                                        {
                                                            item.amount_collected_percent
                                                        }
                                                        %)
                                                    </p>
                                                    <p className='text-sm text-emerald-500'>
                                                        {formatToCurreny(
                                                            item.amount_collected
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className='text-xs text-gray-400 leading-none text-right'>
                                                        Target
                                                    </p>
                                                    <p className='text-sm text-primary-600'>
                                                        {formatToCurreny(
                                                            item.target_amount
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='h-1 rounded-full bg-gray-200 mt-1'>
                                                <div
                                                    className='h-1 rounded-full bg-emerald-500'
                                                    style={{
                                                        width: `${
                                                            item.amount_collected_percent >
                                                            100
                                                                ? "100%"
                                                                : item.amount_collected_percent +
                                                                  "%"
                                                        }`,
                                                    }}></div>
                                            </div>
                                            <div className='flex justify-between items-center mt-2'>
                                                <div className='flex items-center space-x-1'>
                                                    <HiOutlineUserGroup className='text-gray-400' />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.backers_count}{" "}
                                                        Pewakaf
                                                    </p>
                                                </div>
                                                <div className='flex items-center space-x-1'>
                                                    <BiTimer
                                                        size={"1.2em"}
                                                        className='text-gray-400'
                                                    />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.days_left} hari
                                                        lagi
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Container>

            <div></div>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    let projects = [];
    await axios.get(`/projects/`).then((response) => {
        console.log(response.data.projects);
        projects = response.data.projects;
    });

    console.log(projects);

    return {
        props: {
            projects,
        },
    };
}
