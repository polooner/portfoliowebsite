export function GridBackgroundDemo() {
  return (
    <div className='h-[50rem] w-full  bg-white   bg-grid-black/[0.2] relative flex items-center justify-center'>
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none p-20 inset-0 flex items-center justify-center  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,)]'></div>

      <p className='text-xl p-60 relative z-20 bg-clip-text text-transparent bg-black py-8'>
        hey, my name is Filip. i honestly just build and learn stuff. interests
        include deep learning, AI, design, building online products and
        philosophy.
      </p>
    </div>
  );
}
