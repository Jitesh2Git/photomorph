"use client";

import { squareData } from "@/constants";
import { useClerk, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  const handleClick = () => {
    if (!isSignedIn) {
      clerk.openSignIn();
    }
  };
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto relative z-10">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-semibold ml-1">
          Unleash Your Creativity
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold text-[#454545]">
          Transform Images Like Never Before
        </h3>
        <p className="text-base md:text-lg text-[#454545] my-4 md:my-6 ">
          Discover the power of AI-driven tools to restore, enhance, and
          recreate your photos with ease. From removing objects to adding
          creative flair, the possibilities are endless.
        </p>
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit 
      transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] 
      hover:translate-y-[3px]"
          >
            Dashboard
          </Link>
        ) : (
          <button
            className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit 
      transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] 
      hover:translate-y-[3px]"
            onClick={() => handleClick()}
          >
            Get Started
          </button>
        )}
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState<JSX.Element[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="w-full h-full bg-gray-300"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares}
    </div>
  );
};

export default Hero;
