"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { transformations } from "@/constants";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const TransformationsOptions = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div ref={dropdownRef} className="relative group max-lg:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-3 px-4 py-3 rounded-full 
          ${open ? "bg-[#eef0f2]" : ""} hover:bg-[#eef0f2]`}
      >
        <span className="font-semibold text-md text-[#55616c]">
          Transformations
        </span>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown />
        </motion.span>
      </button>
      {open && (
        <motion.div
          initial="closed"
          animate="open"
          variants={dropdownVariants}
          className="absolute top-[120%] left-1/2 transform -translate-x-1/2 mt-3 w-72
           bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          <motion.ul className="p-4 space-y-3">
            {transformations.map((transformation) => {
              const isActive = transformation.route === pathname;
              return (
                <motion.li
                  key={transformation.route}
                  variants={itemVariants}
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer
                  ${
                    isActive
                      ? "bg-purple-gradient text-white"
                      : "hover:bg-indigo-100"
                  }`}
                >
                  <Image
                    src={transformation.icon}
                    alt={transformation.label}
                    width={30}
                    height={30}
                    className={`w-6 h-6 ${isActive && "brightness-200"}`}
                  />
                  <Link
                    href={transformation.route}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">
                        {transformation.label}
                      </span>
                      <span
                        className={`text-sm text-gray-500 ${
                          isActive && "text-white"
                        }`}
                      >
                        {transformation.description}
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
};

const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 25,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 25,
    },
  },
};

export default TransformationsOptions;
