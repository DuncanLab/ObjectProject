import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-500">
      <img src={logo} alt="" className="w-64" />
      <Link
        to="/form"
        className="mt-8 p-2 border-2 border-red-500 rounded text-white text-lg hover:bg-red-500 hover:font-bold"
      >
        Get Started
      </Link>
    </div>
  );
}
