import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const getEatingTime = (props) => {
    if (props.type === "breakfast") {
      return "9.00-12.00";
    } else if (props.type === "dinner") {
      return "12.00-15.00";
    } else {
      return "17.00-19.00";
    }
  };

  return (
    <tr key={props._id}>
      <td className="p-3">
        <Link
          to={`/recipes/${props._id}`}
          className="p-1 border-b-2  hover:border-slate-500  transition delay-100"
        >
          {props.name}
        </Link>
      </td>
      <td>{getEatingTime(props)}</td>
    </tr>
  );
};

export default RecipeCard;
