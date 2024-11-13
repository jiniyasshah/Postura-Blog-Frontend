import { useEffect } from "react";

const useClickOutside = (
  ref,
  animateSearchIcon,
  onClickOutside,
  active = true
) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (active && ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
        animateSearchIcon(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClickOutside, active]);
};

export default useClickOutside;
