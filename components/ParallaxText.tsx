import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParallax } from 'react-scroll-parallax';

const ParallaxComponent = () => {
  const parallax = useParallax<HTMLImageElement>({
    scale: [0.5, 2],
    rotateX: [0, 60],
    opacity: [1, 0.2],
  });
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    // This code will only run in the browser environment, after the component mounts
    const updateSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Set the initial size

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <>
      <Image
        ref={parallax.ref}
        className='col-span-2 col-start-4 sm:-mt-44'
        alt='motto flag'
        src={'/main.gif'}
        width={windowSize[0]}
        height={windowSize[1]}
      />
    </>
  );
};

export default ParallaxComponent;
