import '@/styles/globals.css';
import Head from 'next/head';
import { CartProvider } from '@/lib/store';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  // Schema.org Structured Data for LocalBusiness & Dental Store
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'OnlineStore'],
    'name': 'Bright Dentistry',
    'image': 'https://brightdentistry.ua/images/logo.svg',
    'description': 'Офіційний онлайн-магазин та стоматологічна клініка Bright Dentistry у Вінниці. Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox, гелі Tooth Mousse.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'вул. Івана Богуна, 2',
      'addressLocality': 'Вінниця',
      'addressRegion': 'Вінницька область',
      'postalCode': '21000',
      'addressCountry': 'UA'
    },
    'telephone': '+380732762627',
    'priceRange': '₴₴',
    'openingHours': 'Mo-Fr 09:00-19:00, Sa-Su 09:00-16:00',
    'sameAs': [
      'https://www.instagram.com/bright_dentistry.ua/'
    ]
  };

  return (
    <CartProvider>
      <Head>
        <title>Bright Dentistry — Професійні зубні пасти, щітки та гелі (м. Вінниця)</title>
        <meta
          name="description"
          content="Офіційний інтернет-магазин стоматологічної клініки Bright Dentistry у Вінниці. Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox, гелі Tooth Mousse з доставкою по Україні."
        />
        <meta
          name="keywords"
          content="Bright Dentistry, зубні пасти Вінниця, Curaprox Вінниця, BioRepair, Tooth Mousse, стоматологія Вінниця, дитячі зубні пасти, гігієна рота"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bright Dentistry" />
        <meta property="og:title" content="Bright Dentistry — Професійні зубні пасти, щітки та гелі (м. Вінниця)" />
        <meta property="og:description" content="Оригінальні доглядові засоби для ротової порожнини від стоматологів клініки Bright Dentistry у Вінниці." />
        <meta property="og:locale" content="uk_UA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bright Dentistry — Професійні зубні пасти, щітки та гелі" />
        <meta name="twitter:description" content="Оригінальні доглядові засоби від стоматологів клініки Bright Dentistry у Вінниці." />

        <link rel="icon" href="/images/logo.svg" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

