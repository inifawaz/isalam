import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PageLoading from "../components/PageLoading";
import ProjectItem from "../components/ProjectItem";
import AppContext from "../context/AppContext";
import { axios } from "../lib/axiosInstance";

export default function Index({ projects }) {
    const { pageLoading, setPageLoading } = useContext(AppContext);

    useEffect(() => {
        setPageLoading(false);
    }, []);

    return (
        <Layout>
            {pageLoading && <PageLoading />}
            <Container className={"grid md:grid-cols-2 gap-8 py-20"}>
                <div>
                    <h2 className='text-4xl font-medium text-primary-600'>
                        Mari Berwakaf Bersama Kami
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ratione doloremque aliquam atque iste neque. Nulla
                        voluptatum vero consequatur deleniti et.
                    </p>
                    <Link href=''>
                        <a className='py-2 px-3 bg-primary-500 text-white rounded-md mt-8 inline-block'>
                            Lihat Program Wakaf
                        </a>
                    </Link>
                </div>
                <div></div>
            </Container>
            <Container className={""}>
                <div className='bg-gradient-to-r from-sky-900 to-primary-600 shadow-xl rounded-md border p-8'>
                    <h3 className='text-2xl text-white t font-semibold mb-4'>
                        Program Wakaf Pilihan
                    </h3>
                    <div className='grid md:grid-cols-3 gap-8'>
                        {projects
                            .filter((item) => item.is_favourite === 1)
                            .map((item, index) => (
                                <ProjectItem
                                    href={`/projects/${item.id}`}
                                    key={index}
                                    data={item}
                                />
                            ))}
                    </div>
                </div>
            </Container>
            <Container className={""}>
                <div className='bg-gradient-to-r from-sky-900 to-primary-600 shadow-xl rounded-md border p-8'>
                    <h3 className='text-2xl text-white t font-semibold mb-4'>
                        Program Wakaf Terbaru
                    </h3>
                    <div className='grid md:grid-cols-3 gap-8'>
                        {projects.slice(0, 3).map((item, index) => (
                            <ProjectItem
                                href={`/projects/${item.id}`}
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps() {
    let projects = [];
    await axios.get("/projects").then((response) => {
        console.log(response.data.projects);
        projects = response.data.projects;
    });
    return {
        props: {
            projects,
        },
    };
}
