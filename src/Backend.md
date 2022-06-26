STEPS TO CREATE BACKEND
MAKE DIRECTORY
Open https://customer.elephantsql.com/instance - Create new instance, copy the URL link
Open postico, paste the URL in Host & login

INITIALIZE THE PROJECT- INSTALL NPM & GIT PACKAGES
Create New folder (enter into the folder)
npm init -y
git init
touch .gitignore
Add /node_modules in your gitignore file
npm install express

SEQUELIZE- SETUP
npm install sequelize
npm install sequelize-cli
npm install pg
npx sequelize-cli init (setup sequelize with config,migrations,models,seeders empty folders)
git add .
git commit -m 'Initial commit, sequelize init'

CONNECTING TO DATABASE
Create a new PostgresSQL instance in ElephantSQL(link on top)
Head to the config folder and open the config.json
Add “url” from elephant SQL to config.json and
"dialect": "postgres"
Open models/index.js - change line 15 to this:
sequelize = new Sequelize(config.url, config);

CREATE TABLES & SETUP ATTRIBUTES
Generate models in ORM libraries
npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,password:string
Result: model and migration created
Defining migration - attributes
email: { type: DataTypes.STRING, allowNull: false, unique: true }
npx sequelize-cli db:migrate

CREATE SEEDS: Adding values to tables
Seeds:
$ npx sequelize-cli seed:generate --name some-users
New folder Seeds is created - now add data
Run seed to add data to the table
Add data
npx sequelize-cli db:seed:all

## To un-do the seed we can use - delete data

npx sequelize-cli db:seed:undo:all

## We can also point to a specific seed file to run instead of "all" using the --seed flag

$ npx sequelize-cli db:seed --seed 20191211110453-some-users
$ npx sequelize-cli db:seed:undo --seed 20191211110453-some-users.js (.js at the end o

ENDPOINTS
Endpoint to get the data out of server:
npm install express
create an index.js file in the root of your project
node index.js

To find errors:
npx sequelize-cli db:migrate-- debug
If at any time during creating models or running seeds you get errors, usually the best way to fix them is starting from scratch. But don't panic, this is exactly what we have sequelize-cli for! Since we don't have any real data in our DB we can easily undo all migrations, causing us to delete all of our tables and quickly recreate them by running the migrations again, so we can do:

$ npx sequelize-cli db:migrate:undo:all
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all

NOTES: Always keep run these on terminal after any change

1. npx sequelize-cli db:migrate:undo:all
2. npx sequelize-cli db:migrate
3. npx sequelize-cli db:seed:undo:all
4. npx sequelize-cli db:seed:all
   // example of an request with a reder in HTTPI

QUERYING
Create a file sample-query.js & after query node sample-query.js
const { Op } = require("sequelize");
// Select all rows where firstName === 'Dave', but only return the first one.
// Resolves with an object or undefined (if no matching rows exist)
const specificUser = await User.findOne({ where: { name: "Dave" } });
// Select a row by its primary key. Resolves with an object or undefined (if no matching rows exist)
const userByPk = await User.findByPk(3);
// A query using a numeric operator
const tallUsers = await User.findAll({
// WHERE height >= 175 where: { height: { [Op.gte]: 175, // gte stands for 'greater than or equal' }, }, });

(B) RELATIONS IN SEQUALIZE

Sequelize facilitates a bunch of methods to specify these relationships. Like::

belongsTo()
belongsToMany()
hasOne()
hasMany()

TodoList belongsTo() User, User hasMany() TodoLists
TodoItem belongsTo() TodoList, TodoList hasMany() TodoItems.

users => todoList relation.
Create new file in models - setup relations (Generate new migration)
npx sequelize-cli migration:generate --name set-up-relations
Open Model file (Add model defination)
Add the following in model (user is file name)
static associate(models) {
user.hasMany(models.todoList, { foreignKey: 'userId' });};
Add the following in model (todoList is file name)
static associate(models) {
todoList.belongsTo(models.user, { foreignKey: 'userId' }));};
Back to new migration file, step 1: add the following code:
"use strict";
module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.addColumn("todoLists", "userId", {
type: Sequelize.INTEGER,
references: {
model: "users",
key: "id",
},
onUpdate: "CASCADE",
onDelete: "SET NULL",
});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.removeColumn("todoLists", "userId"); },};

