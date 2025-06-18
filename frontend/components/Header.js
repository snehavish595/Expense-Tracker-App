import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-wrap w-full h-12">
      <div className="left w-1/10 bg-green-200">
        <Image
          className="h-12 w-12 mx-auto rounded-3xl p-1 border border-amber-500"
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={20}
        />
      </div>
      <div className="middle w-4/5 bg-green-300"></div>
      <div className="right w-1/10 bg-green-400"></div>
    </div>
  );
};

export default Header;
