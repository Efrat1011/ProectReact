import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#2D9CDB]">Jana Alem</h1>
      <nav className="space-x-4">
        <Link to="/">Басты бет</Link>
        <Link to="/courses">Курстар</Link>
        <Link to="/my-courses">Менің курстарым</Link>
        <Link to="/profile">Профиль</Link>
      </nav>

    </header>
  );
};
export default Header