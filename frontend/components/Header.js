import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-wrap w-full h-16 shadow-lg">
      <div className="left w-[15%] flex items-center mx-auto">
        <div>
          <Image
            className="h-12 w-12 mx-auto rounded-3xl p-1 border "
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={20}
          />
        </div>
        <div className="font-bold ml-4 text-lg">Expense Tracker</div>
      </div>
      <div className="middle w-4/5"></div>
      <div className="right w-1/10"></div>
    </div>
  );
};

export default Header;
