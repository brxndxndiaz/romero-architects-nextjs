"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onProjectClick: (index: number) => void;
  currentIndex: number;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  isOpen,
  onClose,
  onProjectClick,
  currentIndex,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[98] bg-romero-gray-dark"
          style={{ backdropFilter: "blur(10px)" }}
        >

          {/* Gallery Grid */}
          <div className="w-full h-full overflow-y-auto pt-24 pb-8 px-8" style={{ paddingTop: '120px' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  className="group cursor-pointer"
                  onClick={() => onProjectClick(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    {/* Project Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-500 group-hover:scale-110"
                      quality={90}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    
                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="text-white/80 text-sm uppercase tracking-wide mb-1">
                        {project.category} | {project.subcategory}
                      </div>
                      <h3 className="text-white text-lg font-light leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Current Indicator */}
                    {index === currentIndex && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-lg" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectGallery;
