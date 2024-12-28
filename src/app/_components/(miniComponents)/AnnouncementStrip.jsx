"use client"
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const AnnouncementBanner = () => {
  return (
    <div className="bg-transparent relative overflow-hidden py-2">
      {/* Left fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-siteBg via-siteBg to-transparent z-10" />
      
      {/* Right fade effect */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-siteBg via-siteBg to-transparent z-10" />
      
      {/* Scrolling content */}
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <div className="inline-flex items-center gap-4">
          {[...Array(4)].map((_, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 text-gray-200 font-medium px-4"
            >
              <Sparkles className="h-5 w-5" />
              Monthly Sale - Get 20% Off on All Courses!
              <Sparkles className="h-5 w-5" />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
  