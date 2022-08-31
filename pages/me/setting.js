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
    const { bio, setBio } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: bio.full_name,
            first_name: bio.first_name,
            last_name: bio.last_name,
            address: bio.address,
            village: bio.village,
            district: bio.district,
            city: bio.city,
            province: bio.province,
            zip_code: bio.zip_code,
            avatar_url: bio.avatar_url,
            email: bio.email,
            phone_number: bio.phone_number,
        },
        onSubmit: (values) => {
            handleUpdateBio(values);
        },
    });

    const handleUpdateBio = async (values) => {
        console.log(values);
        setIsLoading(true);
        await axios
            .put(`/bios/${bio.user_id}`, values, {
                headers: { Authorization: `Bearer ${getCookie("token")}` },
            })
            .then((response) => {
                console.log(response);
                setCookie("bio", response.data.bio);
                setBio(response.data.bio);
                router.push("/");
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
                            label='Nama Depan'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            name={"first_name"}
                        />
                        <Input
                            disabled={true}
                            label='Nama Belakang'
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            name={"last_name"}
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
                        <Button loading={isLoading}>Simpan Perubahan</Button>
                    </form>
                </div>
            </Container>
        </Layout>
    );
}
