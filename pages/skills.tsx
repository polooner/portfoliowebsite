import React from 'react';
import SkillsSection from '../components/SkillsSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

type Props = {};

export default function Skills({}: Props) {
  return (
    <div className='h-fit bg-gradient-to-br from-white via-white to-red-200'>
      <Head>
        <title>Skills</title>
      </Head>
      <Header />
      <SkillsSection />
      <Footer />
    </div>
  );
}
