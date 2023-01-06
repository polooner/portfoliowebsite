import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProjectsSection from '../components/Projects';
import Head from 'next/head';

type Props = {};

export default function projects({}: Props) {
  return (
    <div className='h-fit bg-gradient-to-br from-white via-white to-red-200'>
      <Head>
        <title>Projects</title>
      </Head>
      <Header />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
