import Link from "next/link";
import { Button } from "../ui/button";

export default function MarketingAgency() {
  return (
    <div className="relative max-w-full py-[126px] bg-[#f2f0ed] text-[#171614] overflow-hidden order-1 h-[80dvh]">
      <div className="w-full mx-auto px-[calc(20px+2.5vw)] flex justify-between flex-wrap space-y-12">
        <SparkleSVG />
        <DoodleStarSVG />
        {/* TODO: add a gothic font, make it very bold */}
        <h1
          className="relative text-[calc(18px+8vw)] leading-[0.7777777778] m-0 font-['gothic',sans-serif] font-black uppercase antialiased "
          style={
            {
              "--translate-from": "100%",
              "--from-opacity": "1",
            } as React.CSSProperties
          }
        >
          <span className="block overflow-hidden animate-fade-up duration-300 z-[1] bg-[#f2f0ed] ease-in-out-cubic">
            <span className="font-black z-0">Pretty</span>
          </span>

          {/* this is currently visible intially, and then animates from below upwards. we want it to stay invisible until it's time comes */}
          <span className="relative block overflow-hidden z-[1] bg-[#f2f0ed] h-fit">
            <span className="block overflow-hidden z-[1] animate-fade-up duration-300 delay-300 bg-[#f2f0ed] opacity-0 ease-in-out-cubic pt-1 ">
              <span className="uppercase font-black after:content-[''] after:absolute after:right-full after:bottom-0 after:left-0 after:w-0 after:h-2 after:bg-[url(/icons/marketing-underline.svg)] after:bg-cover after:bg-center after:bg-no-repeat after:transition-all after:duration-300">
                and{" "}
                <span className="relative after:absolute after:right-0 after:w-full after:transition-all after:duration-150 after:delay-800 after:content-['cool.'] after:underline animate-slide-up duration-300 delay-600">
                  cool.
                </span>
              </span>
            </span>
          </span>
        </h1>
        <div className="uppercase font-black bg-[#f2f0ed] w-full  pt-4">
          <div className="font-black uppercase animate-fade-up duration-300 delay-700 ease-in-out-cubic opacity-0 z-[1] ">
            <h2>
              Good for&nbsp;
              <em className="relative after:content-[''] after:absolute after:right-full after:bottom-[-8px] after:left-0 after:w-full after:h-2 after:bg-[url(/icons/marketing-underline.svg)] after:bg-cover after:bg-center after:bg-no-repeat after:transition-all after:duration-300">
                agencies&nbsp;
              </em>
              , not sure about products.
            </h2>
          </div>
          {/* TODO: animate fade up, duration 700 delay 1000 */}
          {/* TODO: a big button. also fade up animation */}
          {/* TODO: on hover, aanimate the fill upwards, the text should also animate upwards once the background is halfway through */}
          <div className="mt-4 space-x-2 pt-8">
            <Button
              variant="marketingAgency"
              size="marketingAgency"
              style={
                {
                  "--fill": "#171614",
                  "--text-fill": "#FFFFFF",
                } as React.CSSProperties
              }
            >
              <Link href="#" target="_blank">
                <div className="relative inline-flex overflow-hidden">
                  <span className="relative inline-block tracking-wider transition-all duration-200 ease-in-out">
                    View work
                  </span>
                </div>
              </Link>
            </Button>
            <Button
              variant="marketingAgency"
              size="marketingAgency"
              style={
                {
                  "--fill": "#FFFFFF",
                  "--text-fill": "#171614",
                } as React.CSSProperties
              }
              asChild
            >
              <Link href="#" target="_blank">
                <div className="relative inline-flex overflow-hidden text-center items-center justify-center h-full">
                  <span className="relative inline-block tracking-wider transition-all duration-200 ease-in-out ">
                    Contact
                  </span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SparkleSVG = () => {
  return (
    <svg
      width="64"
      height="61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="home-hero__burst aos-init aos-animate"
      data-aos="fade-in"
    >
      <path
        d="M8.90924 37.3197C4.9787 37.2841 2.24789 39.3261 0 42.5398C0.525944 42.8917 0.911513 43.3652 1.31205 43.3783C2.40699 43.412 3.58054 43.4625 4.59312 43.1219C6.70626 42.4125 8.79319 41.7425 11.0523 41.6788C11.9488 41.6526 12.4411 40.6607 12.1996 39.7267C11.8028 38.1975 10.7173 37.3347 8.91111 37.3197H8.90924Z"
        fill="white"
      ></path>
      <path
        d="M61.6678 17.0923C59.3319 17.8896 57.0279 18.7993 54.765 19.7913C53.8928 20.1731 53.7225 21.3392 54.1155 22.4397C54.4749 23.4448 55.4613 24.2197 56.3035 24.1579C56.4252 24.1429 56.5506 24.1392 56.6685 24.1092C59.4685 23.4017 61.2784 21.386 63.0172 19.2822C63.0902 19.1942 63.0902 19.0482 63.1314 18.9322C63.532 17.8054 62.7477 16.7254 61.6678 17.0942V17.0923Z"
        fill="white"
      ></path>
      <path
        d="M38.8492 10.6349C39.6166 11.0467 40.208 10.3504 40.661 9.74026C40.88 9.44453 41.1233 9.13195 41.2281 8.78943C41.872 6.65571 42.5514 4.52571 43.053 2.35642C43.1915 1.75374 42.7685 1.02007 42.5158 0C39.4538 2.21982 38.1061 5.00864 37.481 8.24291C37.4361 8.47687 37.4305 8.78755 37.5484 8.97097C37.9358 9.56617 38.2783 10.3298 38.8473 10.6349H38.8492Z"
        fill="white"
      ></path>
      <path
        d="M27.3792 52.8284C26.784 52.325 25.8294 52.3643 25.412 52.967C24.2553 54.6365 23.7331 56.5082 23.7612 58.5277C23.7724 59.3176 24.1243 59.9446 24.8749 60.2908C25.676 60.6596 26.2955 60.2946 26.8645 59.7761C28.0361 58.7036 28.4816 57.3448 28.3599 56.0346C28.6856 54.5878 28.3075 53.6127 27.3811 52.8284H27.3792Z"
        fill="white"
      ></path>
      <path
        d="M7.72834 7.98817C7.29973 9.63151 7.14999 10.7414 8.33477 11.7184C9.38478 12.5831 10.3094 13.5995 11.3688 14.453C11.9172 14.8947 12.6116 15.3065 13.2854 15.3982C13.7795 15.4656 14.4795 15.1137 14.8351 14.7187C15.0672 14.4623 15.0354 13.6463 14.794 13.3375C13.029 11.0765 11.0637 9.03819 7.72834 7.99005V7.98817Z"
        fill="white"
      ></path>
      <path
        d="M49.3064 48.5627C48.9695 49.0138 48.6157 49.7288 48.743 50.2023C49.473 52.9219 50.858 55.2035 53.5607 56.4163C53.7647 56.508 54.0455 56.4276 54.7511 56.4276C54.4517 53.3318 52.842 51.1494 51.3091 48.9502C50.888 48.3456 49.6414 48.1173 49.3083 48.5627H49.3064Z"
        fill="white"
      ></path>
    </svg>
  );
};

const DoodleStarSVG = () => {
  return (
    <svg
      width="33"
      height="34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="home-hero__burst--alt aos-init aos-animate"
      data-aos="fade-in"
    >
      <path
        d="M32.8295 24.8892C33.1269 24.2062 33.0645 24.0044 32.4078 23.6627C30.9157 22.8869 29.419 22.1183 27.919 21.3578C26.4039 20.5893 24.8848 19.8305 23.3634 19.0763C22.8299 18.8119 22.2698 18.5996 21.7448 18.3202C20.1898 17.4924 18.65 16.6347 17.0953 15.8042C15.8914 15.161 14.6691 14.5519 13.4641 13.909C12.3849 13.3323 11.3206 12.7264 10.2458 12.1412C9.92589 11.967 9.57987 11.8403 9.2635 11.6611C8.09956 10.9998 6.94147 10.329 5.78494 9.65507C4.35923 8.82445 2.81667 8.1852 1.57951 7.04338C1.48594 6.9572 1.31049 6.8732 1.20495 6.90287C0.742139 7.03341 0.403293 7.33949 0.233463 7.795C0.0431185 8.3077 -0.183766 8.87316 0.242738 9.33985C0.720279 9.86297 1.21823 10.4441 1.83089 10.7495C3.17302 11.4196 4.30686 12.4228 5.68209 13.0394C6.43519 13.3767 7.1344 13.816 7.97649 13.9204C8.12473 13.939 8.24837 14.1095 8.3992 14.172C9.11375 14.4662 9.52953 15.3574 10.4223 15.1587C10.6901 15.5665 11.0657 15.8293 11.5493 15.9471C11.6306 15.9669 11.7015 16.0278 11.7823 16.0541C12.6515 16.3411 13.3451 16.914 14.0565 17.4593C14.1901 17.5614 14.3328 17.6604 14.4863 17.7253C14.8173 17.8665 15.1666 17.964 15.4921 18.1159C16.2892 18.4876 17.0773 18.8789 17.8678 19.2637C17.9942 19.3252 18.1467 19.3692 18.2344 19.4688C18.7541 20.0583 19.4243 20.4205 20.1409 20.6654C20.9448 20.9409 21.7263 21.3016 22.4637 21.6773C23.0843 21.9936 23.6517 22.4876 24.2878 22.8526C25.7155 23.6717 27.0695 24.6221 28.5153 25.404C29.3722 25.8677 30.176 26.3621 30.8214 27.0708C31.8922 26.6233 31.8986 26.6276 32.3784 25.8114C32.5515 25.5173 32.693 25.2022 32.8292 24.8881L32.8295 24.8892ZM17.7213 17.394C17.7238 17.3382 17.7267 17.2816 17.7292 17.2257C17.9748 17.2249 18.2216 17.2238 18.4672 17.223C18.4639 17.3182 18.4602 17.4141 18.4576 17.5096C18.212 17.4707 17.9672 17.4322 17.7213 17.394ZM20.691 19.008C20.606 19.0125 20.5136 18.892 20.4236 18.8271L20.8717 18.6443C20.9112 18.7045 20.9507 18.7646 20.9903 18.8248C20.8905 18.8904 20.7936 19.003 20.691 19.008Z"
        fill="white"
      ></path>
      <path
        d="M26.6016 7.74302C25.3209 8.4798 24.0716 9.27694 22.839 10.0949C21.7482 10.8189 20.7386 11.6756 19.6132 12.3363C18.9637 12.7182 18.3765 13.193 17.6742 13.5189C16.8225 13.9142 15.9618 14.3747 15.3898 15.2472C15.0941 15.6978 14.5399 15.9866 14.0793 16.3144C13.3848 16.8093 12.6546 17.2536 11.9668 17.7575C11.2103 18.3125 10.5003 18.9325 9.74139 19.483C9.07546 19.9658 8.35004 20.3666 7.68394 20.8507C6.46369 21.738 5.2541 22.641 4.06788 23.5737C3.3009 24.1777 2.58359 24.8466 1.86612 25.468C2.01096 25.7983 2.09769 26.0412 2.21873 26.2654C2.43689 26.6706 3.13054 27.0866 3.49961 26.9483C4.30424 26.6461 5.19452 26.5237 5.80895 25.7907C6.09572 25.4483 6.5007 25.2007 6.87226 24.9385C7.40751 24.5615 8.07611 24.3066 8.47531 23.8225C8.90893 23.2972 9.49177 23.0795 9.98095 22.6911C10.1052 22.5923 10.1816 22.4326 10.2792 22.3011C10.4234 22.1061 10.5445 21.8887 10.7149 21.7213C10.9367 21.504 11.1915 21.3177 11.4434 21.1347C12.1539 20.6168 12.8206 20.0006 13.6013 19.6279C14.2043 19.3398 14.537 18.8243 15.0297 18.4764C15.5503 18.1084 16.2454 17.9931 16.773 17.6317C17.4233 17.1866 17.9756 16.5979 18.5795 16.0823C18.7 15.9799 18.8651 15.9299 19.0066 15.8513C19.7219 15.4529 20.5376 15.1639 21.1248 14.6232C21.7323 14.0638 22.3936 13.5747 23.0047 13.0245C23.2106 12.8387 23.481 12.6718 23.7469 12.6175C24.9098 12.3784 25.7848 11.6598 26.6635 10.933C26.809 10.8126 26.992 10.7078 27.1741 10.6676C27.5603 10.5822 27.9918 10.6242 28.3408 10.4678C28.9764 10.1818 29.5684 9.79615 30.1688 9.43445C30.2388 9.39199 30.249 9.23842 30.274 9.13305C30.4725 8.29855 29.934 7.17177 29.0866 6.58662C28.2395 6.97519 27.3833 7.29299 26.6016 7.74302Z"
        fill="white"
      ></path>
      <path
        d="M18.9565 33.0039C18.8302 32.5973 18.6871 32.1878 18.6265 31.7692C18.3785 30.0417 18.1694 28.3077 17.9246 26.5788C17.7642 25.4496 17.5119 24.3309 17.3959 23.198C17.1394 20.6972 16.9237 18.1915 16.7312 15.6842C16.6174 14.2047 16.6028 12.718 16.5044 11.2371C16.4024 9.70625 16.3177 8.16947 16.1061 6.65165C15.8508 4.81114 15.4821 2.98682 15.1338 1.16045C15.0776 0.864786 14.9037 0.574576 14.726 0.324085C14.4407 -0.0764095 13.9611 -0.0959138 13.3433 0.211434C12.7548 0.505052 12.6669 0.672476 12.8121 1.26957C12.9526 1.84472 13.1591 2.41045 13.2384 2.99345C13.4166 4.29763 13.5176 5.6128 13.6814 6.91903C13.7688 7.62096 14.1683 8.26882 14.0419 9.01689C14.0229 9.1275 14.1624 9.25987 14.2117 9.38945C14.2706 9.54378 14.3404 9.70264 14.3562 9.86398C14.4289 10.5837 14.5008 11.3043 14.5392 12.0263C14.5591 12.408 14.4596 12.7999 14.5013 13.1768C14.5936 14.012 14.8521 14.8366 14.4275 15.6638C14.3495 15.8158 14.4333 16.0554 14.4542 16.2534C14.5696 17.369 14.9534 18.4524 14.7759 19.6054C14.7087 20.0431 14.7793 20.5082 14.8283 20.9554C14.8802 21.4292 15.0019 21.8956 15.053 22.3695C15.1043 22.8512 15.1072 23.339 15.1312 23.8237C15.1482 24.1598 15.2932 24.361 15.8243 24.28C15.4565 24.6623 15.3406 24.8954 15.4632 25.2634C15.7264 26.0543 15.8696 26.8701 15.6417 27.7074C15.6131 27.8116 15.5941 27.9648 15.6484 28.038C15.9272 28.4168 15.7226 28.8054 15.7139 29.1921C15.7044 29.6163 15.7036 30.0472 15.7692 30.465C15.917 31.4116 16.5001 32.2473 16.4711 33.2521C16.466 33.4242 16.6811 33.7129 16.8476 33.7605C17.3273 33.8975 17.8374 34.0162 18.3299 33.9982C18.9798 33.9751 19.1501 33.6254 18.9572 33.0029L18.9565 33.0039Z"
        fill="white"
      ></path>
    </svg>
  );
};
