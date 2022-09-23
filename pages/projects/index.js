import React from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import ProjectItem from "../../components/ProjectItem";
import { axios } from "../../lib/axiosInstance";

export default function index({ projects }) {
    return (
        <Layout>
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
