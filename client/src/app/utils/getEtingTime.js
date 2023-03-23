import breakfast from "../../pics/breakfast.png";
import dinner from "../../pics/dinner.png";
import evening from "../../pics/evening.png";

export function getEatingTime(props) {
  if (props.type === "breakfast") {
    return <img src={breakfast} alt="breakfast" />;
  } else if (props.type === "dinner") {
    return <img src={dinner} alt="dinner" />;
  } else {
    return <img src={evening} alt="evening" />;
  }
}