Run sequalize migration
npx sequelize-cli db:migrate
Check database, there should be new attributes/ columns
SEEDING OUR RELATIONS

Helps to generate the data:

Terminal command to seed:
npx sequelize-cli seed:generate --name dummy-users
Lets clear our data:
$ npx sequelize-cli db:migrate:undo:all
$ npx sequelize-cli db:migrate
Add data to the seeds
Terminal command to save
npx sequelize-cli db:seed:all
Check database, there should be new values inside the table

(C) QUERYING RELATIONS

Now our data is ready for queries

Terminal command to seed:
npx sequelize-cli seed:generate --name dummy-users
Create New file in root
node relation-queries.js
Use of include keyword to get data & information on terminal
All user data with all tables
const { user, todoItem, todoList } = require("./models");
async function listsWithUsers() {
const lists = await todoList.findAll({
include: [user],
}); return lists.map((list) => list.toJSON());}
listsWithUsers().then((lists) => console.log(lists));

In order to view only user info change line 4 in above code
include: [{ model: user, attributes: ["name"] }],
Take userID from todo list- change line 4 in above code
include: { model: todoList, attributes: ["name"] },

(D) REST

Representational State Transfer: approach to standardizing the communication between a client and a web service
An architectural style that builds on top of HTTP and URLs

RESTful guidelines:
Clean URLs
Eg: https://example.com/users/943
Operations as HTTP methods
The REST architectural style says that you should interact with resources through the available HTTP methods:
GET, POST, PUT, DELETE, PATCH

CRUD interface- Create, Read, Update & Delete
CRUDE is an API for creating, reading, updating and deleting one particular type of resource.
POST: Create - Creates a new resource inside a collection resource. This method is usually not used for single resources.
GET: Read - Retrieves a resource's representation, or all representations inside a collection
PUT: Update - Updates a resource with the representation provided by the client
PATCH: Update - A special type of update. It merges the existing resource with the representation provided by the client
DELETE: Delete - Deletes the identified resource, or all resources inside a collection

Appropriate use of HTTP status codes
HTTP status codes to indicator the request results
200 - 299: Successful responses
300 - 399: Redirection messages
400 - 499: Client error responses
500 - 599: Server error responses

BUILDING A REST API

Steps to build a RESTful json API with express we need the following:

Express Routes:
// Create a new user account
app.post("/users", (req, res, next) => {
/_.._/
});
// Get a user's information
app.get("/users/:userId", (req, res, next) => {
/_.._/
});
// Update a user's information
app.put("/users/:userId", (req, res, next) => {
/_.._/
});
// Get all user's tasks
app.get("/users/:userId/lists", (req, res, next) => {
/_.._/
});

// And so on for todoItems. And this is only for the User model!
// We could do the same for each of our models.

(E) SETTINGUP EXPRESS APP

Steps to setup express app:

Follow steps to create backend
Npm i express
Create or reuse index.js file from root
Inside index.js file:
const express = require("express");
const User = require("./models").user;
const app = express();
const PORT = 4000;
app.use(express.json());
app.get("/users", async (req, res) => {
const users = await User.findAll();
res.send(users);});
app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));

Start the server
http POST :4000/echo hello=world
You can see the change in terminal & web

const TodoList = require("./models").todoList;

CREATING & READING NEW USERS

Steps to setup new user:

