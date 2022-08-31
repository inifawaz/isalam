import React from "react";
import ArticleItem from "../components/ArticleItem";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { axios } from "../lib/axiosInstance";

export default function Articles({ articles }) {
    return (
        <Layout>
            <Container className={"grid md:grid-cols-2 gap-8"}>
                {articles.map((item, index) => (
                    <ArticleItem key={index} data={item} />
                ))}
            </Container>
        </Layout>
    );
}

export async function getServerSideProps() {
    let articles = [];
    await axios.get("/articles").then((response) => {
        articles = response.data.articles;
    });

    return {
        props: {
            articles,
        },
    };
}
