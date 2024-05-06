import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import App from "@/components/App";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Weekday App</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <App />
      </main>
    </>
  );
}
