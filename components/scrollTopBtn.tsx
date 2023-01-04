import React from "react";
import { useState, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";
import goToTop from "./utils/goToTop";

type Props = {};

const ScrollTopBtn = ({}: Props) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 2000) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  goToTop;

  return (
    <div
      className="w-fit h-fit fixed bottom-20 right-10 shadow-2xl shadow-red rounded-full p-4 items-center"
      onClick={goToTop}
    >
      {" "}
      {showTopBtn && <BsArrowUp size={20} />}{" "}
    </div>
  );
};

export default ScrollTopBtn;
