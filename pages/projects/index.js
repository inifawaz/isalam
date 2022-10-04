import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import PageLoading from "../../components/PageLoading";
import ProjectItem from "../../components/ProjectItem";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";

export default function Index({ projects: a, categories, paginations: b }) {
    const [projects, setProjects] = useState(a);
    const [paginations, setPaginations] = useState(b);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    const router = useRouter();
    const { category } = router.query;
    const { pageLoading, setPageLoading } = useContext(AppContext);
    useEffect(() => {
        setPageLoading(false);
    }, [router]);

    const goToPage = async (link) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get(link, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.data);
                setPaginations(response.data.meta.links);
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
                {/* <Container className={"grid md:grid-cols-3 min-h-screen gap-8"}>
                {projects.map((item, index) => (
                    <ProjectItem
                        href={`/projects/${item.id}`}
                        key={index}
                        data={item}
                    />
                ))}
            </Container> */}
                <Container>
                    <h2 className='text-2xl font-medium text-gray-500'>
                        Program Wakaf
                    </h2>
                    <div className='border-b mb-4 border-gray-300'>
                        <button
                            onClick={() => {
                                setPageLoading(true);
                                router.push({
                                    pathname: "/projects",
                                });
                            }}
                            className={`whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2 ${
                                Object.keys(router.query).length < 1
                                    ? "border-primary-500  text-primary-500"
                                    : "border-white text-gray-400"
                            }`}>
                            Semua
                        </button>
                        {categories.map((item, index) => (
                            <button
                                onClick={() => {
                                    setPageLoading(true);
                                    router.push({
                                        pathname: "/projects",
                                        query: {
                                            category: item.name,
                                        },
                                    });
                                }}
                                key={index}
                                className={`whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2 ${
                                    item.name === category
                                        ? "border-primary-500  text-primary-500"
                                        : "border-white text-gray-400"
                                }`}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <div className={"grid md:grid-cols-3 gap-8"}>
                        {projects.map((item, index) => (
                            <ProjectItem
                                href={`/projects/${item.id}`}
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
                    <div onClick={() => console.log(paginations)}>
                        {paginations.map((item, index) =>
                            item.url === null ? null : (
                                <button
                                    disabled={item.url === null ? true : false}
                                    onClick={() => {
                                        goToPage(item.url);
                                    }}
                                    key={index}
                                    className={`py-1  mt-4 px-3 text-sm rounded-md  mr-2 ${
                                        item.active
                                            ? "bg-sky-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    } `}
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}></button>
                            )
                        )}
                    </div>
                </Container>
            </Layout>
        </>
    );
}

export async function getServerSideProps(ctx) {
    let projects = [];
    let paginations = [];
    console.log(ctx);
    const params = ctx.query ?? null;
    let categories = [];
    await axios.get(`/projects`, { params }).then((response) => {
        projects = response.data.data;
        paginations = response.data.meta.links;
    });
    await axios.get(`/categories`).then((response) => {
        categories = response.data.categories;
    });
    return {
        props: {
            projects,
            categories,
            paginations,
        },
    };
}
