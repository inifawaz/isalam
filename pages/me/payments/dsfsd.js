import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";
import formatToCurreny from "../../../utils/formatToCurreny";
import Image from "next/image";
import { BiTimer } from "react-icons/bi";
import { toast } from "react-hot-toast";
import Link from "next/link";
export default function PaymentDetails({ payment }) {
    const vaNumber = useRef(null);
    const dueDate = new Date(payment.created_at);
    const [timer, setTimer] = useState();

    dueDate.setMinutes(dueDate.getMinutes() + 60 * 24);

    const countDownTimer = () => {
        setInterval(function () {
            var now = new Date().getTime();
            var remainingTime = dueDate - now;
            const second = 1000;

            const minute = second * 60;

            const hour = minute * 60;

            const day = hour * 24;

            const daysLeft = Math.trunc(remainingTime / day);

            const hoursLeft = Math.trunc((remainingTime % day) / hour);

            const minutesLeft = Math.trunc((remainingTime % hour) / minute);

            const secondsLeft = Math.trunc((remainingTime % minute) / second);
            setTimer(
                `${hoursLeft < 10 ? "0" + hoursLeft : hoursLeft}:${
                    minutesLeft < 10 ? "0" + minutesLeft : minutesLeft
                }:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
            );
        }, 1000);
    };

    useEffect(() => {
        countDownTimer();
    }, []);
    return (
        <Layout>
            <Container>
                <div className='max-w-md mx-auto w-full shadow-md divide-y-2 divide-dashed bg-white border p-8'>
                    <div className='flex items-center space-x-2'>
                        <BiTimer size={"1.5em"} className='text-primary-600' />
                        <time className='text-warning-500 font-medium'>
                            {timer}
                        </time>
                    </div>
                    <div className='   py-2  '>
                        <div className='flex items-center justify-between'>
                            <p>{payment.payment_name}</p>
                            <div className='w-14 h-8  relative  rounded-md '>
                                <Image
                                    src={payment.payment_image_url}
                                    layout='fill'
                                    objectFit='contain'
                                    alt='payment image'
                                />
                            </div>
                        </div>
                        <div className=''>
                            <p className='text-sm'>Nomer VA</p>
                            <div className='flex items-center justify-between'>
                                <p
                                    ref={vaNumber}
                                    className='text-xl text-primary-500 font-bold'>
                                    {payment.va_number}
                                </p>
                                <button
                                    onClick={() => {
                                        console.log(vaNumber.current.innerText);
                                        navigator.clipboard.writeText(
                                            vaNumber.current.innerText
                                        );
                                        toast.success(
                                            "nomer va berhasil disalin"
                                        );
                                    }}
                                    className='py-1 px-2 rounded-md text-sm bg-secondary-500 text-white'>
                                    salin
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='  py-2   '>
                        <div>
                            <h2 className='text-gray-600 text-lg font-medium mb-1'>
                                {payment.name}
                            </h2>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Nominal wakaf</p>
                            <p className='text-sm'>
                                {formatToCurreny(payment.given_amount)}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Biaya pemeliharaan sistem</p>
                            <p className='text-sm'>
                                {formatToCurreny(payment.maintenance_fee)}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>
                                Biaya Transaksi ({payment.payment_name})
                            </p>
                            <p className='text-sm'>
                                {formatToCurreny(payment.payment_fee)}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Total Pembayaran</p>
                            <p className='text-sm'>
                                {formatToCurreny(payment.total_amount)}
                            </p>
                        </div>
                    </div>
                </div>
                <Link href='/'>
                    <a className='bg-primary-500 py-2 text-white block max-w-md w-full mx-auto text-center'>
                        Kembali
                    </a>
                </Link>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ query, req, res }) {
    let payment = {};
    const { id } = query;
    await axios
        .get(`/payments/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            payment = response.data.payment;
        });

    return {
        props: {
            payment,
        },
    };
}
