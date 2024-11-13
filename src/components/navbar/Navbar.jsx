import React, { useState } from "react";
import { cn } from "cn-func";
import "@fontsource/inknut-antiqua";
import { dockData } from "./constants";
import { useRef } from "react";
import s from "./css/Navbar.module.css";
import { useGSAP } from "@gsap/react";
import SearchButton from "../search/SearchButton";
import { FiSearch } from "react-icons/fi";
import useClickOutside from "./hooks/useClickOutside";
import { animateDockLine, animateSearchIcon } from "./utils/animation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLoadingAnimation from "../../hooks/useLoadingAnimation";
import { logoutUser } from "../../features/auth/authSlice";
const Navbar = () => {
  // Inline style for logo or text with a custom font
  const codeStyle = {
    fontFamily: "Inknut Antiqua",
  };
  const { startLoadingAnimation, stopLoadingAnimation } = useLoadingAnimation();
  const { loading, error, user } = useSelector((state) => state.auth);
  // References for the navbar container and the outer navbar element
  const navbarContainer = useRef();
  const navbarSearchButtonRef = useRef(null);

  // Safe GSAP context, limiting animations to elements within the container scope
  const { contextSafe } = useGSAP({ scope: navbarContainer });

  // States to track which dock item is active (clicked) and whether the search icon is clicked
  const [mouseState, setMouseState] = useState("");
  const [prevLineWidth, setPrevLineWidth] = useState({});
  const [searchClick, setSearchClick] = useState(false);

  // Handle click on the search icon, triggering animation and toggling searchClick state
  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchClick(true);
    animateSearchIcon(true);
  };

  // Handles clicks on dock items, animating the previously active item to reset and activating the clicked one
  const handleDockItemClick = contextSafe(
    (event, index, currentDockItemName) => {
      let translateWidth = event.target.getBoundingClientRect().width; // Get the width of the clicked element
      setPrevLineWidth({ index, currentDockItemName, translateWidth });
      if (prevLineWidth?.currentDockItemName !== currentDockItemName) {
        if (index < prevLineWidth.index) {
          translateWidth = translateWidth + prevLineWidth.translateWidth;
        } else {
          translateWidth = -(translateWidth + prevLineWidth.translateWidth);
        }
      } else {
        translateWidth = 0;
      }

      const transitionDelay = 0.3;
      const fullWidth = "100%";
      const zeroWidth = 0;
      event.preventDefault();
      if (mouseState && mouseState !== currentDockItemName) {
        animateDockLine(
          mouseState,
          zeroWidth,
          "#bfbfbf",
          transitionDelay,
          translateWidth
        );
      }
      setMouseState(currentDockItemName);
      animateDockLine(
        currentDockItemName,
        fullWidth,
        "#2563eb",
        transitionDelay,
        translateWidth
      );
    }
  );

  // Custom hook to detect clicks outside the navbarRef element
  // Closes the search icon by setting searchClick to false and triggering the close animation
  useClickOutside(
    navbarSearchButtonRef,
    animateSearchIcon,
    () => setSearchClick(false),
    searchClick
  );

  const dispatch = useDispatch();
  const handleLogOut = () => {
    startLoadingAnimation();
    if (user) {
      dispatch(logoutUser());
      stopLoadingAnimation();
    }
  };

  return (
    <nav className={cn(s.navbar)} ref={navbarContainer}>
      <div
        className={`loadingLineAnimate h-[4px] absolute t-0 shadow-lg ${
          user ? "bg-teal-600" : "bg-[#dc2626]"
        }  w-full right-[100%]`}
      ></div>
      <div className={cn(s.navbar__container)}>
        {/* --------------------------- Logo --------------------------- */}

        <div
          className={cn(s.navbar__logo__container)}
          ref={navbarSearchButtonRef}
        >
          <span
            style={codeStyle}
            className={cn(s.navbar__logo__text, "searchTextAnimate")}
          >
            Postura
          </span>
          <div
            className={cn(s.navbar__search__icon, "searchIconAnimate ")}
            onClick={(event) => {
              handleSearchClick(event);
            }}
          >
            <FiSearch size="1.5em" />
          </div>

          <div className="searchButtonAnimate w-0 opacity-0">
            <SearchButton />
          </div>
        </div>

        {/*  --------------------------- Dock --------------------------- */}
        <div
          className="hidden w-full md:self-end  md:w-auto  md:flex md:flex-row"
          id="navbar-default"
        >
          <ul className={cn(s.dock__container, "dock")}>
            {dockData.map(
              ({ name, icon: Icon, text, protectedItem }, index) =>
                (user || !protectedItem) && (
                  <li
                    key={name}
                    className="relative px-4 flex items-center justify-center"
                    onClick={(event) => handleDockItemClick(event, index, name)}
                  >
                    <div className={cn(s.dock__item__container)}>
                      <Icon
                        size="1.5em"
                        className={cn(s.dock__item__icon, `${name}IconAnimate`)}
                      />
                      <span
                        className={cn(s.dock__item__text, `${name}TextAnimate`)}
                      >
                        {text}
                      </span>
                    </div>
                    <div
                      className={cn(s.dock__item__line, `${name}LineAnimate`)}
                    />
                  </li>
                )
            )}
          </ul>
        </div>

        {/* --------------------------- Authentication ------------------------- */}

        <div className={cn(s.navbar_auth_container)} id="navbar-default">
          <Link to={!user ? "/login" : ""}>
            <button
              type="button"
              className={cn(s.navbar__login__btn)}
              onClick={handleLogOut}
            >
              {user ? "Log out" : "Log in"}
            </button>
          </Link>
          {!user && (
            <button type="button" className={cn(s.navbar__signup__btn)}>
              Sign up
            </button>
          )}
        </div>
        {/* ------------------------------------------------------------------------ */}
      </div>
    </nav>
  );
};

export default Navbar;
