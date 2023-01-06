import React from 'react';
import AboutSection from '../components/AboutSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

type Props = {};

export default function ({}: Props) {
  return (
    <div className='bg-gradient-to-br from-white via-white to-red-200'>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <AboutSection />
      <Footer />
    </div>
  );
}
