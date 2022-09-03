import React, { useContext, useState } from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import { useFormik } from "formik";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";
import { RadioGroup } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Button from "../../../components/Button";
import { useRouter } from "next/router";

export default function Createtransaction({ project, paymentMethods, amount }) {
    const router = useRouter();
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const { user, token } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        paymentMethod: "",
        paymentName: "",
        paymentImage: "",
        totalFee: "0",
    });
    const formikCreateTransaction = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: user.full_name,
            phone_number: user.phone_number,
            email: user.email,
            title: project.title,
            amount: amount,
        },
    });

    const handleCreateTransation = async () => {
        setIsLoading(true);
        const project_id = project.id;
        const project_amount_given = parseInt(
            formikCreateTransaction.values.amount
        );

        const paymentMethod = selectedPaymentMethod.paymentMethod;
        const transaction_fee = 0;
        console.log(project_id);
        console.log(project_amount_given);
        console.log(paymentMethod);

        await axios
            .post(
                "/payments",
                {
                    project_id,
                    project_amount_given,
                    paymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                setIsLoading(false);
                console.log(response);
                window.open(response.data.payment.payment_url, "_blank");
                router.push("/");
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Layout>
            <Container className={"min-h-screen"}>
                <div className='bg-white shadow-md max-w-xl mx-auto p-6 border'>
                    <div>
                        <div>
                            <p className='text-gray-500 tracking-wider text-xl mb-4 font-medium'>
                                Pilih Metode Pembayaran
                            </p>
                            <RadioGroup
                                className={
                                    "grid grid-cols-2 md:grid-cols-4 gap-4"
                                }
                                value={selectedPaymentMethod}
                                onChange={setSelectedPaymentMethod}>
                                {paymentMethods.map((item, index) => (
                                    <RadioGroup.Option key={index} value={item}>
                                        {({ checked }) => (
                                            <div className='flex flex-col  cursor-pointer items-center '>
                                                <div
                                                    className={classNames(
                                                        "w-full border-2 p-2 rounded-md",
                                                        checked
                                                            ? "border-secondary-500 shadow-md"
                                                            : ""
                                                    )}>
                                                    <div
                                                        className={classNames(
                                                            "  w-full h-14  relative  rounded-md",
                                                            checked ? "" : ""
                                                        )}>
                                                        <Image
                                                            src={
                                                                item.paymentImage
                                                            }
                                                            layout='fill'
                                                            objectFit='contain'
                                                            alt='payment image'
                                                        />
                                                    </div>
                                                </div>

                                                <span
                                                    className={
                                                        checked
                                                            ? "text-secondary-500 text-sm"
                                                            : "text-gray-500 text-sm"
                                                    }>
                                                    {item.paymentName}
                                                </span>
                                            </div>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className=' my-8 py-2 border-primary-500 border-y-2 border-dashed '>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Nominan wakaf</p>
                            <p className='text-sm'>
                                Rp {formikCreateTransaction.values.amount}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Biaya pemeliharaan sistem</p>
                            <p className='text-sm'>
                                Rp {project.maintenance_fee}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>
                                Biaya Transaksi (
                                {selectedPaymentMethod.paymentName})
                            </p>
                            <p className='text-sm'>
                                Rp {selectedPaymentMethod.totalFee}
                            </p>
                        </div>
                        <div className='flex justify-between '>
                            <p className=' font-semibold text-secondary-500'>
                                Total Pembayaran
                            </p>
                            <p className=' font-semibold text-secondary-500'>
                                Rp{" "}
                                {parseInt(selectedPaymentMethod.totalFee) +
                                    parseInt(
                                        formikCreateTransaction.values.amount
                                    ) +
                                    parseInt(project.maintenance_fee)}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleCreateTransation}
                        color={"secondary"}
                        loading={isLoading}
                        disabled={
                            formikCreateTransaction.values.amount === "0" ||
                            selectedPaymentMethod.totalFee === "0"
                                ? true
                                : false
                        }>
                        Lakukan Pembayaran
                    </Button>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let project = [];
    const { id, amount } = query;
    await axios.get(`/projects/${id}`).then((response) => {
        console.log(response.data.project);
        project = response.data.project;
    });
    let paymentMethods = [];
    await axios
        .post(
            "/getpaymentmethod",
            {
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${getCookie("token", { req, res })}`,
                },
            }
        )
        .then((response) => {
            console.log(response.data.payment_method);
            paymentMethods = response.data.payment_methods;
        })
        .catch((error) => {
            console.log(error.response);
        });
    console.log(query);
    return {
        props: {
            project,
            paymentMethods,
            amount,
        },
    };
}
