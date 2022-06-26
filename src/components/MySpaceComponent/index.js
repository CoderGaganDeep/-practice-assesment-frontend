import { Link } from "react-router-dom";

export default function MySpaceComponent(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexFlow: "column",
        alignItems: "center",

        borderBlockEndStyle: "outset",
        borderBlockColor: "ActiveBorder",
        backgroundColor: props.backgroundColor,
        color: props.color,
        width: "700px",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "40px",
        paddingBlockEnd: "10",
      }}
    >
      <h1>This is My SPace from Component</h1>
      <h4>Space:</h4>
      <Link to={`/space/${props.id}`}>
        <button>Edit Space</button>
      </Link>
      <h4>Story: ${props.name}</h4>
      <p>Description: {props.content}</p>
      <button>Post New Story</button> <button>Delete Story</button>
    </div>
  );
}
