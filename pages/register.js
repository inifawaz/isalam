import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../components/Button";
import { axios } from "../lib/axiosInstance";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Input from "../components/Input";
import AppContext from "../context/AppContext";

export default function Register() {
    const { setBio, setToken } = useContext(AppContext);
    const formikRegister = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("email tidak boleh kosong"),
            password: yup.string().required("password tidak boleh kosong"),
        }),
        onSubmit: (values) => {
            handleRegister(values);
        },
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleRegister = async (values) => {
        setMessage("");
        setIsLoading(true);
        await axios
            .post("/Register", values)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                const bio = response.data.user.bio;
                setCookie("token", token);
                setCookie("bio", bio);
                setBio(bio);
                setToken(token);
                router.push("/");
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Layout>
            <Container className={"flex items-center justify-center pt-40"}>
                <form
                    onSubmit={formikRegister.handleSubmit}
                    className='max-w-sm w-full rounded-md shadow-md border p-8'>
                    {message && (
                        <div className='bg-warning-50 text-sm p-3 mb-4 text-warning-500'>
                            {message}
                        </div>
                    )}
                    <div className='flex flex-col mb-4'>
                        <Input
                            label={"Email"}
                            type='email'
                            name={"email"}
                            value={formikRegister.values.email}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            error={
                                formikRegister.touched.email &&
                                formikRegister.errors.email
                            }
                        />
                        <Input
                            label={"Password"}
                            type='password'
                            name={"password"}
                            value={formikRegister.values.password}
                            onBlur={formikRegister.handleBlur}
                            onChange={formikRegister.handleChange}
                            error={
                                formikRegister.touched.password &&
                                formikRegister.errors.password
                            }
                        />
                    </div>

                    <Button loading={isLoading}>Daftar</Button>
                    <div className='text-center mt-8'>
                        <small className='text-gray-500'>
                            sudah punya akun?{" "}
                            <span className='font-medium text-primary-500 cursor-pointer'>
                                masuk sekarang
                            </span>
                        </small>
                    </div>
                </form>
            </Container>
        </Layout>
    );
}
