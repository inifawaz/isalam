import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiTimer } from "react-icons/bi";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";
import { toast } from "react-hot-toast";
import formatToCurreny from "../../../utils/formatToCurreny";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function PaymentDetails({ payment }) {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const howToPay = [
        {
            paymentName: "BRI VA",
            data: [
                {
                    via: "BRIMO",
                    steps: [
                        "Lakukan log in pada aplikasi BRI Mobile (Android/Iphone)",
                        "Pilih Menu BRIVA",
                        "Pilih Pembayaran Baru",
                        "Masukan Nomor VA yang tertera pada halaman konfirmasi",
                        "Masukan PIN BRIMO Anda",
                        "Validasi pembayaran anda",
                        "Pembayaran Selesai",
                    ],
                },
                {
                    via: "BRI INTERNET BANKING",
                    steps: [
                        "Lakukan log in pada website Internet Banking BRI (ib.bri.co.id)",
                        "Pilih menu Pembayaran (Scroll ke bawah)",
                        "Pilih BRIVA",
                        "Pilih Rekening",
                        "Masukkan Nomor VA yang tertera pada halaman konfirmasi dan Pilih Kirim",
                        "Masukan password Internet Banking BRI/BRIMO",
                        "Klik permintaan mToken",
                        "Masukan mToken Internet Banking BRI dan Klik kirim",
                        "Pembayaran Selesai",
                    ],
                },
            ],
        },
    ];
    const vaNumber = useRef(null);
    const dueDate = new Date(payment.created_at);
    const [timer, setTimer] = useState("00:00:00");

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
                <div className='max-w-sm w-full mx-auto shadow-md border p-6'>
                    <div className='flex py-2 justify-center items-center space-x-1 '>
                        <BiTimer size={"1.5em"} className='text-primary-500' />
                        <p className='text-warning-500 font-medium'>{timer}</p>
                    </div>
                    <div className='  divide-y-2  '>
                        <div className='flex py-4 items-center justify-between'>
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
                        <div className='py-4'>
                            <p className='text-sm'>Nomer VA</p>
                            <div className='flex items-center justify-between'>
                                <p
                                    ref={vaNumber}
                                    className='text-xl text-primary-500 font-bold'>
                                    {payment.va_number}
                                </p>
                                <button
                                    onClick={() => {
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
                        <div className='py-4'>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={
                                                "flex items-center py-1 px-2 w-full justify-between"
                                            }>
                                            <p className='text-sm'>
                                                Cara Pembayaran
                                            </p>

                                            <BiChevronDown
                                                size={"1.5em"}
                                                className={classNames(
                                                    "text-secondary-500 transition-all",
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                )}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                            as='div'
                                            className={
                                                "divide-y-2 divide-slate-400"
                                            }>
                                            {howToPay
                                                .filter(
                                                    (item) =>
                                                        item.paymentName ===
                                                        payment.payment_name
                                                )
                                                .map((item, index) =>
                                                    item.data.map(
                                                        (item, index) => (
                                                            <Disclosure
                                                                key={index}
                                                                as='div'
                                                                className='block '>
                                                                {({ open }) => (
                                                                    <>
                                                                        <Disclosure.Button
                                                                            className={
                                                                                "flex items-center bg-gray-200   p-1 px-2 w-full justify-between"
                                                                            }>
                                                                            <p className='text-xs   text-gray-600'>
                                                                                {
                                                                                    item.via
                                                                                }
                                                                            </p>

                                                                            <BiChevronDown
                                                                                size={
                                                                                    "1.5em"
                                                                                }
                                                                                className={classNames(
                                                                                    "text-secondary-500 transition-all",
                                                                                    open
                                                                                        ? "rotate-180 transform"
                                                                                        : ""
                                                                                )}
                                                                            />
                                                                        </Disclosure.Button>
                                                                        <Disclosure.Panel>
                                                                            <ul className='list-decimal p-2 bg-slate-50 '>
                                                                                {item.steps.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => (
                                                                                        <li className='text-sm ml-4 text-gray-500'>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </Disclosure.Panel>
                                                                    </>
                                                                )}
                                                            </Disclosure>
                                                        )
                                                    )
                                                )}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className='  py-4   '>
                            <div>
                                <h2 className='text-gray-400  font-medium mb-1'>
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
                                <p className='text-sm'>
                                    Biaya pemeliharaan sistem
                                </p>
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
                            <Link href='/'>
                                <a className='block text-center py-2 mt-8 bg-primary-500 text-white rounded-md'>
                                    Kembali Ke Halaman Utama
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ query, req, res }) {
    let payment = {};
    const { id } = query;
    await axios
        .get(`/me/payments/${id}`, {
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
