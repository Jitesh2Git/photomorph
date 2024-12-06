"use client";

import React from "react";
import { MotionConfig, motion } from "framer-motion";

interface HamburgerProps {
  isOpen: boolean;
}

export const Hamburger: React.FC<HamburgerProps> = ({ isOpen }) => {
  return (
    <div className="flex justify-center items-center">
      <AnimatedHamburgerButton isOpen={isOpen} />
    </div>
  );
};

const AnimatedHamburgerButton: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="relative h-10 w-8"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-6 bg-[#55616c]"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-6 bg-[#55616c]"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "50%",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "50%",
    },
  },
};
