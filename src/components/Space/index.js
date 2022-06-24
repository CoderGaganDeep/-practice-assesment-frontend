import { NavLink } from "react-router-dom";

export default function Space(props) {
  return (
    <div
      style={{
        flex: "",
        flexDirection: "column",
        flexFlow: "column",

        border: "red",
        backgroundColor: props.backgroundColor,
        color: props.color,
        width: "500px",
      }}
    >
      <h2>Title: {props.title}</h2>
      <p>Description: {props.description}</p>
      <NavLink to={"/"}>
        <button>Visit Space</button>
      </NavLink>
    </div>
  );
}
