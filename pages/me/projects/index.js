import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import NavSideAuth from "../../../components/NavSideAuth";
import PageLoading from "../../../components/PageLoading";
import PaymentItem from "../../../components/PaymentItem";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";

export default function Index({ projects }) {
    const { pageLoading } = useContext(AppContext);
    const formatDate = (data) => {
        const a = new Date(data);
        const date = a.getDate();
        const month = a.getMonth();
        const year = a.getFullYear();
        const hour = a.getHours() < 10 ? `0${a.getHours()}` : a.getHours();
        const minute =
            a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();

        return `${date}/${month}/${year} ${hour}:${minute}`;
    };
    return (
        <Layout>
            {pageLoading && <PageLoading />}
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-2'>
                    <NavSideAuth />
                </div>
                <div className='col-span-3'>
                    <h1 className='text-2xl text-gray-600 mb-4'>
                        Program Wakaf Saya
                    </h1>
                    {projects.map((item, index) => (
                        <div className='p-4 shadow-md border flex flex-col justify-between '>
                            <div>
                                <small>{formatDate(item.created_at)}</small>

                                <h1 className='text-primary-600'>
                                    {item.name}
                                </h1>
                                <div className='flex space-x-4'>
                                    <p className='bg-secondary-500 text-white px-3 mt-2 text-sm'>
                                        Rp {parseInt(item.project_amount_given)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    let projects = [];
    const user = JSON.parse(getCookie("user", { req, res }));

    const { data } = await axios.get("/me/projects", {
        headers: {
            Authorization: `Bearer ${getCookie("token", { req, res })}`,
        },
    });
    projects = data;
    console.log(projects);
    return {
        props: {
            projects,
        },
    };
}
