// Every Next.js application is going to start from index.js page

import Head from "next/head";
import css from "../styles/Home.module.css";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Menu from "../components/Menu";

import { client } from "../lib/client";


export default function Home({ pizzas }) {
  // console.log(pizzas);
  return (
    <Layout>
      <div className={css.container}>
        <Head>
          <title>Pizza Shop</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Logo.png" />
        </Head>
        {/* body */}
        <main>
          <Hero />
          <Services />

          {/* 将所有数据传递给Menu部分 */}
          <Menu pizzas={pizzas} />
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "pizza"]';

  const pizzas = await client.fetch(query); // excute query
  return {
    props: {
      pizzas
    }
  }
}

