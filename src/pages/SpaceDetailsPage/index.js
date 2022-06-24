import SpaceDetails from "../../components/SpaceDetails";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById } from "../../store/spaces/thunks";
import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useParams } from "react-router-dom";

export default function Stories() {
  const dispatch = useDispatch();
  const SpaceDetailsSelector = useSelector(selectSpaceDetails);

  //1. import useParams hook
  //2. get the id from the params
  const { id } = useParams();
  //3. pass the id to the function

  useEffect(() => {
    dispatch(fetchSpaceById(id));
  }, [dispatch, id]);

  if (!SpaceDetailsSelector)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  console.log(SpaceDetailsSelector);

  const { stories } = SpaceDetailsSelector;
  console.log(stories);

  //Displaying the data
  //1. write a selector to get the details -> selectors.js -- Done
  //2. import the selector, pass it to the useSelector() hook -> here -- Done
  //3. console.log the selector to make sure it's selecting the data -> here --- Done!
  //4. display the data in the return -> here

  //space: { name: "bla", stories: [] }

  return (
    <>
      <h1>{SpaceDetailsSelector.title}</h1>
      {stories.map((story) => {
        return (
          <div>
            <SpaceDetails
              key={story.id}
              id={story.id}
              name={story.name}
              content={story.content}
              imageUrl={story.imageUrl}
              showLink={true}
            />
          </div>
        );
      })}
    </>
  );
}
