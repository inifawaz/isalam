import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { axios } from "../lib/axiosInstance";
import PageLoading from "./PageLoading";

export default function Transactiondata({ data }) {
    const { setPageLoading, pageLoading } = useContext(AppContext);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    const formatDate = (data) => {
        const a = new Date(data);
        const date = a.getDate();
        const month = a.getMonth();
        const year = a.getFullYear();
        const hour = a.getHours() < 10 ? `0${a.getHours()}` : a.getHours();
        const minute =
            a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();

        return `${date}/${month}/${year} ${hour}:${minute}`;
    };
    const [transactionStatus, setTransactionStatus] = useState({
        merchantOrderId: "",
        reference: "",
        amount: "",
        fee: "",
        statusCode: "",
        statusMessage: "",
    });
    const checktransactionstatus = async () => {
        setPageLoading(true);
        await axios
            .post(
                "/checktransactionstatus",
                {
                    merchant_order_id: data.merchant_order_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                setPageLoading(false);
                console.log(response.data);
                setTransactionStatus(response.data);
            });
    };
    useEffect(() => {
        checktransactionstatus();
    }, []);
    return (
        <>
            <div className='p-4 shadow-md border flex flex-col justify-between '>
                <div>
                    {transactionStatus.statusCode === "01" && (
                        <div className='bg-primary-100 text-primary-600 mb-2 tracking-wider py-1 px-2 inline-block text-xs'>
                            belum dibayar
                        </div>
                    )}
                    {transactionStatus.statusCode === "02" && (
                        <div className='bg-warning-100 text-warning-600 mb-2 tracking-wider py-1 px-2 inline-block text-xs'>
                            waktu pembayaran telah habis
                        </div>
                    )}
                    <h1 className='text-primary-600'>{data.product_details}</h1>
                    <div className='flex space-x-4'>
                        <small>{formatDate(data.created_at)}</small>
                        <small>Rp {parseInt(data.response_amount)}</small>
                    </div>
                </div>
                {transactionStatus.statusCode == "01" && (
                    <button
                        onClick={() => {
                            window.open(data.response_payment_url, "_blank");
                        }}
                        className='text-xs py-1.5 px-3 mt-2 rounded-md bg-secondary-500 text-white'>
                        Bayar Sekarang
                    </button>
                )}
            </div>
        </>
    );
}
