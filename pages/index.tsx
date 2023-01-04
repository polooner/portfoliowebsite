import Head from 'next/head'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import ScrollTopBtn from '../components/scrollTopBtn'

export default function Home() {
  return (
    <div className="flex flex-col snap-y snap-mandatory z-0">
      <Head>
        <title>Filip Wojda</title>
      </Head>
      <Header />
      <ScrollTopBtn />
      <section id='hero' className='snap-center'>
        <Hero />
      </section>
      <section id='about' className='snap-center'>
        <About />
      </section>
      <section id='skills' className='snap-center'>
        <Skills />
      </section>
      <section id='projects' className='snap-center'>
        <Projects />
      </section>
      <section id='contact' className='snap-center'>
        <Contact />
      </section>
      <Footer />
    </div>
  )
}
