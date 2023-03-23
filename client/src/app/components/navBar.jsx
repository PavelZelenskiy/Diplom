import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul className="navbar">
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/recipes">Книга рецептов</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
