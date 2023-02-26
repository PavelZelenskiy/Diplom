import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/recipeCard";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList";
import { useSelector } from "react-redux";
import { getRecipes, getRecipesLoadingStatus } from "../store/recipes";

const URL = "http://84.38.180.24/api/";

const RecipesList = () => {
  //UseStates
  const [currentPage, setCurrentPage] = useState(1);
  const [eatingTypes, setEatingTypes] = useState([]);
  const [selectedEatingType, setSelectedEatingType] = useState();
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

  //Entities
  const pageSize = 4;
  const filtredRecipes = selectedEatingType
    ? recipes.filter((r) => r.type === selectedEatingType.type)
    : recipes;
  const recipesCrop = paginate(filtredRecipes, currentPage, pageSize);

  //UseEffects

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
    <div className="container block">
      <div className="m-10 p-3 text-center">Список рецептов</div>
      <div className="container flex justify-start space-x-3 m-4">
        <GroupList
          items={eatingTypes}
          onItemSelect={handleEatingTypesSelect}
          selectedItem={selectedEatingType}
        />
        <button onClick={handleClearFilter} className="container w-1/3">
          Очистить фильтр
        </button>
      </div>
      <table className="container shadow-lg ">
        <tbody className="border-2">
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
