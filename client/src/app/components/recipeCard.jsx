import React from "react";
import { Link } from "react-router-dom";
import { getEatingTime } from "../utils/getEtingTime";

const RecipeCard = (props) => {
  return (
    <tr key={props._id}>
      <td className="signupcontainer">
        <Link to={`/recipes/${props._id}`}>{props.name}</Link>
      </td>
      <td>{props.ingridients}</td>
      <td>
        <div>{getEatingTime(props)}</div>
      </td>
    </tr>
  );
};

export default RecipeCard;
