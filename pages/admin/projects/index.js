import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import AdminProjectItem from "../../../components/AdminProjectItem";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import { axios } from "../../../lib/axiosInstance";

export default function projects() {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const [projects, setProjects] = useState([]);
    const getAllProjects = async () => {
        await axios
            .get("/admin/projects", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
            });
    };

    const tabs = [
        { name: "Semua" },
        { name: "Berlangsung" },
        { name: "Berakhir" },
        { name: "Disembunyikan" },
    ];

    useEffect(() => {
        getAllProjects();
    }, []);

    return (
        <Layout>
            <Container className={"flex space-x-8 "}>
                <AdminNav />
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                            Program Wakaf
                        </h1>
                        <Link href='/admin/projects/create'>
                            <a className='py-2 px-3 text-sm bg-primary-500 text-white rounded-md inline-block'>
                                Buat Baru
                            </a>
                        </Link>
                    </div>

                    <Tab.Group as={"div"} className='w-full'>
                        <Tab.List
                            className={"border-b mb-4 w-full border-gray-300"}>
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
                        <Tab.Panels className={"w-full"}>
                            <Tab.Panel className={"grid md:grid-cols-2 gap-8"}>
                                {projects.map((item, index) => (
                                    <ProjectItem
                                        href={`/admin/projects/${item.id}`}
                                        data={item}
                                        key={index}
                                    />
                                ))}
                            </Tab.Panel>
                            <Tab.Panel className={"grid md:grid-cols-2 gap-8"}>
                                {projects
                                    .filter((item) => item.is_shown === 1)
                                    .map((item, index) => (
                                        <ProjectItem
                                            href={`/admin/projects/${item.id}`}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                            </Tab.Panel>
                            <Tab.Panel className={"grid md:grid-cols-2 gap-8"}>
                                {projects
                                    .filter((item) => item.is_ended === 1)
                                    .map((item, index) => (
                                        <ProjectItem
                                            href={`/admin/projects/${item.id}`}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                            </Tab.Panel>
                            <Tab.Panel className={"grid md:grid-cols-2 gap-8"}>
                                {projects
                                    .filter((item) => item.is_shown === 0)
                                    .map((item, index) => (
                                        <ProjectItem
                                            href={`/admin/projects/${item.id}`}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </Container>
        </Layout>
    );
}
