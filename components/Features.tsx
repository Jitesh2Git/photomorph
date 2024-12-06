"use client";

import { transformations } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Features = () => {
  const { isSignedIn } = useUser();
  const { toast } = useToast();

  const handleClick = (event: React.MouseEvent) => {
    if (!isSignedIn) {
      event.preventDefault();
      toast({
        description: (
          <p className="text-sm font-medium max-sm:text-xs max-sm:text-center">
            Please Sign up to use our AI Transformation features.
          </p>
        ),
        className: "bg-indigo-500 text-white",
      });
    }
  };

  return (
    <section className="relative px-6 py-20">
      <div className="absolute bottom-0 left-0 w-full bg-[#f8f9f9] h-1/2"></div>
      <div className="max-w-6xl mx-auto text-[#454545] ">
        <div className="relative z-10">
          <h1 className="text-center font-bold text-5xl max-lg:text-3xl">
            Ramp up the creativity - and efficiency!
          </h1>
          <p className="p-8 max-w-4xl mx-auto text-center font-medium max-sm:p-4">
            Transform your images effortlessly with our AI-powered tools. From
            restoring old photos to removing or recoloring objects, and even
            generating custom backgrounds, we&apos;ve got everything you need to
            bring your creative ideas to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto pt-10">
            {transformations.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                onClick={(e) => handleClick(e)}
                className="bg-white p-6 rounded-2xl border-[3px] border-zinc-100 
              hover:border-[rgb(57,255,229)]/80 flex flex-col group hover:-translate-y-1 
              transition-all duration-300"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={40}
                  height={40}
                  className="w-6 h-6 mb-4"
                />
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{link.label}</span>
                  <span className="inline-block group-hover:animate-move-arrow">
                    <ArrowRight />
                  </span>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
