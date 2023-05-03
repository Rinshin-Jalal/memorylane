import React from "react";
import { RiHome5Line } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";
import { TbUpload } from "react-icons/tb";

function Sidebar() {
  return (
    <div className="flex flex-col text-white px-10 py-10 border-e border-gray-8000">
      <div className="flex items-center text-3xl font-bold mb-8">
        <span>Memory Lane</span>
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <nav className="flex flex-col items-start">
          <a
            href="#"
            className="flex items-center px-4 mb-8 h-12 text-white hover:bg-gray-900 rounded-md"
          >
            <RiHome5Line className="mr-4 text-3xl text-gray-400" />
            <span className="text-xl font-semibold">Exercises</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 mb-8 h-12 text-white hover:bg-gray-900 rounded-md"
          >
            <RiCustomerService2Line className="mr-4 text-3xl text-gray-400" />
            <span className="text-xl font-semibold">Support</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 mb-8 h-12 text-white hover:bg-gray-900 rounded-md"
          >
            <RiUser3Line className="mr-4 text-3xl text-gray-400" />
            <span className="text-xl font-semibold">Profile</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 mb-8 h-12 text-white hover:bg-gray-900 rounded-md"
          >
            <RiHeart3Line className="mr-4 text-3xl text-gray-400" />
            <span className="text-xl font-semibold">Loved</span>
          </a>

          <a
            href="/memories/add"
            className="flex items-center px-4 mb-8 h-12 text-white  bg-gray-900 hover:text-white  hover:bg-gray-700 rounded-md"
          >
            <TbUpload className="mr-4 text-2xl" />
            <span className="text-xl font-semibold">Add Memory</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
<a
  href="#"
  className="flex items-center px-4 mb-12 h-12 text-white  bg-gray-900 hover:text-white  hover:bg-gray-700 rounded-md"
>
  <TbUpload className="mr-4 text-2xl" />
  <span className="text-xl font-semibold">Store</span>
</a>;
