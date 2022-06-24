import react from "react-router-dom";

export default Story = (props) => {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <p>Story: {props.content}</p>
      <img src="{props.imageUrl}" alt="" />
    </div>
  );
};
