Question

- When you are logged in, there should be a link in the navbar to `My space`
- When you click that link you see the space belonging in to your user and its stories
- Ideally, we add the user's space to the information being fetched when we login
- That means modifying the `/me` and `/login` endpoints to also send your space in the response
- Alternatively fetch the data from the endpoint set up for feature #2 (detail page)
- Users also want to be able to delete their own stories.

| Criteria                                                                                                 | Points |
| -------------------------------------------------------------------------------------------------------- | ------ |
| You see a `My space` link in the navbar (but only when you're logged in)                                 | 1      |
| When you click `My space` you see your space and your stories                                            | 1      |
| Your space & stories are fetched using the `/me` and `/login` endpoints                                  | 2      |
| Your space's details are managed by redux                                                                | 2      |
| On `My space`, stories are displayed with a `Delete Story` button which lets them delete their own story | 2.5    |
| The story is removed from the space without manually refreshing (CMD + R / CTRL + R)                     | 1.5    |
| Total                                                                                                    | 10     |

---

Battle Plan
Task 1. You see a `My space` link in the navbar (but only when you're logged in)

- Place Navbar icon in LoggedIn Component
  <NavbarItem path="/myspaces" linkText="MySpaces" />

Task 2. When you click `My space` you see your space and your stories

- create component, create page, coonect routes in app.js
  <Route path="/myspaces" element={<MySpace />} />

Task 3. Your space & stories are fetched using the `/me` and `/login` endpoints

Task 4. Your space's details are managed by redux
Task 5. On `My space`, stories are displayed with a `Delete Story` button which lets them delete their own story
Task 6. The story is removed from the space without manually refreshing (CMD + R / CTRL + R)

1. Create Container = My scape

1. Add an If on your navigation bar, to show the MySpace NavLink just if the token is true; -
1. Import the userId on the Navigation bar to add on the mySpace route; -
1. Fix the endpoint (login + me) of the users to send the mySpace + stories with the data of the user; -
   - [ ] Add a new Space.findOne(userId) inside the login and the me endpoint;
   - [ ] Add the value on the user object before the response.send to the client;
   - [ ] Check the data before pass to the client and inside the client (thunk);
1. Inside the thunks, create a new dispatch to the action setMySpace, with the information of the space and its stories;
1. Create a selector to pass the mySpace data to the mySpace page;
1. Import the mySpace and the user inside the mySpace page using useSelector
1. Display the data on the MySpace page;
1. Create the structure of the page (div, buttons, etc)
1. Delete the Story:
   - [ ] Create the endpoint to delete the story;
   - [ ] Create the thunk to delete the story;
   - [ ] Dispatch the delete thunk from the MySpace page;
1. Create the useEffect to monitor the data and refresh the page when the story is deleted without refresh manually;
   - [ ] Inside the deleteStory thunk make a request to the endPoint: router.get('/details/:id’)
   - [ ] Check the data;
   - [ ] Dispatch the response.data to the setMySpace reducer
   - [ ] Create the mySpace Selector - In this case was created;
   - [ ] Import the mySpace selector on the MySpace page using useSelector - In this case was done;
   - [ ] Add the useEffect to monitor the mySpace;
