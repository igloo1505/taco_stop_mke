import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { connectToDatabase } from "../util/mongodb";
import { connectDB } from "../util/connectDB";

export default function Home() {
  const icon = "../assets/favicon/favicon.ico";
  return (
    <div className={styles.container}>
      <Head>
        <title>TacoStop MKE</title>
        <meta name="description" content="SEO here..." />
        <link rel="icon" href="../assets/favicon/favicon.ico" />
      </Head>
      <div className={styles.innerLandingPageWrapper}>
        <Image
          src="/assets/pileOfChiles.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await connectDB();
  // const { client } = await connectToDatabase();
  // const isConnected = await client.isConnected();
  return {
    props: {},
  };
}
