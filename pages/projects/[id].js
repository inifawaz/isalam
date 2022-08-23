import Image from "next/image";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { axios } from "../../lib/axiosInstance";

export default function ProjectDetail({ project }) {
    return (
        <Layout>
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-3'>
                    <div className='relative aspect-square'>
                        <Image src={project.picture_url} layout='fill' />
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    let project = [];
    const { id } = ctx.query;
    await axios.get(`/projects/${id}`).then((response) => {
        console.log(response.data.project);
        project = response.data.project;
    });
    return {
        props: {
            project,
        },
    };
}
