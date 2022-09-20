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
            <Container className={"grid md:grid-cols-3 min-h-screen gap-8"}>
                {projects.map((item, index) => (
                    <ProjectItem
                        href={`/projects/${item.id}`}
                        key={index}
                        data={item}
                    />
                ))}
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
