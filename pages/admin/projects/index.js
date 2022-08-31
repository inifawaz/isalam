import Image from "next/image";
import Link from "next/link";
import React from "react";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import { axios } from "../../../lib/axiosInstance";

export default function Index({ projects }) {
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
            <Container className={"grid md:grid-cols-3 gap-8"}>
                {projects.map((item, index) => (
                    <ProjectItem data={item} />
                ))}
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
