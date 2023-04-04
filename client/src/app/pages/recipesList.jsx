import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/recipeCard";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList";
import { useSelector } from "react-redux";
import { getRecipes, getRecipesLoadingStatus } from "../store/recipes";
import { getUserById } from "../store/users";
import { Link } from "react-router-dom";
import { adminToggler } from "../utils/adminToggler";
import configFile from "../config.json";

const URL = `${configFile.apiEndpoint}`;

const RecipesList = () => {
  //UseStates
  const [currentPage, setCurrentPage] = useState(1);
  const [eatingTypes, setEatingTypes] = useState([]);
  const [selectedEatingType, setSelectedEatingType] = useState();
  const [currentUserId, setCurrentUserId] = useState();

  const currentUser = useSelector(getUserById(currentUserId));
  const recipes = useSelector(getRecipes());
  const recipesLoading = useSelector(getRecipesLoadingStatus());

  //Handlers
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleEatingTypesSelect = (item) => {
    setSelectedEatingType(item);
  };
  const handleClearFilter = () => {
    setSelectedEatingType();
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUserId(null);
  };

  //Entities
  const pageSize = 4;
  const filtredRecipes = selectedEatingType
    ? recipes.filter((r) => r.type === selectedEatingType.type)
    : recipes;
  const recipesCrop = paginate(filtredRecipes, currentPage, pageSize);

  const logOutButton = (
    <div className="user_buttons_container">
      <div onClick={logOut} className="add_btn">
        Закончить редактирование
      </div>
    </div>
  );

  const userButtons = (
    <div className="container user_buttons_container">
      <div>
        <Link to={"/addrecipe"} className="add_btn">
          Добавить рецепт
        </Link>
      </div>
      <div onClick={logOut} className="add_btn">
        Выйти
      </div>
    </div>
  );

  //UseEffects

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    axios
      .get(URL + "types")
      .then((res) => {
        setEatingTypes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEatingType]);

  return recipesLoading !== true ? (
    <div>
      <div className="textcontainer">
        <h3>Привет, {currentUser ? `${currentUser.name}` : "незнакомец"}.</h3>{" "}
        На этой странице ты можешь смотреть{" "}
        {currentUser
          ? adminToggler(
              currentUser,
              " и редaктировать/удалять ",
              " и добавлять "
            )
          : null}
        рецепты.
      </div>
      <div className="filtercontainer">
        <GroupList
          items={eatingTypes}
          onItemSelect={handleEatingTypesSelect}
          selectedItem={selectedEatingType}
        />
        <div onClick={handleClearFilter} className="clearfilterbtn">
          Очистить фильтр
        </div>

        <div>
          {" "}
          {currentUser
            ? adminToggler(currentUser, logOutButton, userButtons)
            : null}
        </div>
      </div>
      <table className="table">
        <tbody>
          {recipesCrop.map((r) => {
            return <RecipeCard key={r._id} {...r} />;
          })}
        </tbody>
      </table>
      <Pagination
        itemsCount={filtredRecipes.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default RecipesList;
