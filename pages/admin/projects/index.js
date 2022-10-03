import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import AdminNav from "../../../components/AdminNav";
import AdminProjectItem from "../../../components/AdminProjectItem";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import PageLoading from "../../../components/PageLoading";
import ProjectItem from "../../../components/ProjectItem";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";

export default function Projects() {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const { pageLoading, setPageLoading } = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const getAllProjects = async () => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get("/admin/projects", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const tabs = [
        { name: "Semua", total: projects.length },
        {
            name: "Berlangsung",
            total: projects.filter(
                (item) => item.is_ended === 0 && item.is_shown === 1
            ).length,
        },
        {
            name: "Berakhir",
            total: projects.filter(
                (item) => item.is_ended === 1 && item.is_shown === 1
            ).length,
        },
        {
            name: "Disembunyikan",
            total: projects.filter((item) => item.is_shown === 0).length,
        },
    ];

    useEffect(() => {
        getAllProjects();
    }, []);

    const searchFormik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            searchProject(values);
        },
    });

    const searchProject = async (values) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get("/admin/projects", {
                params: {
                    search: values.search,
                },
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                console.log(response);
                setProjects(response.data.projects);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    return (
        <>
            {pageLoading && <PageLoading />}
            <Layout>
                <Container className={"flex space-x-8 "}>
                    <AdminNav />
                    <div className='w-full'>
                        <div className='flex items-start space-x-4'>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Program Wakaf
                            </h1>

                            <Link href='/admin/projects/create'>
                                <a className='py-2 px-3 text-sm bg-primary-500 text-white rounded-md inline-block'>
                                    Buat Baru
                                </a>
                            </Link>
                        </div>
                        <form
                            onSubmit={searchFormik.handleSubmit}
                            className=' mt-4 grid grid-cols-4 gap-4 items-start '>
                            <div className='col-span-3 flex space-x-4'>
                                <div className='grow'>
                                    <Input
                                        name='search'
                                        value={searchFormik.values.search}
                                        onChange={searchFormik.handleChange}
                                        placeholder={"id project/ nama project"}
                                    />
                                </div>

                                <BiTrash
                                    size={"2.5em"}
                                    onClick={() => {
                                        searchFormik.handleReset();
                                        getAllProjects();
                                    }}
                                    className='inline-block p-2 cursor-pointer  bg-warning-100 text-warning-400 rounded-md'
                                />
                            </div>
                            <Button>Cari</Button>
                        </form>

                        <Tab.Group as={"div"} className='w-full'>
                            <Tab.List
                                className={
                                    "border-b mb-4 w-full border-gray-300"
                                }>
                                {tabs.map((item, index) => (
                                    <Tab
                                        key={index}
                                        className={({ selected }) =>
                                            classNames(
                                                "  whitespace-nowrap outline-none text-sm  py-2 px-4 space-x-4  border-b-2     ",
                                                selected
                                                    ? "border-primary-500  text-primary-500"
                                                    : "border-white text-gray-400"
                                            )
                                        }>
                                        <span>{item.name}</span>
                                        <span>{item.total}</span>
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className={"w-full"}>
                                <Tab.Panel
                                    className={"grid md:grid-cols-2 gap-8"}>
                                    {projects.map((item, index) => (
                                        <ProjectItem
                                            href={`/admin/projects/${item.id}`}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                                </Tab.Panel>
                                <Tab.Panel
                                    className={"grid md:grid-cols-2 gap-8"}>
                                    {projects
                                        .filter(
                                            (item) =>
                                                item.is_shown === 1 &&
                                                item.is_ended === 0
                                        )
                                        .map((item, index) => (
                                            <ProjectItem
                                                href={`/admin/projects/${item.id}`}
                                                data={item}
                                                key={index}
                                            />
                                        ))}
                                </Tab.Panel>
                                <Tab.Panel
                                    className={"grid md:grid-cols-2 gap-8"}>
                                    {projects
                                        .filter(
                                            (item) =>
                                                item.is_ended === 1 &&
                                                item.is_shown === 1
                                        )
                                        .map((item, index) => (
                                            <ProjectItem
                                                href={`/admin/projects/${item.id}`}
                                                data={item}
                                                key={index}
                                            />
                                        ))}
                                </Tab.Panel>
                                <Tab.Panel
                                    className={"grid md:grid-cols-2 gap-8"}>
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
        </>
    );
}
