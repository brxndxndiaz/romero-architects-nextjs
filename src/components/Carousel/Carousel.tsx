import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CarouselProps {
  projects: {
    category: string;
    subcategory: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
  isGalleryOpen: boolean;
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

interface CarouselItemProps {
  project: {
    category: string;
    subcategory: string;
    title: string;
    description: string;
    image: string;
    link: string;
  };
  projects: {
    category: string;
    subcategory: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
  cursor: {
    type: "left" | "right" | null;
    x: number;
    y: number;
  };
  setCursor: React.Dispatch<
    React.SetStateAction<{
      type: "left" | "right" | null;
      x: number;
      y: number;
    }>
  >;
  goToNext: () => void;
  goToPrev: () => void;
  currentIndex: number;
  imagePreloaded: boolean;
  allImagesPreloaded: boolean;
}

function CarouselItem({
  project,
  projects,
  cursor,
  setCursor,
  goToNext,
  goToPrev,
  currentIndex,
  imagePreloaded,
  allImagesPreloaded,
}: CarouselItemProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [displayProject, setDisplayProject] = useState(project);
  const [previousProject, setPreviousProject] = useState(project);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  // Swipe preview state
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  // Only trigger load animation once images are preloaded
  useEffect(() => {
    if (imagePreloaded || allImagesPreloaded) {
      const timer = setTimeout(() => setHasLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [imagePreloaded, allImagesPreloaded]);

  // Handle project transitions smoothly - only depend on project changes from parent
  useEffect(() => {
    console.log("Project changed from parent:", project.title);
    setPreviousProject(displayProject);
    setIsTransitioning(true);

    // Start image crossfade immediately
    setImageKey((prev) => prev + 1);

    // Update text content and end transition
    const timer = setTimeout(() => {
      console.log("Updating text content to:", project.title);
      setDisplayProject(project);
      console.log("Ending transition, isTransitioning -> false");
      setIsTransitioning(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [project.title]); // Only depend on project title changing

  return (
    <div
      className={`relative w-full flex items-center justify-center h-[100svh]`}
      style={{
        minHeight: 400,
        cursor:
          cursor.type === "left" || cursor.type === "right" ? "none" : "auto",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center w-full h-full transition-all ease-out duration-500 select-none"
        onTouchStart={(e) => {
          const t = e.touches[0];
          (e.currentTarget as any)._touchStart = { x: t.clientX, y: t.clientY };
          setIsSwipeActive(true);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          const start = (e.currentTarget as any)._touchStart;
          if (!start || !isSwipeActive) return;

          const dx = t.clientX - start.x;
          const dy = t.clientY - start.y;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          // Only track horizontal swipes
          if (absDx > absDy && absDx > 10) {
            const maxSwipe = window.innerWidth * 0.3; // 30% of screen width
            const clampedOffset = Math.max(-maxSwipe, Math.min(maxSwipe, dx));
            const normalizedOffset = Math.abs(clampedOffset) / maxSwipe; // 0 to 1

            setSwipeOffset(normalizedOffset);
            setSwipeDirection(dx < 0 ? "left" : "right");
            (e.currentTarget as any)._touchEnd = { x: t.clientX, y: t.clientY };
          }
        }}
        onTouchEnd={(e) => {
          const start = (e.currentTarget as any)._touchStart;
          const end = (e.currentTarget as any)._touchEnd;

          setIsSwipeActive(false);
          setSwipeOffset(0);
          setSwipeDirection(null);

          if (!start || !end) return;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          const threshold = 50;

          if (absDx > absDy && absDx > threshold) {
            if (dx < 0) {
              goToNext();
            } else {
              goToPrev();
            }
          }
        }}
      >
        {/* Text Content Overlay */}
        <div className="w-full h-full absolute bg-romero-gray-dark/30 z-20 flex items-end justify-start p-8 md:p-14 pb-20 md:pb-14 pointer-events-none">
          <div className="inner pointer-events-auto">
            <div className="flex flex-col items-start space-y-4 relative z-30">
              <motion.div
                className="flex items-center space-x-2 mb-2 text-lg md:text-xl lg:text-2xl text-white uppercase font-medium"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  y: isTransitioning ? 20 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ position: "relative", zIndex: 50 }}
              >
                <span>{displayProject.category}</span>
                <span className="opacity-75">|</span>
                <span className="opacity-75">{displayProject.subcategory}</span>
              </motion.div>

              <motion.h4
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight uppercase"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  y: isTransitioning ? 30 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: isTransitioning ? 0 : 0.1,
                }}
                style={{ position: "relative", zIndex: 50 }}
              >
                {displayProject.title}
              </motion.h4>

              <motion.p
                className="text-white font-light w-full sm:w-2/3 text-base sm:text-lg md:text-xl"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  y: isTransitioning ? 20 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: isTransitioning ? 0 : 0.2,
                }}
                style={{ position: "relative", zIndex: 50 }}
              >
                {displayProject.description}
              </motion.p>

              {/* Read More Button - Temporarily Hidden */}
              {/* 
              <motion.button
                className="loadpage in relative overflow-hidden px-6 py-2 text-white font-semibold text-base sm:text-lg md:text-xl cursor-pointer z-40"
                style={{ 
                  visibility: hasLoaded ? "visible" : "hidden",
                  position: "relative",
                  zIndex: 40,
                  pointerEvents: "auto"
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hasLoaded && !isTransitioning ? 1 : 0,
                  y: isTransitioning ? 10 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: hasLoaded ? 0.15 : 1.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add your read more functionality here
                  console.log('Read more clicked for:', displayProject.title);
                }}
              >
                <span className="relative z-10">
                  Read More
                </span>
                {/* Animated borders - only animate on initial load */}
              {/* hasLoaded && (
                  <>
                    <motion.div
                      className="left absolute left-0 top-0 h-full w-[0.5px] bg-white"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1.3, delay: 1.1 }}
                      style={{ transformOrigin: "top" }}
                    />
                    <motion.div
                      className="top absolute left-0 top-0 w-full h-[0.5px] bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.3, delay: 1.2 }}
                      style={{ transformOrigin: "left" }}
                    />
                    <motion.div
                      className="right absolute right-0 top-0 h-full w-[0.5px] bg-white"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1.3, delay: 1.3 }}
                      style={{ transformOrigin: "bottom" }}
                    />
                    <motion.div
                      className="bottom absolute left-0 bottom-0 w-full h-[0.5px] bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, delay: 1.4 }}
                      style={{ transformOrigin: "right" }}
                    />
                  </>
                )
                */}
              {/*</motion.button>*/}
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden max-w-full max-h-[100svh]">
          <div className="absolute w-full h-full inset-0 bg-red-50/0 z-10 flex flex-row pointer-events-auto">
            {/* Left area (desktop only) */}
            <div
              className="hidden md:block h-[100svh] w-1/4 bg-red-200/0 relative cursor-pointer"
              style={{ pointerEvents: "auto" }}
              onMouseEnter={() => setCursor((c) => ({ ...c, type: "left" }))}
              onMouseLeave={() => setCursor({ type: null, x: 0, y: 0 })}
              onMouseMove={(e) =>
                setCursor({ type: "left", x: e.clientX, y: e.clientY })
              }
              onClick={(e) => {
                // Only navigate if not clicking on interactive elements
                const target = e.target as HTMLElement;
                if (!target.closest("button")) {
                  goToPrev();
                }
              }}
            />
            <div
              className="h-[100svh] flex-1 bg-blue-200/0"
              style={{ pointerEvents: "none" }}
            ></div>
            {/* Right area (desktop only) */}
            <div
              className="hidden md:block h-[100svh] w-1/4 bg-red-200/0 relative cursor-pointer"
              style={{ pointerEvents: "auto" }}
              onMouseEnter={() => setCursor((c) => ({ ...c, type: "right" }))}
              onMouseLeave={() => setCursor({ type: null, x: 0, y: 0 })}
              onMouseMove={(e) =>
                setCursor({ type: "right", x: e.clientX, y: e.clientY })
              }
              onClick={(e) => {
                // Only navigate if not clicking on interactive elements
                const target = e.target as HTMLElement;
                if (!target.closest("button")) {
                  goToNext();
                }
              }}
            />
          </div>

          {/* Follow cursor arrow */}
          {cursor.type && (
            <div
              style={{
                position: "fixed",
                top: cursor.y,
                left: cursor.x,
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "#fff",
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              {cursor.type === "left" ? "‹" : "›"}
            </div>
          )}

          <div className="w-full h-full relative overflow-hidden">
            {/* Base Image Layer - continues zoom from current state */}
            <motion.div
              className="w-full h-full absolute inset-0"
              animate={{
                scale: 1.05,
                opacity: isTransitioning ? 0 : 1,
              }}
              transition={{
                scale: { duration: 20, ease: "linear" },
                opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              style={{
                willChange: "transform, opacity",
                filter: "blur(0px)",
              }}
            >
              <Image
                src={previousProject.image}
                alt={previousProject.title}
                fill
                style={{ objectFit: "cover" }}
                className="w-full h-full"
                loading="eager"
                quality={95}
                sizes="100vw"
              />
            </motion.div>

            {/* Swipe Preview Layer - shows next/prev image during swipe */}
            {isSwipeActive && swipeDirection && swipeOffset > 0 && (
              <div
                className="w-full h-full absolute inset-0"
                style={{
                  opacity: Math.min(swipeOffset * 1.5, 1), // Fade in as user swipes
                  willChange: "opacity",
                  scale: 1.05,
                  filter: "blur(0px)",
                }}
              >
                <Image
                  src={
                    swipeDirection === "left"
                      ? projects[(currentIndex + 1) % projects.length]?.image ||
                        project.image
                      : projects[
                          (currentIndex - 1 + projects.length) % projects.length
                        ]?.image || project.image
                  }
                  alt={
                    swipeDirection === "left"
                      ? projects[(currentIndex + 1) % projects.length]?.title ||
                        project.title
                      : projects[
                          (currentIndex - 1 + projects.length) % projects.length
                        ]?.title || project.title
                  }
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full"
                  loading="eager"
                  quality={95}
                  sizes="100vw"
                />
              </div>
            )}

            {/* Overlay Image Layer - inherits current zoom state */}
            <motion.div
              key={imageKey}
              className="w-full h-full absolute inset-0"
              initial={{
                opacity: 0,
                scale: 1.05, // Start from current zoom level
                filter: hasLoaded ? "blur(4px)" : "blur(24px)",
              }}
              animate={{
                opacity: 1,
                scale: 1.05,
                filter: "blur(0px)",
              }}
              transition={{
                opacity: {
                  duration: isTransitioning ? 0.8 : hasLoaded ? 0.8 : 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                scale: {
                  duration: 20,
                  ease: "linear",
                },
                filter: {
                  duration: isTransitioning ? 1.0 : hasLoaded ? 0.8 : 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              style={{ willChange: "transform, filter, opacity" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                className="w-full h-full"
                loading="eager"
                quality={95}
                sizes="100vw"
                priority={currentIndex === 0}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Carousel: React.FC<CarouselProps> = ({
  projects,
  isGalleryOpen,
  currentIndex,
  setCurrentIndex,
}) => {
  // cursor state stores both direction and mouse coords
  const [cursor, setCursor] = useState<{
    type: "left" | "right" | null;
    x: number;
    y: number;
  }>({ type: null, x: 0, y: 0 });

  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
  };

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise<string>((resolve, reject) => {
          if (typeof window !== "undefined" && window.Image) {
            const img = new window.Image();
            img.onload = () => {
              setImagesLoaded((prev: any) => new Set([...prev, project.image]));
              resolve(project.image);
            };
            img.onerror = () => {
              console.warn(`Failed to preload image: ${project.image}`);
              resolve(project.image); // Resolve anyway to not block other images
            };
            img.src = project.image;
          } else {
            // SSR or no window.Image available
            resolve(project.image);
          }
        });
      });

      try {
        await Promise.all(imagePromises);
        setAllImagesPreloaded(true);
        console.log("All carousel images preloaded successfully");
      } catch (error) {
        console.warn("Some images failed to preload:", error);
        setAllImagesPreloaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, [projects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrev();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full">
      <CarouselItem
        project={projects[currentIndex]}
        projects={projects}
        cursor={cursor}
        setCursor={setCursor}
        goToNext={goToNext}
        goToPrev={goToPrev}
        currentIndex={currentIndex}
        imagePreloaded={imagesLoaded.has(projects[currentIndex].image)}
        allImagesPreloaded={allImagesPreloaded}
      />
  
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            } ${
              imagesLoaded.has(projects[index].image)
                ? "ring-1 ring-white/20"
                : "opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
            disabled={
              !imagesLoaded.has(projects[index].image) && !allImagesPreloaded
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
