import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";

export default function Dashboard() {
    return (
        <Layout>
            <Container>
                <AdminNav />
            </Container>
        </Layout>
    );
}
