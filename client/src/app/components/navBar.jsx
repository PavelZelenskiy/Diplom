import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul className="container w-1/2 flex justify-left mx-left pl-8 py-1 space-x-5 text-1xl">
        <li className="border-b-2  hover:border-slate-500  transition delay-100">
          <Link to="/">Главная страница</Link>
        </li>
        <li className="border-b-2  hover:border-slate-500  transition delay-100">
          <Link to="/recipes">Книга рецептов</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
