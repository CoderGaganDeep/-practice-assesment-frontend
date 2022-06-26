import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaces } from "../../store/spaces/thunks";
import { selectSpaces } from "../../store/spaces/selectors";
import MySpaceComponent from "../../components/MySpaceComponent";

export default function MySpace() {
  const dispatch = useDispatch();
  const myspaces = useSelector(selectSpaces);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        MySpace from page for user:
      </h1>

      {myspaces.map((myspace) => {
        return (
          <div>
            {" "}
            <MySpaceComponent
              key={myspace.id}
              id={myspace.id}
              title={myspace.title}
              description={myspace.description}
              backgroundColor={myspace.backgroundColor}
              color={myspace.color}
              showLink={true}
            />
          </div>
        );
      })}
    </>
  );
}
