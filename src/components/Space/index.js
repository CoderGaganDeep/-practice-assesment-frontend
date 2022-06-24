import { Link } from "react-router-dom";

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
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2>Title: {props.title}</h2>
      <p>Description: {props.description}</p>
      <Link to={`/space/${props.id}`}>
        <button>Visit Space</button>
      </Link>
    </div>
  );
}
