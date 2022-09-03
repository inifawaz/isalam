import { useFormik } from "formik";
import React, { useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateProject() {
    const [fileDataURL, setFileDataURL] = useState(null);
    const [picture, setPicture] = useState(null);
    const formik = useFormik({
        initialValues: {
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
            target_amount: 0,
            first_choice_amount: 0,
            second_choice_amount: 0,
            third_choice_amount: 0,
            fourth_choice_amount: 0,
        },
    });
    return (
        <Layout>
            <AdminNav />
            <Container>
                <h2 className='text-3xl text-primary-600'>
                    Buat Program Wakaf Baru
                </h2>
            </Container>
            <Container>
                <form className=''>
                    <Input
                        label={"Nama Program Wakaf"}
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name}
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
                        name='facebook_url'
                        value={formik.values.facebook_url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.facebook_url &&
                            formik.errors.facebook_url
                        }
                    />

                    <label className='block mb-1'>Foto Program Wakaf</label>
                    <input
                        type={"file"}
                        accept='image/*'
                        className='mb-2'
                        onChange={(e) => {
                            let pic = URL.createObjectURL(e.target.files[0]);
                            setPicture(pic);
                        }}
                    />
                    <div className='w-80 h-80'>
                        <img
                            className='w-full'
                            src={
                                picture
                                    ? picture
                                    : "https://via.placeholder.com/320.png?text=foto"
                            }
                            alt=''
                        />
                    </div>
                    <div className='mt-8 min-h-screen'>
                        <p>Deskripsi Program Wakaf</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data=''
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    </div>
                </form>
            </Container>
        </Layout>
    );
}
