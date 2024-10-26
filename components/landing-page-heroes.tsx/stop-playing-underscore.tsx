export interface TemplateComponentProps {
  key?: number;
}

export function StopPlayingUnderscore({ key }: TemplateComponentProps) {
  return (
    <div
      className=" flex flex-col justify-start items-center w-full min-w-full h-[80dvh]"
      key={key}
    >
      <div className="flex-1 flex items-center px-2 z-30 my-3 md:my-8">
        <div className="mx-2 md:mx-6 max-w-screen min-w-fit mb-4 flex flex-col items-center ">
          <div>
            <h1 className="flex flex-col md:flex-row text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight justify-center text-center md:h-max">
              <span className="text-black mr-2 leading-10 md:leading-[3.0rem] lg:leading-[4.6rem] xl:leading-[5.4rem] pb-4">
                Pretty Simple
                <br />
                <div className="relative text-center inline sm:px-1.5 sm:mx-1.5">
                  <div className="relative z-10 inline text-black">
                    If You Ask Me
                  </div>
                  <div className="absolute bottom-0 left-0 w-full mb-0.5 md:mb-2.5 h-1/3 md:h-1/3 bg-lime-400"></div>
                </div>
              </span>
            </h1>
          </div>
          <div>
            <p className="text-center max-w-xs md:max-w-lg lg:max-w-2xl font-light text-sm md:text-md lg:text-xl lg:mt-4 mb-2 lg:mb-6 py-1 text-mineshaft-700">
              <span className="mt-8">
                All-you-ever-need simple heading. Small animation on the demo
                button, small rounded corners you should probably match to your
                design system.
              </span>
            </p>
          </div>
          <div>
            <div className="flex md:ml-0 flex-row justify-center w-full md:mb-0 space-x-2 sm:space-x-4 mt-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.infisical.com/signup"
                className="relative inline-block text-sm md:text-lg group"
              >
                <span className="relative z-10 block px-3 md:px-5 py-2 md:py-3 overflow-hidden leading-tight text-gray-800 transition-colors duration-300 ease-out border border-gray-900 group-hover:border-primary group-hover:text-white rounded-md">
                  <span className="absolute duration-300 inset-0 w-full h-full px-3 md:px-5 py-2 md:py-3 bg-black group-hover:bg-black/80 transition-colors"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-1 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                  <span className="relative text-white ">Get Started</span>
                </span>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://infisical.com/talk-to-us"
                className="relative inline-block text-sm md:text-lg group"
              >
                <span className="relative z-10 block px-3 md:px-5 py-2 md:py-3 overflow-hidden leading-tight text-gray-800 transition-colors duration-300 ease-out border border-black group-hover:text-white rounded-md">
                  <span className="absolute inset-0 w-full h-full px-3 md:px-5 py-2 md:py-3 bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-1 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                  <span className="relative">Get a demo</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const StopPlayingUnderscoreCode = `
  function StopPlayingUnderscore() {
    return (
      <div className=" flex flex-col justify-start items-center w-full min-w-full h-screen">
        <div className="flex-1 flex items-center px-2 z-30 my-3 md:my-8">
          <div className="mx-2 md:mx-6 max-w-screen min-w-fit mb-4 flex flex-col items-center ">
            <div>
              <h1 className="flex flex-col md:flex-row text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight justify-center text-center md:h-max">
                <span className="text-black mr-2 leading-10 md:leading-[3.0rem] lg:leading-[4.6rem] xl:leading-[5.4rem] pb-4">
                  Pretty Simple
                  <br />
                  <div className="relative text-center inline sm:px-1.5 sm:mx-1.5">
                    <div className="relative z-10 inline text-black">
                      If You Ask Me
                    </div>
                    <div className="absolute bottom-0 left-0 w-full mb-0.5 md:mb-2.5 h-1/3 md:h-1/3 bg-lime-400"></div>
                  </div>
                </span>
              </h1>
            </div>
            <div>
              <p className="text-center max-w-xs md:max-w-lg lg:max-w-2xl font-light text-sm md:text-md lg:text-xl lg:mt-4 mb-2 lg:mb-6 py-1 text-mineshaft-700">
                <span className="mt-8">
                  All-you-ever-need simple heading. Small animation on the demo
                  button, small rounded corners you should probably match to your
                  design system.
                </span>
              </p>
            </div>
            <div>
              <div className="flex md:ml-0 flex-row justify-center w-full md:mb-0 space-x-2 sm:space-x-4 mt-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://app.infisical.com/signup"
                  className="relative inline-block text-sm md:text-lg group"
                >
                  <span className="relative z-10 block px-3 md:px-5 py-2 md:py-3 overflow-hidden leading-tight text-gray-800 transition-colors duration-300 ease-out border border-gray-900 group-hover:border-primary group-hover:text-white rounded-md">
                    <span className="absolute duration-300 inset-0 w-full h-full px-3 md:px-5 py-2 md:py-3 bg-black group-hover:bg-black/80 transition-colors"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-1 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                    <span className="relative text-white ">Get Started</span>
                  </span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://infisical.com/talk-to-us"
                  className="relative inline-block text-sm md:text-lg group"
                >
                  <span className="relative z-10 block px-3 md:px-5 py-2 md:py-3 overflow-hidden leading-tight text-gray-800 transition-colors duration-300 ease-out border border-black group-hover:text-white rounded-md">
                    <span className="absolute inset-0 w-full h-full px-3 md:px-5 py-2 md:py-3 bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-1 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                    <span className="relative">Get a demo</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  `;
