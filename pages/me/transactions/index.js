import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import NavSideAuth from "../../../components/NavSideAuth";
import PageLoading from "../../../components/PageLoading";
import TransactionItem from "../../../components/TransactionItem";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";

export default function index({ transactions }) {
    const { pageLoading } = useContext(AppContext);

    return (
        <Layout>
            {pageLoading && <PageLoading />}
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-2'>
                    <NavSideAuth />
                </div>
                <div className='col-span-3'>
                    <h1 className='text-2xl text-gray-600 mb-4'>Pembayaran</h1>
                    {transactions.map((item, index) => (
                        <TransactionItem data={item} key={index} />
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
    console.log(transactions);
    return {
        props: {
            transactions,
        },
    };
}
