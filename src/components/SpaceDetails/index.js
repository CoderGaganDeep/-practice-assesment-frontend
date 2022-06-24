const SpaceDetails = (props) => {
  return (
    <div
      style={{
        border: "red",
        width: "500px",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
      key={props.id}
    >
      <h2>Name: {props.name}</h2>
      <p>Story: {props.content}</p>
      <img src={props.imageUrl} alt={props.name} />
    </div>
  );
};
export default SpaceDetails;
