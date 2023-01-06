import React from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

export default function ContactSection(props: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:portfolioinbox@yahoo.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} ${formData.email}`;
  };

  return (
    <motion.article
      id='contact'
      className='text-center my-8 md:my-16 h-screen'
      initial={{
        x: -200,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
    >
      <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
        <h2 className='py-16 md:text-[72px] text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent'>
          Contact Me
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl'>
          Like my work? Need to reach out? Please use this form. Or check out my
          social media.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-8 justify-center'
        >
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 '>
              Your name
            </label>
            <input
              {...register('name')}
              type='text'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-slate-200 focus:ring-4 block w-full p-2.5 shadow-slate-400'
              placeholder='Name'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 '>
              Your email
            </label>
            <input
              {...register('email')}
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-slate-200 focus:ring-4 block w-full p-2.5 shadow-slate-400'
              placeholder='name@email.com'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 '>
              Subject
            </label>
            <input
              {...register('subject')}
              type='text'
              id='subject'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:border-gray-900 shadow-sm focus:ring-4 shadow-slate-400 focus:ring-slate-200'
              placeholder='Subject'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium '>
              Your message
            </label>
            <textarea
              {...register('message')}
              id='message'
              className='resize-none h-40 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-500 focus:ring-4 focus:ring-slate-200 shadow-slate-400'
              placeholder='Leave a comment...'
            ></textarea>
          </div>
          <button
            type='submit'
            className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-gray-500 self-center focus:ring-4 focus:outline-none focus:ring-slate-200 duration-300'
          >
            Send message
          </button>
        </form>
      </div>
    </motion.article>
  );
}
