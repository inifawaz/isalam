import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiTimer } from "react-icons/bi";
import {
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineUserGroup,
} from "react-icons/hi";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import UpdateItem from "../../../components/UpdateItem";
import { axios } from "../../../lib/axiosInstance";
import formatToCurreny from "../../../utils/formatToCurreny";
import { useFormik } from "formik";
// import MyEditor from "../../../components/MyEditor";
import Button from "../../../components/Button";
import dynamic from "next/dynamic";
import Editor from "../../../components/Editor";
import { useRouter } from "next/router";

const tab = ["Transaksi", "Update", "Detail Program"];

export default function Index({ project }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    const [transactions, setTransactions] = useState(project.transactions);
    const [updates, setUpdates] = useState(project.updates);
    const [picture, setPicture] = useState(null);
    const [editor, setEditor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            location: project.location,
            name: project.name,
            category_id: project.category_id,
            description: project.description,
            picture_url: project.picture_url,
            instagram_url: project.instagram_url,
            facebook_url: project.facebook_url,
            twitter_url: project.twitter_url,
            start_date: project.start_date,
            end_date: project.end_date,
            maintenance_fee: project.maintenance_fee,
            target_amount: project.target_amount,
            first_choice_amount: project.first_choice_amount,
            second_choice_amount: project.second_choice_amount,
            third_choice_amount: project.third_choice_amount,
            fourth_choice_amount: project.fourth_choice_amount,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const router = useRouter();
    useEffect(() => {
        console.log(router.query);
    }, []);
    return (
        <Layout>
            <AdminNav />
            <Container>
                <h1 className='text-3xl text-primary-600 mb-8'>
                    {project.name}
                </h1>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='shadow border p-4 bg-secondary-500 '>
                        <h4 className='text-white text-sm font-light'>
                            Total Nominal Wakaf Yang Didapat
                        </h4>
                        <p className='text-2xl font-medium text-white'>
                            {formatToCurreny(project.amount_collected)}
                        </p>
                    </div>
                    <div className='shadow border p-4 bg-primary-500'>
                        <h4 className='text-white'>Target Nominal Wakaf</h4>
                        <p className='text-2xl text-white'>
                            {formatToCurreny(project.target_amount)}
                        </p>
                    </div>
                    <div className='shadow border p-4 bg-warning-500'>
                        <h4 className='text-white'>Sisa Waktu</h4>
                        <p className='text-2xl text-white'>
                            {project.days_left} hari lagi
                        </p>
                    </div>
                </div>
            </Container>
            <Container>
                <Tab.Group>
                    <Tab.List className={"mb-4"}>
                        {tab.map((item, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    classNames(
                                        "  font-medium  py-3 md:px-6 px-4 focus:outline-none ",
                                        selected
                                            ? "border-b-2  text-primary-500 border-primary-500"
                                            : "text-gray-400"
                                    )
                                }>
                                {item}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <table className='w-full table-auto bg-white shadow-md'>
                                <thead className='bg-sky-700 text-sm'>
                                    <tr>
                                        <th className='font-medium text-left py-2 px-3 text-white'>
                                            Waktu
                                        </th>
                                        <th className='font-medium text-left py-2 px-3 text-white'>
                                            Nama
                                        </th>
                                        <th className='font-medium text-left py-2 px-3 text-white'>
                                            Nominal
                                        </th>
                                        <th className='font-medium text-left py-2 px-3 text-white'>
                                            Metode Pembayaran
                                        </th>
                                        <th className='font-medium text-left py-2 px-3 text-white'>
                                            Referensi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y'>
                                    {transactions.map((item, index) => (
                                        <tr
                                            className='odd:bg-gray-100 text-sm even:bg-white  hover:bg-primary-50 '
                                            key={index}>
                                            <td className='py-2 px-3 text-gray-500'>
                                                {item.paid_at}
                                            </td>
                                            <td className='py-2 px-3 text-gray-500'>
                                                {item.full_name}
                                            </td>
                                            <td className='py-2 px-3 text-gray-500'>
                                                {formatToCurreny(
                                                    item.project_amount_given
                                                )}
                                            </td>
                                            <td className='py-2 px-3 text-gray-500'>
                                                {item.payment_method_name}
                                            </td>
                                            <td className='py-2 px-3 text-gray-500'>
                                                {item.reference}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Tab.Panel>
                        <Tab.Panel className={"grid md:grid-cols-5"}>
                            <div className='col-span-3'>
                                <ol className='border-l relative  border-gray-300'>
                                    {updates.map((item, index) => (
                                        <UpdateItem data={item} />
                                    ))}
                                </ol>
                            </div>
                            <div>
                                <Link
                                    href={`/admin/projects/${project.id}/updates`}>
                                    <a className='bg-primary-500 text-white block py-2 px-3 text-sm rounded-md'>
                                        Tambah
                                    </a>
                                </Link>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <Container>
                                <form
                                    className='bg-white max-w-2xl shadow-md border rounded-md md:p-8 p-4'
                                    onSubmit={formik.handleSubmit}>
                                    <div className='mb-4'>
                                        <label className='text-gray-500 tracking-wider block mb-1'>
                                            Foto Program Wakaf
                                        </label>
                                        <input
                                            type={"file"}
                                            accept='image/*'
                                            className='mb-2'
                                            onChange={(e) => {
                                                let pic = URL.createObjectURL(
                                                    e.target.files[0]
                                                );
                                                setPicture(pic);
                                                setFeaturedImage(
                                                    e.target.files[0]
                                                );
                                            }}
                                            name='featured_image'
                                        />
                                        <div className='aspect-square'>
                                            <img
                                                className='w-full'
                                                src={
                                                    picture
                                                        ? picture
                                                        : "https://via.placeholder.com/1080.png?text=1:1"
                                                }
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        label={"Nama"}
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                    />

                                    <Editor
                                        label={"Deskripi"}
                                        handleChange={(data) => {
                                            setEditor(data);
                                        }}
                                        data={editor}
                                        // editorLoaded={editorLoaded}
                                    />
                                    <Input
                                        label={"Lokasi"}
                                        name='location'
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.location &&
                                            formik.errors.location
                                        }
                                    />
                                    <div className='flex space-x-4 '>
                                        <Input
                                            label={"Mulai"}
                                            type='date'
                                            name='start_date'
                                            value={formik.values.start_date}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.start_date &&
                                                formik.errors.start_date
                                            }
                                        />
                                        <Input
                                            label={"Sampai"}
                                            type='date'
                                            name='end_date'
                                            value={formik.values.end_date}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.end_date &&
                                                formik.errors.end_date
                                            }
                                        />
                                    </div>
                                    <Input
                                        label={"Target Nominal Wakaf"}
                                        name='target_amount'
                                        type={"number"}
                                        value={formik.values.target_amount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.target_amount &&
                                            formik.errors.target_amount
                                        }
                                    />
                                    <Input
                                        label={"Biaya pemeliharaan sistem"}
                                        name='maintenance_fee'
                                        type={"number"}
                                        value={formik.values.maintenance_fee}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.maintenance_fee &&
                                            formik.errors.maintenance_fee
                                        }
                                    />
                                    <Input
                                        label={"Pilihan Nominal Wakaf Pertama"}
                                        name='first_choice_amount'
                                        type={"number"}
                                        value={
                                            formik.values.first_choice_amount
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched
                                                .first_choice_amount &&
                                            formik.errors.first_choice_amount
                                        }
                                    />
                                    <Input
                                        label={"Pilihan Nominal Wakaf Kedua"}
                                        name='second_choice_amount'
                                        type={"number"}
                                        value={
                                            formik.values.second_choice_amount
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched
                                                .second_choice_amount &&
                                            formik.errors.second_choice_amount
                                        }
                                    />
                                    <Input
                                        label={"Pilihan Nominal Wakaf Ketiga"}
                                        name='third_choice_amount'
                                        type={"number"}
                                        value={
                                            formik.values.third_choice_amount
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched
                                                .third_choice_amount &&
                                            formik.errors.third_choice_amount
                                        }
                                    />
                                    <Input
                                        label={"Pilihan Nominal Wakaf Keempat"}
                                        name='fourth_choice_amount'
                                        type={"number"}
                                        value={
                                            formik.values.fourth_choice_amount
                                        }
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched
                                                .fourth_choice_amount &&
                                            formik.errors.fourth_choice_amount
                                        }
                                    />
                                    <Input
                                        label={"Instagram Url"}
                                        name='instagram_url'
                                        value={formik.values.instagram_url}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.instagram_url &&
                                            formik.errors.instagram_url
                                        }
                                    />
                                    <Input
                                        label={"Facebook Url"}
                                        name='facebook_url'
                                        value={formik.values.facebook_url}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.facebook_url &&
                                            formik.errors.facebook_url
                                        }
                                    />
                                    <Input
                                        label={"Twitter Url"}
                                        name='twitter_url'
                                        value={formik.values.twitter_url}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.twitter_url &&
                                            formik.errors.twitter_url
                                        }
                                    />

                                    <Button loading={isLoading}>Simpan</Button>
                                    <Link href={"/admin/projects"}>
                                        <a className='text-center block mt-8'>
                                            Kembali
                                        </a>
                                    </Link>
                                </form>
                            </Container>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, query }) {
    const { id } = query;
    let project = [];
    let transactions = [];
    let backers = [];
    await axios
        .get(`/admin/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            console.log(response.data.project);
            project = response.data.project;
            transactions = response.data.project.transactions;
            backers = response.data.project.backers;
            console.log(getCookie("token", { req, res }));
        });

    return {
        props: {
            project,
        },
    };
}
