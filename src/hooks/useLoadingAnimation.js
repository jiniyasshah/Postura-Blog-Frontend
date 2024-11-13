import gsap from "gsap";
import { useRef } from "react";

const useLoadingAnimation = () => {
  const tl = useRef(null);

  const startLoadingAnimation = (
    target = ".loadingLineAnimate",
    options = {}
  ) => {
    if (!tl.current) {
      tl.current = gsap.timeline();
    }
    console.log("Hello");
    const startProperties = {
      opacity: 0,
      right: "90%",
      left: 0,
      width: "10%",
      ...options.start,
    };

    const middleProperties = {
      opacity: 1,
      left: 0,
      width: "50%",
      right: "50%",
      duration: 0.5,
      ease: "power2.out",
      ...options.middle,
    };

    tl.current.set(target, startProperties).to(target, middleProperties);
  };

  const stopLoadingAnimation = (
    target = ".loadingLineAnimate",
    options = {}
  ) => {
    if (tl.current) {
      const endProperties = {
        right: 0,
        left: 0,
        width: "100%",
        duration: 0.5,
        ease: "power2.out",
        ...options.end,
      };

      const fadeOutProperties = {
        opacity: 0,
        ...options.fadeOut,
      };

      tl.current.to(target, endProperties).to(target, fadeOutProperties);
    }
    tl.current;
  };

  const changeColor = (target = ".loadingLineAnimate", color) => {
    gsap.to(target, {
      backgroundColor: color,
      duration: 0.5, // adjust duration for smoother or faster transition
      ease: "power2.out",
    });
  };

  return { startLoadingAnimation, stopLoadingAnimation, changeColor };
};

export default useLoadingAnimation;
