import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/HeroSection';

export default function Home() {
  return (
    <div className='justify-center items-center bg-gradient-to-br from-white via-white to-red-200'>
      <Head>
        <title>Filip Wojda</title>
      </Head>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
