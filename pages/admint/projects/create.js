import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import React, { useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";

import MyEditor from "../../../components/MyEditor";
import { axios } from "../../../lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateProject() {
    const router = useRouter();
    const [editor, setEditor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [picture, setPicture] = useState(null);
    const formik = useFormik({
        initialValues: {
            location: "",
            name: "",
            category_id: "",
            description: "",
            picture_url: "",
            instagram_url: "",
            facebook_url: "",
            twitter_url: "",
            start_date: "",
            end_date: "",
            maintenance_fee: 5000,
            target_amount: "",
            first_choice_amount: "",
            second_choice_amount: "",
            third_choice_amount: "",
            fourth_choice_amount: "",
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("picture_url", featuredImage);
        formData.append("description", editor);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        await axios
            .post("/projects", formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
                router.push("/admin/projects");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Layout>
            <AdminNav />
            <Container>
                <h2 className='text-3xl text-primary-600'>
                    Buat Program Wakaf Baru
                </h2>
            </Container>
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
                                setFeaturedImage(e.target.files[0]);
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
                        error={formik.touched.name && formik.errors.name}
                    />

                    <MyEditor
                        label={"Deskripi"}
                        handleChange={(data) => {
                            setEditor(data);
                        }}
                        data={editor}
                    />
                    <Input
                        label={"Lokasi"}
                        name='location'
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.location && formik.errors.location
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
                        value={formik.values.first_choice_amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.first_choice_amount &&
                            formik.errors.first_choice_amount
                        }
                    />
                    <Input
                        label={"Pilihan Nominal Wakaf Kedua"}
                        name='second_choice_amount'
                        type={"number"}
                        value={formik.values.second_choice_amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.second_choice_amount &&
                            formik.errors.second_choice_amount
                        }
                    />
                    <Input
                        label={"Pilihan Nominal Wakaf Ketiga"}
                        name='third_choice_amount'
                        type={"number"}
                        value={formik.values.third_choice_amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.third_choice_amount &&
                            formik.errors.third_choice_amount
                        }
                    />
                    <Input
                        label={"Pilihan Nominal Wakaf Keempat"}
                        name='fourth_choice_amount'
                        type={"number"}
                        value={formik.values.fourth_choice_amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.fourth_choice_amount &&
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
                        <a className='text-center block mt-8'>Kembali</a>
                    </Link>
                </form>
            </Container>
        </Layout>
    );
}
