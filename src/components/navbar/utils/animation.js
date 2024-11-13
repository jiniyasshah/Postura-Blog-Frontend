import gsap from "gsap";

const animateDockLine = (name, width, color, duration, translate) => {
  gsap.set(`.${name}IconAnimate`, { fill: color, color: color });
  gsap.set(`.${name}TextAnimate`, { fill: color, color: color });
  // gsap.to(`.${name}LineAnimate`, { width, duration });

  const tl = gsap.timeline();
  tl.set(`.${name}LineAnimate`, { width }) // Set full width instantly
    .fromTo(
      `.${name}LineAnimate`,
      { x: translate, opacity: 0 }, // Slide in from left with an offset
      { x: 0, opacity: 1, duration, ease: "power2.out" } // Animate only x and opacity
    );
};

const animateSearchIcon = (isClicked) => {
  if (isClicked) {
    gsap.to(`.searchButtonAnimate`, {
      opacity: 1,
      width: "100%",
      duration: 0.2,
      onStart: () => {
        gsap.to(`.searchTextAnimate`, {
          x: "-40px",
          width: 0,
          opacity: 0,
          duration: 0.2,
        });
      },
    });
  } else {
    gsap.to(`.searchButtonAnimate`, {
      opacity: 0,

      width: 0,
      duration: 0.2,
      onStart: () => {
        gsap.to(`.searchTextAnimate`, {
          opacity: 1,
          x: 0,
          width: "auto",

          duration: 0.2,
        });
      },
    });
  }
};

export { animateDockLine, animateSearchIcon };
