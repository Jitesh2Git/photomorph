"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { transformations } from "@/constants";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { isSignedIn } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const activePage = {
    credits: pathname === "/credits",
    dashboard: pathname === "/dashboard",
  };

  return (
    <motion.div
      className="fixed top-[4.5rem] left-0 w-full h-[calc(100%-4.5rem)] bg-white z-40 
      lg:hidden overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div>
        {isSignedIn ? (
          <>
            <div className="px-4 py-3 mx-2">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-between w-full py-3 rounded-lg mt-4 mx-2"
              >
                <span className="font-semibold text-md text-gray-700">
                  Transformations
                </span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ChevronDown className="mx-2" />
                </motion.span>
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="mt-3 bg-white border border-gray-200 rounded-lg shadow-md max-h-[350px] overflow-y-auto"
                >
                  <ul className="p-4 space-y-3">
                    {transformations.map((transformation) => {
                      const isActive = transformation.route === pathname;
                      return (
                        <li
                          key={transformation.route}
                          className={`flex items-center gap-4 p-3 rounded-2xl hover:bg-indigo-50 cursor-pointer
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
                            className={`w-6 h-6 ${
                              isActive && "brightness-200"
                            }`}
                          />
                          <Link
                            href={transformation.route}
                            onClick={() => {
                              onClose();
                              setDropdownOpen(false);
                            }}
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
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
              <div className="mt-6 space-y-4 text-left font-semibold">
                <hr />
                <Link
                  href="/credits"
                  className={`py-3 px-2 rounded-xl flex items-center gap-2 ${
                    activePage.credits
                      ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white"
                      : "hover:bg-[#eef0f2]"
                  }`}
                  onClick={onClose}
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
                <hr />
                <Link
                  href="/dashboard"
                  className={`py-3 px-2 rounded-xl flex items-center gap-2 ${
                    activePage.dashboard
                      ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white"
                      : "hover:bg-[#eef0f2]"
                  }`}
                  onClick={onClose}
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
                <hr />
              </div>
            </div>
            <div className="bg-purple-100 border-2 py-4 rounded-xl mb-8 text-center mx-5 mt-4">
              <UserButton showName={true} />
            </div>
          </>
        ) : (
          <div className="text-center mt-10">
            <SignInButton mode="modal">
              <button
                className="px-6 py-2 font-medium bg-indigo-500 text-white w-[80%]
                transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] 
                hover:translate-y-[3px]"
              >
                Sign up
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNav;
