import '@/styles/globals.css';
import Head from 'next/head';
import { CartProvider } from '@/lib/store';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <title>Bright Dentistry — Інтернет-магазин професійної гігієни</title>
        <meta
          name="description"
          content="Офіційний онлайн-магазин стоматологічної клініки Bright Dentistry. Дитячі та дорослі зубні пасти BioRepair, Curaprox, Tooth Mousse з доставкою по Україні."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.webp" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