Follow steps to create models, migration, seeder, relations file in migration from backend on page 1 and make sure steps A,B & E are executed.
Start the server in separate terminal npx nodemon index.js
Make post request to users file in index file (step E3 from this file):
To add email to user
app.post("/users", async (req, res, next) => {
try {
const email = req.body.email;
if (!email || email === " ") {
res.status(400).send("Must provide an email address");
} else {
const user = await User.create(req.body);
res.json(user);
}
} catch (e) {
console.log(e.message);
next(e);
}});

Add body parser middleware in the code around line 6-7
app.use(express.json());
Check the output in terminal by adding email id:
http :4000/users name=tim email=test@test.com
Another example to get user by ID
app.get("/users/:userId", async (req, res, next) => {
try {
const userId = parseInt(req.params.userId);
const user = await User.findByPk(userId);
if (!user) {
res.status(400).send("Must provide an valid id");
} else {
res.send(user);
}
} catch (e) {
console.log(e.message); }});

Check the output in terminal by adding email id:
http :4000/users/1
It should display user in terminal else display error 400 & Must provide an valid id

UPDATING USERS

Steps to update a user: use put method

from backend on page 1 and make sure steps A,B & E are executed.
Start the server in separate terminal npx nodemon index.js
Make post request to users file in index file (step E3 from this file):
To update the users:
app.put("/users/:userId", async (req, res, next) => {
try {
const userId = parseInt(req.params.userId);
const userToUpdate = await User.findByPk(userId);
if (!userToUpdate) {
res.status(404).send("User not found");
} else {
const updatedUser = await userToUpdate.update(req.body);
res.json(updatedUser);
}
} catch (e) {
next(e);}});

HELP- what is what
const TodoList = require("./models").todoList;
const User = require("./models").user;
app.get("/users/:userId/lists", async (req, res, next) => {
try {
const userId = parseInt(req.params.userId);
const user123 = await User.findByPk(userId, {
include: [TodoList],
});
if (user123) {
res.send(user123.todoLists);
} else {
res.status(404).send("User not found");
}
} catch (e) {
next(e);
}
});

MIDDLEWARE

Middleware are functions that are called before the handler functions.
Always add next function with middlewares

CREATE & USE MIDDLEWARE

