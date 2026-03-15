
//
//
// Routing & Request Handling
//
//

//
// Basics again
//

// Before we twelve deeper, let's revise the basics again
// Let's start with the import and creating the app

import {toJson} from "./helpers.js"; // Just my helper functions - not part of the Express

import express from 'express';

const PORT = 666;

const app = express();

//
// Use case definition
//

// Great - from the previous part, we can now create the endpoints easily
// But what if we want to process data from the request? Let's do it!
// Let's have a dead-simple scenario - users api
// Simple api for getting users

// Simple array of users - our de-facto in memory database for this example
const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 40 }
];

//
// Query parameters
//

// Starting with simple use case endpoints:
// - /has-user GET
//  - Should be get endpoint available at /users
//  - Should accept query parameter `name` - so we can call it like /users?name=Johnny
//  - Should just return 200 if user exists, and 404 if not
// - /has-user/:id GET
//  - Should be get endpoint available at /users/:id
//  - Should accept route parameter `id` - so we can call it like /users/1, /users/2, etc
//  - Should just return 200 if user exists, and 404 if not
// - /users POST
//  - Should be post endpoint available at /users
//  - Should accept JSON user in the body - for example, { "name": "Johnny", "age": 35 }
//  - Should create new user with new id and return it with 201

// Imagine we want this endpoint to use query parameters - the thingys after the `?` in the url - for example, `?name=Johnny`
// To access the query parameters, we use `request.query`
// To access specific, we use`request.query.name` for the `name` query parameter
app.get('/has-user', (request, response) => {
    // So let's get the query parameter
    const name = request.query.name;
    const user = users.find(user => user.name === name);

    // Now, let's check if user with this name exists
    if (user) {
        // If user exists, we return 200
        response.status(200).send(`Found: '${toJson(user)}'`);
        return;
    }

    // Otherwise, we return 404
    response.status(404).send(`Could not find by name: '${name}'`);
});

//
// Route parameters
//

// Great, we now can use query parameters
// Next up is route parameter - simply, it's a part of path that should be treated as variable
// For example `/users/:id` - here `:id` is a route parameter - because it can be any value - for example, `/users/1`, `/users/2`, etc
// To access route parameters, we use `request.params` - for example, `request.params.id` for the `id` route parameter
// Important note - query parameters and router parameters are strings - so we cannot just assume it will be number in our case - requires some handling

// Let's not define the endpoint - /users/:id
// Notice how we can use the same name as previous nedpoint - it is because this endpoints also has the router parameter - so they are different endpoints
app.get('/has-user/:id', (request, response) => {
    // We can get the route parameter here
    const id = request.params.id;

    if (isNaN(id)) {
        response.status(400).send(`Invalid id: '${id}' - should be a number`);
        return;
    }

    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        response.status(400).send(`Could not find by id: '${id}'`);
        return;
    }

    response.status(200).send(`Found: '${toJson(user)}'`);
});

//
// Body JSON
//

// Finally, let's do the /users POST endpoint
// For this one, we will need to access the `request.body` - to get the JSON
// Important note - by default, Express doe NOT parse the body - we need to define the parsing
// The parsing is done by middleware - more on these later

// For now, let's just do this line which enables the parsing of JSON body - so we can access `request.body` as JSON
app.use(express.json()); // This one little boi here >]

// And now, onto defining the endpoint - /users POST
app.post('/users', (request, response) => {
    // Access the body here - we can now, we we have used the JSON middleware
    const { name, age } = request.body; // using fancy destructuring here - so we can get name and age from the body

    // Now, let's do some basic validation
    if (!name || !age) {
        response.status(400).send(`Missing name or age, got: '${toJson(request.body)}'`);
        return;
    }

    if (isNaN(age)) {
        response.status(400).send(`Invalid age: '${age}' - should be a number`);
        return;
    }

    // Now, let's create new user - we will just push it to our in-memory array
    const newUser = {
        id: users.length + 1,
        name,
        age: parseInt(age)
    };
    users.push(newUser);

    // And finally, let's return the user with response 201 - which means created
    // As we now have the middleware for JSON, we can also return JSON - let's do it
    response.status(201).json(newUser);
});

// And finally, let's start the app!
app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});

