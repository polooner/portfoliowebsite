import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/HeroSection';

export default function Home() {
  return (
    <div className='justify-center bg-transparent relative items-center '>
      <Head>
        <title>Filip Wojda</title>
      </Head>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
