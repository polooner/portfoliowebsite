import React from "react";

type Props = {};

export default function goToTop() {
  window.scrollTo({
    top: 60,
    behavior: "smooth",
  });
}
