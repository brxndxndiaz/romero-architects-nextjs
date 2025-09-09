"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut" as const,
      },
    }),
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
  };

  const linkVariants = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-romero-gray-light"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex-shrink-0"
          >
            <motion.a
              href="#"
              className="block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/white/4.png"
                alt="Romero Architects"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={index}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-romero-gray-dark" : "text-white"
                } hover:text-romero-gray group`}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-romero-gray-medium transition-all duration-300 group-hover:w-full"
                  layoutId="underline"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.8, duration: 0.4 },
            }}
            className="hidden lg:flex"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-romero-gray-dark text-white hover:bg-romero-gray-medium"
                  : "bg-white text-romero-gray-dark hover:bg-romero-gray-light"
              } shadow-lg hover:shadow-xl`}
            >
              Get Quote
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6 : 0,
              }}
              className={`w-6 h-0.5 transition-colors duration-300 ${
                scrolled ? "bg-romero-gray-dark" : "bg-white"
              } rounded-full`}
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className={`w-6 h-0.5 mt-1.5 transition-colors duration-300 ${
                scrolled ? "bg-romero-gray-dark" : "bg-white"
              } rounded-full`}
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6 : 0,
              }}
              className={`w-6 h-0.5 mt-1.5 transition-colors duration-300 ${
                scrolled ? "bg-romero-gray-dark" : "bg-white"
              } rounded-full`}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl mt-4 border border-romero-gray-light shadow-xl"
            >
              <div className="px-6 py-8 space-y-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                    className="block text-lg font-medium text-romero-gray-dark hover:text-romero-gray transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  custom={navItems.length}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-romero-gray-dark text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-romero-gray-medium transition-colors duration-300"
                >
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