Create and execute all the steps of (A)
Create new middleware js file in root
To run this code need 2 terminals-
Node middleware.js (to start ther server)
http :4000/hello
Paste the following code
const express = require("express");
const app = express();
const port = 4000;
app.get("/someLink", (req, res) => res.send("Hello"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

Now add the following middleware code
const loggingMiddleware = (req, res, next) => {
const currentTime = new Date();
const name = "X-Codaisseur-Time";
console.log(`Request recieved at: ${currentTime}`);
res.setHeader(name, currentTime);
next();
};
app.use(loggingMiddleware);

app.get("/hello", (req, res) => res.send("Hello"));

ROUTERS

It is used to register routes on a Router like an app.
Create new router.js file as a middleware
And update indexjs file in root

router.js
Index.js / server.js
//Import the Router class from express.
const { Router } = require("express");

//Create a new Router instance.
const router = new Router();

//Register a GET endpoint on the / route that sends 'separated' as the response.
router.get("/", (request, response) => response.send("hello world"));

//Export the router.

module.exports = router;

//Import express and the router from ./router.js.

const express = require("express");
const router = require("./router");

//Create a new express server named app.
const app = express();
//Register the router with app.use.app.use(router);

//Start the server on port 4000.
app.listen(4000);

To start the server node server.js
To check result in other terminal - http :4000

MULTIPLE ROUTERS

countriesRouter.js
languagesRouter.js
index.js
const { Router } = require("express");

const router = new Router();

router.get("/", (request, response) =>
response.send(["The Netherlands", "Belgium", "Luxembourg"])
);

module.exports = router;

const { Router } = require("express");

const router = new Router();

router.get("/", (request, response) => response.send(["Dutch", "French"]));

module.exports = router;

const express = require("express");
const countriesRouter = require("./countriesRouter");
const languagesRouter = require("./languagesRouter");

const app = express();
// You can register your different routers under root URLs.
// This means that the "/" route you defined in the
// countriesRouter will be called on a request to "/countries/".
// This helps keep your index file clean and readable.
app.use("/countries", countriesRouter);
app.use("/languages", languagesRouter);

app.listen(5000);

To start server- index.js
To see countries - http: 5000/countries
To see languages - http: 5000/languages

Building Login System

JWT

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

npm install jsonwebtoken
Create auth directory
Create new file Touch - jwt.js
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "e9rp^&^\*&@9sejg)DSUA)jpfds8394jdsfn,m";
function toJWT(data) {
return jwt.sign(data, secret, { expiresIn: "2h" });
}
function toData(token) {
return jwt.verify(token, secret);
}
module.exports = { toJWT, toData };

Go to router folder, create new file name auth.js
​​const { Router } = require('express')
const { toJWT, toData } = require('../auth/jwt')
const router = new Router()
router.post('/login', async (req, res, next) => {
// Here goes the login logic.
})
module.exports = router

Go to root index.js file - add the following lines
const authRouter = require("./routers/auth");
app.use("/", authRouter);

Go back to auth.js file in auth folder ---
to post new login resource that contains JWT
router.post("/login", async (req, res, next) => {
const { email, password } = req.body;
if (!email || !password) {
res.status(400).send("Please supply a valid email and password");
} else {
// 1. look for the user by email
const user = await User.findOne({
where: { email },
});
if (!user) {
res.status(400).send({
message: "User with that email does not exist",
});
}
// 2. use bcrypt.compareSync to check the password against the stored hash
else if (bcrypt.compareSync(password, user.password)) {
// 3. if the password is correct, return a JWT with the userId of the user (user.id)
const jwt = toJWT({ userId: user.id });
res.send({
jwt,
});
} else {
res.status(400).send({
message: "Password was incorrect",
});
}
}
});

Test the app.. Start server - index.js
Test the following on another terminal
http POST :4000/auth/login email='alice@wonderland.com' password=downtherabbithole

CREATING USER- BCRYPT PASSWPRD

npm install bcrypt
Got to routers folder and user.js file - import bcrypt
const bcrypt = require("bcrypt");
Add the following value to password - outers folder and user.js file
password: bcrypt.hashSync(password, 10),

PROTECTING IMAGES-

Resources are available only if the right key is passed JWT
Add this code to the image file in router folder
router.get("/", async (req, res, next) => {
const auth =
req.headers.authorization && req.headers.authorization.split(" ");
if (auth && auth[0] === "Bearer" && auth[1]) {
try {
const data = toData(auth[1]); // this will throw error if verification fails
const allImages = await Image.findAll();
res.json(allImages);
} catch (e) {
res.status(400).send("Invalid JWT token");
}
} else {
res.status(401).send({
message: "Please supply some valid credentials",
}); }});
dd

FINAL TERMINAL COMMANDS
To create new user
http POST :4000/users/ email=aa@aa.com password=one fullname=one
To login
http POST :4000/login email=aa@aa.com password=one
There will be a key in the outpu- Bearer & auth
"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NDIwMzM1OSwiZXhwIjoxNjU0MjEwNTU5fQ.pUDkvKnVKYeHRFYAH0R8EM4yXF4zSxrqdI6Vdx9NaUk"
How to create new image data with middleware and auth token
http :4000/images Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NDIwMjUwNywiZXhwIjoxNjU0MjA5NzA3fQ.DbhWTm4egh4LBvOFl4F18vCjNQy7lj2g17HWicrwuDY" title=wallpape11 url=https://cdn.pixabay.comg

Class Notes Day 1- Backend

Sequelize.define:
It defines a single entity model, which maps to a table

SEEDS:
Get initial data into the DB tables

Class Notes Day 2- Backend

npx - download the most recent one execute/ run
npn - install something & dependencies

Class Notes Day 3- Backend

Middleware:
