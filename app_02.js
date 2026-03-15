
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

// Starting with simple use case - has-user endpoint
// - Should be get endpoint available at /users
// - Should accept query parameter `name` - so we can call it like /users?name=Johnny
// - Should just return 200 if user exists, and 404 if not

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

// TODO: define other endpoints cases - like query parameters, body, etc

// And finally, let's start the app!
app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});

