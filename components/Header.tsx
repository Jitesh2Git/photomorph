"use client";

import Image from "next/image";
import React, { useState } from "react";
import { SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import TransformationOptions from "./TransformationOptions";
import { Hamburger } from "./Hamburger";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isSignedIn } = useUser();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const activePage = {
    credits: pathname === "/credits",
    dashboard: pathname === "/dashboard",
  };

  return (
    <>
      <header
        className="flex justify-between items-center shadow-sm px-8 py-5 sticky top-0 
      z-50 bg-white/50 backdrop-blur-md font-sans 2xl:max-w-7xl 2xl:mx-auto"
      >
        <div className="flex items-center gap-10">
          <Link href="/" onClick={() => setMobileNavOpen(false)}>
            <Image
              src="/assets/images/logo-text.png"
              alt="Logo Image"
              width={576}
              height={112}
              className="w-[200px] h-10"
            />
          </Link>
          <SignedIn>
            <TransformationOptions />
            <Link
              href="/credits"
              className={`font-semibold text-md text-[#55616c] px-4 py-3 rounded-full max-lg:hidden 
                flex items-center gap-2 ${
                  activePage.credits
                    ? "bg-purple-gradient text-white"
                    : "hover:bg-[#eef0f2]"
                }`}
            >
              <Image
                src="/assets/icons/bag.svg"
                alt="Logo Image"
                width={20}
                height={20}
                className={`${activePage.credits && "brightness-200"}`}
              />
              Buy Credits
            </Link>
            <Link
              href="/dashboard"
              className={`font-semibold text-md text-[#55616c] hover:bg-[#eef0f2]
          px-4 py-3 rounded-full max-lg:hidden flex items-center gap-2  ${
            activePage.dashboard
              ? "bg-purple-gradient text-white"
              : "hover:bg-[#eef0f2]"
          }`}
            >
              <Image
                src="/assets/icons/profile.svg"
                alt="Logo Image"
                width={20}
                height={20}
                className={`${activePage.dashboard && "brightness-200"}`}
              />
              Dashboard
            </Link>
          </SignedIn>
        </div>
        <div className="max-lg:hidden">
          {isSignedIn ? (
            <div>
              <UserButton showName={true} />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button
                className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit 
      transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] 
      hover:translate-y-[3px]"
              >
                Sign up
              </button>
            </SignInButton>
          )}
        </div>
        <div
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="lg:hidden"
        >
          <Hamburger isOpen={isMobileNavOpen} />
        </div>
      </header>
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
};

export default Header;
