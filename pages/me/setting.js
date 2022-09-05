import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import NavSideAuth from "../../components/NavSideAuth";
import AppContext from "../../context/AppContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { axios } from "../../lib/axiosInstance";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function setting() {
    const router = useRouter();
    const { user, setUser } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: user.full_name,
            address: user.address,
            village: user.village,
            district: user.district,
            city: user.city,
            province: user.province,
            zip_code: user.zip_code,
            avatar_url: user.avatar_url,
            email: user.email,
            phone_number: user.phone_number,
        },
        onSubmit: (values) => {
            handleUpdateuser(values);
        },
    });

    const handleUpdateuser = async (values) => {
        console.log(values);
        setIsLoading(true);
        await axios
            .put(`/me`, values, {
                headers: { Authorization: `Bearer ${getCookie("token")}` },
            })
            .then((response) => {
                console.log(response);
                setCookie("user", response.data.user);
                setUser(response.data.user);
                // router.push("/");
            })
            .catch((error) => {
                console.log(error.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Layout>
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-2'>
                    <NavSideAuth />
                </div>
                <div className='col-span-3'>
                    <h1 className='text-2xl text-gray-600 mb-4'>
                        Atur Profile
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            label='Nama Lengkap'
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                            name={"full_name"}
                        />
                        <Input
                            label='Nomer Telepon'
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            name={"phone_number"}
                        />
                        <Input
                            label='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name={"email"}
                        />
                        <Input
                            label='Alamat'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            name={"address"}
                        />
                        <Input
                            label='Kelurahan'
                            value={formik.values.village}
                            onChange={formik.handleChange}
                            name={"village"}
                        />
                        <Input
                            label='Kecamatan'
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            name={"district"}
                        />
                        <Input
                            label='Kota'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            name={"city"}
                        />
                        <Input
                            label='Provinsi'
                            value={formik.values.province}
                            onChange={formik.handleChange}
                            name={"province"}
                        />
                        <Input
                            label='Kode Pos'
                            value={formik.values.zip_code}
                            onChange={formik.handleChange}
                            name={"zip_code"}
                        />

                        <Button loading={isLoading}>Simpan Perubahan</Button>
                    </form>
                </div>
            </Container>
        </Layout>
    );
}
