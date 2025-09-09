"use client";
import CardNav from "@/components/CardNav/CardNav";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import Carousel from "@/components/Carousel/Carousel";
import ProjectGallery from "@/components/ProjectGallery/ProjectGallery";
import { motion } from "framer-motion";
interface projectProps {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Home() {
  const projects: projectProps[] = [
    {
      category: "Residential",
      subcategory: "Multi Family",
      title: "Contemporary Duplex Residences",
      description:
        "Elegant duplex homes with clean lines, generous balconies, and landscaped surroundings for modern family living.",
      image: "/projects/1.jpeg",
      link: "/project-1",
    },
    {
      category: "Civic",
      subcategory: "Institutional",
      title: "Modern Cultural Center",
      description:
        "A striking civic building with bold vertical elements and open courtyards, designed to host exhibitions and events.",
      image: "/projects/2.jpeg",
      link: "/project-2",
    },
    {
      category: "Residential",
      subcategory: "Single Family",
      title: "Minimalist Bungalows",
      description:
        "Single-story homes with sleek white facades and simple, functional layouts that emphasize tranquility.",
      image: "/projects/3.jpeg",
      link: "/project-3",
    },
    {
      category: "Residential",
      subcategory: "Single Family",
      title: "Urban Courtyard Home",
      description:
        "A private residence with a central entrance, blending privacy with modern architectural proportions.",
      image: "/projects/4.jpeg",
      link: "/project-4",
    },
    {
      category: "Civic",
      subcategory: "Community Facilities",
      title: "Public Service Pavilion",
      description:
        "A row of modular units designed for community services, blending practicality with a modern aesthetic.",
      image: "/projects/5.jpeg",
      link: "/project-5",
    },
    {
      category: "Residential",
      subcategory: "Single Family",
      title: "Garden Villa",
      description:
        "A contemporary home surrounded by greenery, offering open terraces and a connection to nature.",
      image: "/projects/6.jpeg",
      link: "/project-6",
    },
    {
      category: "Residential",
      subcategory: "Multi Family",
      title: "Modern Row Houses",
      description:
        "Stylish multi-unit residences featuring geometric facades and shared landscaped spaces.",
      image: "/projects/7.jpeg",
      link: "/project-7",
    },
    {
      category: "Commercial",
      subcategory: "Office",
      title: "Professional Office Block",
      description:
        "A sleek and minimal office complex providing adaptable spaces for modern businesses.",
      image: "/projects/8.jpeg",
      link: "/project-8",
    },
    {
      category: "Residential",
      subcategory: "Vacation Home",
      title: "Suburban Retreat",
      description:
        "A modern getaway home designed with expansive glazing and a calm suburban setting.",
      image: "/projects/9.jpeg",
      link: "/project-9",
    },
    {
      category: "Civic",
      subcategory: "Library",
      title: "Contemporary Knowledge Center",
      description:
        "A public library that merges cutting-edge architecture with functional, welcoming interiors.",
      image: "/projects/10.jpeg",
      link: "/project-10",
    },
    {
      category: "Hospitality",
      subcategory: "Restaurant",
      title: "Poolside Dining Pavilion",
      description:
        "A light-filled dining venue that blends indoor-outdoor spaces with modern luxury design.",
      image: "/projects/11.jpeg",
      link: "/project-11",
    },
  ];

  const items = [
    {
      label: "Contact",

      bgColor: "#171718",

      textColor: "#c5c6c8",

      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:" },

        {
          label: "Facebook",
          ariaLabel: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61577381315326",
        },
        {
          label: "Instagram",
          ariaLabel: "Instagram",
          href: "https://www.instagram.com/romeroarchitects",
        },
      ].sort((a, b) => a.label.localeCompare(b.label)),
    },
  ];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isProjectGalleryOpen, setIsProjectGalleryOpen] = useState(false);

  useEffect(() => {
    // Delay carousel render to allow CardNav animation to finish
    const timer = setTimeout(() => setShowCarousel(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGalleryToggle = (isOpen: boolean) => {
    setIsGalleryOpen(isOpen);
    setIsProjectGalleryOpen(isOpen);
  };

  const handleProjectClick = (index: number) => {
    setCurrentIndex(index);
    setIsProjectGalleryOpen(false);
    setIsGalleryOpen(false);
  };

  return (
    <>
      <CardNav
        logo={{
          desktop: "white/4.png",
          mobile: "white/2.png",
        }}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#fff"
        buttonBgColor="#fff"
        buttonTextColor="#fff"
        ease="power3.out"
        onGalleryOpen={handleGalleryToggle}
        isGalleryOpen={isProjectGalleryOpen}
      />
      {/* Carousel with zoom-out animation to gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showCarousel && !isProjectGalleryOpen ? 1 : 0,
          scale: isProjectGalleryOpen ? 0.8 : 1,
          y: isProjectGalleryOpen ? -100 : 0
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {showCarousel && (
          <Carousel
            projects={projects}
            isGalleryOpen={isGalleryOpen}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </motion.div>

      {/* Project Gallery Overlay */}
      <ProjectGallery
        projects={projects}
        isOpen={isProjectGalleryOpen}
        onClose={() => {
          setIsProjectGalleryOpen(false);
          setIsGalleryOpen(false);
        }}
        onProjectClick={handleProjectClick}
        currentIndex={currentIndex}
      />
    </>
  );
}
