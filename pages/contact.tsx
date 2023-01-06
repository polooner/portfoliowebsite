import React from 'react';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Head from 'next/head';

type Props = {};

export default function Contact({}: Props) {
  return (
    <div className='bg-gradient-to-br from-white via-white to-red-200'>
      <Head>
        <title>Contact</title>
      </Head>
      <Header />
      <ContactSection />
      <Footer />
    </div>
  );
}
