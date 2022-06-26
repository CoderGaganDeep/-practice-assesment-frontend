### Setup project & database

# SEQUELIZE

Config => Configure for example where is our database
Models => Models of our data (users, product, orders, categories)
Migrations => Instructions to actually build tables from the models
Seeders => How to input testdata to our tables

USEFUL COMMANDS //

Generate models & migrations:

- npx sequelize-cli model:generate --name user --attributes name:string,email:string

Generate seed files:

- npx sequelize-cli seed:generate --name some-users

---

# A. Setup project & database

<!-- # B. Migrations in Sequelize -->

# C. Relations

# D. Setup server

---

# A. Setup project & database

1.  Setup Node.js project and install the following dependencies:

    - mkdir <dirname>
    - cd <dirname>
    - npm init -y
    - git init
    - touch .gitignore -> add /node_modules to it
    - npm i sequelize sequelize-cli pg (installing 3 different things)

2.  Initialize sequelize project, run and open directory in VS Code:

    - npx sequelize-cli init

3.  Create a new ElephantSQL instance

4.  Connect with Postico:

    - use the url, it contains all details you need
    - paste the url in "Host"

5.  Create repo in your git-account

6.  Git in terminal:

    - git add .
    - git commit -m "Initial commit, sequelize init"
    - git remote add origin git@github.com:Miriamvdb/<reponame>.git
    - ggpush

7.  Check your Github if it's there

    - For every next commit do: git add ., git commit -m "Something here", ggpush

8.  Use the corresponding configs for your config.json

    ```js
    "development": {
    "url": "postgres://mldvuswk:XAH6kMr1GNAzbzSV-NehLEhBuukRnZqB@dumbo.db.elephantsql.com/mldvuswk",
        // {dialect}://{username}:{password}@{host_url}:{PORT}/{db_name}
    "dialect": "postgres"
    },
    ```

    Also: go to models/index.js, line 15. Change that line to:

    ```js
    sequelize = new Sequelize(config.url, config);
    ```

9.  Generate the models (in this case: user, todoList and todoItem),
    with attributes (in this case: name, email, phone, password, task, deadline):

    user: name, email, phone, password
    todoList: name
    todoItem: task, deadline

    - npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,password:string

    - npx sequelize-cli model:generate --name todoList --attributes name:string

    - npx sequelize-cli model:generate --name todoItem --attributes task:string,deadline:integer

10. Run the migrations and check in your database client that you can see your
    new tables and columns.

    - npx sequelize-cli db:migrate
    - npx sequelize-cli db:migrate:undo:all

11. Generate skeleton seed files, one for each.

    - npx sequelize-cli seed:generate --name some-users
    - npx sequelize-cli seed:generate --name some-todoLists
    - npx sequelize-cli seed:generate --name some-todoItems

12. Get some data into each table and run.

    - npx sequelize-cli db:migrate
    - npx sequelize-cli db:seed:all
    - npx sequelize-cli db:migrate:undo:all

---

<!-- # B. Migrations in Sequelize -->

<!-- 1.  Generate a migration to alter our todoItem to contain a new boolean
    attribute: important.

    - Open the models/todoItem.js
    - Add this new attribute as the others are, with the dataType.BOOLEAN like:

      ```js
      important: DataTypes.BOOLEAN;
      ```

2.  Generate the migration's skeleton run:

    - npx sequelize-cli migration:generate --name first-migration

3.  Go to your terminal and run:

    - npx sequelize-cli db:migrate -->

---

# C. Relations

1.  Generate a new file to add the relation

    - npx sequelize-cli migration:generate --name set-up-relations

2.  Open both model files, in this case: user.js and todoList.js

    ```js
    // In user.js we have to add a hasMany() relation:

      static associate(models) {
      user.hasMany(models.todoList), { foreignKey: "userId" };
      };

    // &&
    // In todoList.js we have to add a belongsTo() relation

      static associate(models) {
      todoList.belongsTo(models.user, { foreignKey: "userId" });
      };
    ```

3.  Models done, back to migration file. Lets declare those columns
    in our migration file. To tie todoLists to users we need a
    userId column in our todoList table. Add:

    ```js
    "use strict";

    module.exports = {
      async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("todoLists", "userId", {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });

        // // Here you can add more queries --> in ONE async up, for example:

        // await queryInterface.addColumn("todoItems", "listId", {
        // type: Sequelize.INTEGER,
        // references: {
        // model: "todoLists",
        // key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "SET NULL",
        // });
      },

      async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("todoLists", "userId");

        // // Here you can add more queries --> in ONE async down for example
        // await queryInterface.removeColumn("todoItems", "listId");
      },
    };
    ```

4.  Migrate and check Postico:

    - npx sequelize-cli db:migrate

    And undo! So we can modify the table again:

    - npx sequelize-cli db:migrate:undo:all

5.  a. Undo all your migrations and add the foreignKey to the seed files
    (in ...some-todoLists.js & ...some-todoItems.js):

    ```js
    // for example: add "userId: 3" in ...some-todoLists.js
    [
      {
        name: "Eleminate all the back-players",
        userId: 3, // this
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // &&
    // for example: add "listId: 3" in ...some-todoItems.js
    [
      {
        task: "Make sliding on Mirrie",
        deadline: "This saturday during the warming-up",
        createdAt: new Date(),
        updatedAt: new Date(),
        important: false,
        listId: 3, // this
      },
    ];
    ```

6.  b. While seeding files with data:

    ```js
    // UP: Pay attention for, in this file "users" in EACH seed file:
    await queryInterface.bulkInsert(
      "users",
      [
        {
          // data here
        },
      ],
      {}
    );

    // &&
    // DOWN: Pay attention for, in this file "users" in EACH seed file:
    await queryInterface.bulkDelete("users", null, {});
    ```

7.  Run migrate files and seeds files:

    - npx sequelize-cli db:migrate
    - npx sequelize-cli db:seed:all

8.  Write queries to test

# D. Setup server

1.  Setup server in index.js file >> ON ROOT <<:

    - touch index.js
    - npm i express

    ```js
    // import express
    const express = require("express");
    // create PORT
    const PORT = process.env.PORT || 4000;
    // create the app (server)
    const app = express();
    // import User from models-directory
    const User = require("./models").user;
    // this is to ... Use it above the rest of your code.
    app.use(express.json());

    // start the server
    app.listen(PORT, () => console.log(`Listening on :${PORT}`));
    ```

2.  Test the server in your browser. You should see Cannot GET /
    in the browser, and the message "Listening on 4000" in the terminal.
