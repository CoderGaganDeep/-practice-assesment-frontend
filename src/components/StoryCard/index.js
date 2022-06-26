const SpaceDetails = (props) => {
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
        width: "800px",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "40px",
        paddingBlockEnd: "10",
        // border: "15px, solid, green",
        //padding: "13px,40px",
      }}
      key={props.id}
    >
      <h2>{props.name}</h2>
      <p>{props.content}</p>
      <img
        style={{ flexDirection: "column-reverse" }}
        src={props.imageUrl}
        alt={props.name}
      />
    </div>
  );
};
export default SpaceDetails;
