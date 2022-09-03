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
            <Container className={""}>
                <div className='shadow border rounded-md overflow-auto'>
                    <table className='w-full table-auto '>
                        <thead className='bg-sky-600'>
                            <tr>
                                <th className='text-white text-left p-2 font-medium'>
                                    Nama
                                </th>
                                <th className='text-white text-left p-2 font-medium whitespace-nowrap'>
                                    Terkumpul
                                </th>
                                <th className='text-white text-left p-2 font-medium whitespace-nowrap'>
                                    Target
                                </th>
                                <th className='text-white text-left p-2 font-medium whitespace-nowrap'>
                                    Mulai
                                </th>
                                <th className='text-white text-left p-2 font-medium whitespace-nowrap'>
                                    Berakhir
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                            <tr className='odd:bg-primary-50 even:bg-white'>
                                <td className='p-2 text-gray-500 whitespace-nowrap md:whitespace-normal'>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Officia harum alias
                                    expedita itaque magnam?
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 4.500.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 20.000.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/09/2022
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/10/2022
                                </td>
                            </tr>
                            <tr className='odd:bg-primary-50 even:bg-white'>
                                <td className='p-2 text-gray-500 whitespace-nowrap md:whitespace-normal'>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Officia harum alias
                                    expedita itaque magnam?
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 4.500.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 20.000.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/09/2022
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/10/2022
                                </td>
                            </tr>
                            <tr className='odd:bg-primary-50 even:bg-white'>
                                <td className='p-2 text-gray-500 whitespace-nowrap md:whitespace-normal'>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Officia harum alias
                                    expedita itaque magnam?
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 4.500.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 20.000.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/09/2022
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/10/2022
                                </td>
                            </tr>
                            <tr className='odd:bg-primary-50 even:bg-white'>
                                <td className='p-2 text-gray-500 whitespace-nowrap md:whitespace-normal'>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Officia harum alias
                                    expedita itaque magnam?
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 4.500.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    Rp 20.000.000
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/09/2022
                                </td>
                                <td className='p-2 text-gray-500 whitespace-nowrap'>
                                    28/10/2022
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
