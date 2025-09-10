"use client";

import { Menu } from "lucide-react";
import SideBar from "./SideBar";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="bg-stalker-offwhite w-full mx-auto font-montserrat">
        <div className="py-10 px-6 md:px-20">
          <div className="flex items-center justify-between">
            <Menu
              className="size-10 text-stalker-brown cursor-pointer transition-all"
              onClick={() => setIsOpen(!isOpen)}
            />
            <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <h1 className="text-2xl md:text-3xl text-stalker-brown">
              HABIT STALKER <span className="text-stalker-pink">●</span>
            </h1>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
