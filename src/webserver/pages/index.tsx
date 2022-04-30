import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../layers/client/ui/styles/sass/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Sample CRUD app</title>
                <meta name="description" content="Sample CRUD app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Hi, click below to browse customer data
                </h1>
                <p className={styles.description}>
                    <Link href="/ui/view/customers">
                        <a>customers</a>
                    </Link>
                </p>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://finboo.ddns.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/finboo.ico"
                            alt="Arye Friedman(TM) Logo"
                            width={32}
                            height={32}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    };
}
