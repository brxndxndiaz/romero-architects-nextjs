"use client";
import React, { useEffect, useRef, useState } from "react";
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: {
    desktop: string;
    mobile: string;
  };
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onGalleryOpen?: (value: boolean) => void;
  isGalleryOpen?: boolean;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  onGalleryOpen,
  isGalleryOpen: externalGalleryOpen = false,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const toggleMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsExpanded(!isExpanded);
  };

  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  
  // Sync with external gallery state
  useEffect(() => {
    setIsGalleryOpen(externalGalleryOpen);
  }, [externalGalleryOpen]);
  
  const toggleGallery = () => {
    const newState = !isGalleryOpen;
    setIsGalleryOpen(newState);
    onGalleryOpen && onGalleryOpen(newState);
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [galleryHeight, setGalleryHeight] = useState<number>(0);


  useEffect(() => {
    if (menuRef.current) {
      setGalleryHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef.current]);

  return (
    <>
      {/* Top Navigation Bar - Always Visible */}
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -200 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-[100] p-8 px-14 ${className}`}
      >
        <nav
          ref={navRef}
          className="card-nav block h-[60px] p-0 relative"
        >
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex  items-center justify-end p-2 pl-[1.1rem] z-[2]">
            <div className="logo-container flex items-center absolute left-0 top-1/2  -translate-y-1/2 ">
              <img src={logo.desktop} alt={logoAlt} className="logo h-[32px] hidden md:block" />
              <img src={logo.mobile} alt={logoAlt} className="logo h-[32px] block md:hidden" />
            </div>

            <div className="flex flex-row space-x-4">
              <div
                className={`hamburger-menu ${
                  isHamburgerOpen ? "open" : ""
                } group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px]`}
                role="button"
                onClick={toggleGallery}
                aria-label={isExpanded ? "Close menu" : "Open menu"}
                style={{ borderColor: menuColor || "#000", height: `${galleryHeight}px` }}
              >
                <div
                  className={`hamburger-line w-[39px] border-current border-2 transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] h-full`}
                ></div>
              </div>
              <div ref={menuRef}>
                <div
                  className={`hamburger-menu ${
                    isHamburgerOpen ? "open" : ""
                  } group h-full flex flex-col items-center justify-center cursor-pointer gap-[4px]`}
                  onClick={toggleMenu}
                  role="button"
                  aria-label={isExpanded ? "Close menu" : "Open menu"}
                  style={{ color: menuColor || "#000" }}
                >
                  <div
                    className={`hamburger-line w-[33px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                      isHamburgerOpen ? "translate-y-[3px] rotate-45" : ""
                    } group-hover:opacity-75`}
                  ></div>
                  <div
                    className={`hamburger-line w-[33px] h-[2px] bg-current transition-all duration-300 ease-linear [transform-origin:50%_50%]  group-hover:opacity-75 ${
                      isHamburgerOpen
                        ? "absolute w-[0px] opacity-0 h-[0px]  group-hover:opacity-0 max-w-0"
                        : ""
                    }`}
                  ></div>

                  <div
                    className={`hamburger-line w-[33px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                      isHamburgerOpen ? "-translate-y-[3px] -rotate-45" : ""
                    } group-hover:opacity-75`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </motion.div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[99] flex items-center justify-center"
            style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setIsExpanded(false)} // Click outside to close
          >
            {/* Contact Card - Centered */}
            {items && items[0] && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-md w-full mx-8"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card
              >
                <div
                  className="nav-card select-none relative flex flex-col gap-6 p-8 rounded-2xl backdrop-blur-md border border-white/20"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.05)", // Transparent background
                    color: "white",
                    minHeight: '300px'
                  }}
                >
                  <div className="nav-card-label font-light tracking-[-0.5px] text-3xl md:text-4xl text-center">
                    {items[0].label}
                  </div>
                  <div className="nav-card-links flex flex-col gap-4 items-center">
                    {items[0].links?.map((lnk, i) => (
                      <a
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link inline-flex items-center gap-3 no-underline cursor-pointer transition-all duration-300 hover:opacity-75 hover:scale-105 text-lg text-center"
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0 text-xl"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardNav;
