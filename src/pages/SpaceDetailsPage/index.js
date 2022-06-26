import StoryCard from "../../components/StoryCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById } from "../../store/spaces/thunks";
import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useParams } from "react-router-dom";

export default function Stories() {
  const dispatch = useDispatch();
  const spaceDetailsSelector = useSelector(selectSpaceDetails);

  //1. import useParams hook
  //2. get the id from the params
  const { id } = useParams();
  //3. pass the id to the function

  useEffect(() => {
    dispatch(fetchSpaceById(id));
  }, [dispatch, id]);

  if (!spaceDetailsSelector)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  console.log(spaceDetailsSelector);

  const { stories } = spaceDetailsSelector;
  console.log(stories);

  // Logic to sort the stories
  const sortedStories = [...stories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  //Displaying the data
  //1. write a selector to get the details -> selectors.js -- Done
  //2. import the selector, pass it to the useSelector() hook -> here -- Done
  //3. console.log the selector to make sure it's selecting the data -> here --- Done!
  //4. display the data in the return -> here

  //space: { name: "bla", stories: [] }

  return (
    <>
      <h1>{spaceDetailsSelector.title}</h1>
      {sortedStories.map((story) => {
        return (
          <div>
            <StoryCard
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
