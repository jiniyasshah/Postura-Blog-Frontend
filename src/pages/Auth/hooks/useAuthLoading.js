import { useEffect, useState } from "react";
import useLoadingAnimation from "../../../hooks/useLoadingAnimation";

const useAuthLoadingAnimation = (loading, user, isEntered, setIsEntered) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { startLoadingAnimation, stopLoadingAnimation, changeColor } =
    useLoadingAnimation();

  useEffect(() => {
    const newColor = user ? "teal" : "#dc2626";

    // Trigger color change based on the `user` state
    changeColor(".loadingLineAnimate", newColor);
    console.log(loading);
    // Prevent animation from starting multiple times
    if (loading & !isAnimating) {
      setIsAnimating(true);
      startLoadingAnimation(".loadingLineAnimate");
    } else {
      // If not loading, stop the animation when user is entered
      setIsAnimating(false);

      stopLoadingAnimation(".loadingLineAnimate");
    }
  }, [loading]);

  useEffect(() => {
    if (user && !isEntered && !isAnimating) {
      setIsAnimating(true);
      const newColor = user ? "teal" : "#dc2626";

      // Trigger color change based on the `user` state
      changeColor(".loadingLineAnimate", newColor);
      startLoadingAnimation(".loadingLineAnimate");
      stopLoadingAnimation(".loadingLineAnimate");
    }
  }, [user]);
};

export default useAuthLoadingAnimation;
