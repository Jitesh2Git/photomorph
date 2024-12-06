import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#6466f1]">
      <div
        className="flex items-center justify-between max-w-6xl mx-auto h-20 px-5
       gap-6"
      >
        <Link href="/">
          <Image
            src="/assets/images/logo-text.png"
            alt="Logo"
            width={180}
            height={40}
            className="bg-white rounded-full p-2"
          />
        </Link>
        <p className="text-sm text-white max-sm:text-xs">
          &copy; 2024 PhotoMorph. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
