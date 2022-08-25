import { getCookie } from "cookies-next";
import React from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";

export default function index({ transactions }) {
    const formatDate = (data) => {
        const a = new Date(data);
        const date = a.getDate();
        const month = a.getMonth();
        const year = a.getFullYear();
        const hour = a.getHours();
        const minute = a.getMinutes();

        return `${date}/${month}/${year} ${hour}:${minute}`;
    };
    return (
        <Layout>
            <Container className={"grid grid-cols-5 gap-8"}>
                <div></div>
                <div className='col-span-3'>
                    {transactions.map((item, index) => (
                        <div
                            key={index}
                            className='p-6 shadow-md border flex justify-between items-center'>
                            <div>
                                <div className='text-xs p-1'>
                                    {item.response_status_message}
                                </div>
                                <h1>{item.product_details}</h1>
                                <div className='flex space-x-4'>
                                    <small>{formatDate(item.created_at)}</small>
                                    <small>
                                        Rp {parseInt(item.response_amount)}
                                    </small>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    window.open(
                                        item.response_payment_url,
                                        "_blank"
                                    );
                                }}
                                className='text-xs py-1.5 px-3 bg-secondary-500 text-white'>
                                Bayar Sekarang
                            </button>
                        </div>
                    ))}
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    let transactions = [];
    const bio = JSON.parse(getCookie("bio", { req, res }));

    const { data } = await axios.get("/transactioninquiries", {
        headers: {
            Authorization: `Bearer ${getCookie("token", { req, res })}`,
        },
    });
    const myTransaction = data.filter((e) => e.email == bio.email);

    transactions = myTransaction.reverse();
    return {
        props: {
            transactions,
        },
    };
}