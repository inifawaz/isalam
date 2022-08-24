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

export default function createtransaction({ project, paymentMethods }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const { bio, token } = useContext(AppContext);
    const choicesAmount = [
        project.first_choice_amount,
        project.second_choice_amount,
        project.third_choice_amount,
        project.fourth_choice_amount,
    ];
    const [choiceAmount, setChoiceAmount] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
    const formikCreateTransaction = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: bio.full_name,
            phone_number: bio.phone_number,
            email: bio.email,
            title: project.title,
            amount: choiceAmount,
        },
    });
    return (
        <Layout>
            <Container className={"min-h-screen"}>
                <form className='bg-white shadow-md max-w-xl mx-auto p-6 border'>
                    <div>
                        <Input
                            label={"Nama Lengkap"}
                            value={formikCreateTransaction.values.full_name}
                            disabled={true}
                        />
                        <Input
                            label={"Nomer Telepon"}
                            value={formikCreateTransaction.values.phone_number}
                            disabled={true}
                        />
                        <Input
                            label={"Email"}
                            value={formikCreateTransaction.values.email}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <Input
                            label={"Program Wakaf"}
                            value={formikCreateTransaction.values.title}
                            disabled={true}
                        />
                        <div className='mb-4'>
                            <p className='text-gray-500 tracking-wider '>
                                Pilih Nominal Wakaf
                            </p>
                            <RadioGroup
                                className={"flex flex-wrap"}
                                value={choiceAmount}
                                onChange={setChoiceAmount}>
                                {choicesAmount.map((item, index) => (
                                    <RadioGroup.Option key={index} value={item}>
                                        {({ checked }) => (
                                            <div className='flex cursor-pointer ml-1 mr-4 items-center space-x-2'>
                                                <div
                                                    className={classNames(
                                                        "h-2 w-2 ring-1 ring-gray-400 ring-offset-2 rounded-full",
                                                        checked
                                                            ? "bg-secondary-500"
                                                            : ""
                                                    )}></div>
                                                <span
                                                    className={
                                                        checked
                                                            ? "text-secondary-500"
                                                            : "text-gray-500"
                                                    }>
                                                    Rp {item}
                                                </span>
                                            </div>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <p className='text-gray-500 tracking-wider '>
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
                    <div className=' my-8 py-2 border-warning-500 border-y-2 border-dashed '>
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
                        <div className='flex justify-between'>
                            <p className=' font-semibold'>Total Pembayaran</p>
                            <p className=' font-semibold'>
                                Rp{" "}
                                {parseInt(selectedPaymentMethod.totalFee) +
                                    parseInt(
                                        formikCreateTransaction.values.amount
                                    )}
                            </p>
                        </div>
                    </div>
                </form>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let project = [];
    const { id } = query;
    await axios.get(`/projects/${id}`).then((response) => {
        console.log(response.data.project);
        project = response.data.project;
    });
    let paymentMethods = [];
    await axios
        .post(
            "/getpaymentmethod",
            {
                amount: 20000,
            },
            {
                headers: {
                    Authorization: `Bearer ${getCookie("token", { req, res })}`,
                },
            }
        )
        .then((response) => {
            console.log(response.data.payment_method);
            paymentMethods = response.data.payment_method;
        })
        .catch((error) => {
            console.log(error.response);
        });
    return {
        props: {
            project,
            paymentMethods,
        },
    };
}
