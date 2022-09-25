import { Tab } from "@headlessui/react";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import ProjectItem from "../../components/ProjectItem";
import { axios } from "../../lib/axiosInstance";

export default function index({ projects, categories }) {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    return (
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
                <Tab.Group>
                    <Tab.List className={"border-b mb-4 border-gray-300"}>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "  whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2     ",
                                    selected
                                        ? "border-primary-500  text-primary-500"
                                        : "border-white text-gray-400"
                                )
                            }>
                            Semua
                        </Tab>
                        {categories.map((item, index) => (
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
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "  whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2     ",
                                    selected
                                        ? "border-primary-500  text-primary-500"
                                        : "border-white text-gray-400"
                                )
                            }>
                            Telah Berakhir
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className={"grid md:grid-cols-3 gap-8"}>
                            {projects.map((item, index) => (
                                <ProjectItem
                                    href={`/projects/${item.id}`}
                                    key={index}
                                    data={item}
                                />
                            ))}
                        </Tab.Panel>
                        {categories.map((item, index) => {
                            const categoriyName = item.name;
                            return (
                                <Tab.Panel
                                    key={index}
                                    className={"grid md:grid-cols-3 gap-8"}>
                                    {projects
                                        .filter(
                                            (item) =>
                                                item.category === categoriyName
                                        )
                                        .map((item, index) => (
                                            <ProjectItem
                                                href={`/projects/${item.id}`}
                                                key={index}
                                                data={item}
                                            />
                                        ))}
                                </Tab.Panel>
                            );
                        })}
                        <Tab.Panel className={"grid md:grid-cols-3 gap-8"}>
                            {projects
                                .filter((item) => item.is_ended === 1)
                                .map((item, index) => (
                                    <ProjectItem
                                        href={`/projects/${item.id}`}
                                        key={index}
                                        data={item}
                                    />
                                ))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps() {
    let projects = [];
    let categories = [];
    await axios.get("/projects").then((response) => {
        projects = response.data.projects;
        categories = response.data.categories;
    });
    return {
        props: {
            projects,
            categories,
        },
    };
}
