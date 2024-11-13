import React, { useState, useRef, useEffect } from "react";
import { cn } from "cn-func";
import s from "./css/AuthForm.module.css"; // Relative import
import EmailSymbol from "./assets/EmailSymbol.jsx";
import PasswordSymbol from "./assets/PasswordSymbol.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice.js";
import useAuthRedirect from "../../hooks/useAuthRedirect.js";
import Loadingline from "../../components/loading/Loadingline.jsx";
import useAuthLoadingAnimation from "./hooks/useAuthLoading.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  const dispatch = useDispatch();
  const loginContainer = useRef(null);
  const { loading, error, user } = useSelector((state) => state.auth);

  // GSAP timeline reference
  useAuthRedirect("/", 1500);
  // Helper function for GSAP animation

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEntered(true);
    if (loading || !email || !password) return;

    dispatch(loginUser({ email, password }));
  };

  // Hook to monitor loading and user states to manage animations
  useAuthLoadingAnimation(loading, user, isEntered, setIsEntered);

  return (
    <div className="h-screen flex overflow-x-hidden" ref={loginContainer}>
      <Loadingline />

      {/* ------------------------------- Left Part Containing Intro ------------------------------------- */}
      <div className={cn(s.auth__title__container)}>
        <div>
          <h1 className={cn(s.auth__title__heading__text)}>Postura</h1>
          <p className={cn(s.auth__title__paragraph__text)}>
            The most popular blogging platform.
          </p>
        </div>
      </div>

      {/* ------------------------------- Right Part Containing Form ------------------------------------- */}
      <div className={cn(s.auth__form__container)}>
        <form className={cn(s.auth__form)} onSubmit={handleSubmit}>
          <h1 className={cn(s.auth__form__heading__text)}>Hello Again!</h1>
          <p className={cn(s.auth__form__paragraph__text)}>Welcome Back</p>
          {/* ------------------------------- Form Input Field  ------------------------------------- */}
          <div className={cn(s.auth__form__inputfield__container)}>
            <EmailSymbol />
            <input
              className={cn(s.auth__form__inputfield)}
              type="text"
              name=""
              id=""
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={cn(s.auth__form__inputfield__container)}>
            <PasswordSymbol />
            <input
              className={cn(s.auth__form__inputfield)}
              type="text"
              name=""
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* ------------------------------- Form Button Field ------------------------------------- */}
          <button type="submit" className={cn(s.auth__form__buttonfield)}>
            Login
          </button>
          {/* ------------------------------- Forgot Password ------------------------------------- */}
          <span className={cn(s.auth__forgot_password)}>Forgot Password ?</span>
          <div className={`mt-3 text-red-600 ${error ? "" : "opacity-0"}`}>
            Invalid Credentials !
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
