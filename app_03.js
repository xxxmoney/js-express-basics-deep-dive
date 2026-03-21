
//
//
// Middleware
//
//

//
// Classic Setup Again
//

// As before, let's define a simple express app with some endpoints

import express from 'express';

const PORT = 666;

const app = express();

//
// So what's middleware really?
//

// Now, this is the NEW thing (or rather semi-new)
// The MIDDLEWARE - TLDR - it is just a function that runs before the endpoint processing
// It is used by calling the app.use()

// I said semi-new because we have already used a middleware, albeit a built-in one - the express.json()
// Let's also use it here
app.use(express.json());
// Now this middleware handles the parsing of JSON body

// But we can do aside from using built-in ones is to use our custom, our own
// Let's try a simple one - logging the request method and path
app.use((request, response, next) => {
    console.log(`Received ${request.method} request for ${request.path}`);
    next(); // This is important to have here
    // We need to use this to tell express to continue the pipeline - ie to process the request further
    // Like our defined endpoint handlers, other middleware, etc
});

//
// Our own custom middleware
//

// Pretty neat, right?
// Custom middleware has loads of use cases - logging, authentication, validation, etc

// Let's try doing something more interesting - let's do a simple authentication middleware
// With authentication token
// Goal
// - Specified routes should only be accessible by providing a token
// - Said token should be specified in the header - let's say 'x-auth-token'
// - If the token is missing or invalid, we should return 401 Unauthorized

const TOKEN = '67';
// We define a new method in variable - this is our custom middleware - similarly ot the express.json()
const requireToken = (request, response, next) => {
    const token = request.header('x-auth-token'); // This is how we get the header

    if (!token || token !== TOKEN) {
        response
            .status(401)
            .send('Unauthorized - missing or invalid token'); // Invalid token - so we return 401
        return;
    }

    next(); // As mentioned before - next() so the processing of the request can continue
};

// So now we can use our middleware
// But we won't use it like this: app.use(requireToken);
// Because that would register the middleware for ALL endpoints
// Instead, we can only provide it for specific endpoints

// Like this - the second parameter is the middleware, and the third one is the endpoint handler
app.use('/secret', requireToken, (request, response) => {
    response
        .status(200)
        .send('You have access to the secret, yipee');
});

// And here, just defining a simple endpoint here - this will NOT get protected by the auth middleware
app.get('/beep', (request, response) => {
    response
        .status(200)
        .send('Boop');
});

// Lastly, an interesting usage of another "type" of middleware - error handling middleware
// It is very similar as others, but it has an additional parameter - for the error
// This is a simple error handling middleware - it just logs the error and returns 500
app.use((error, request, response, next) => {
    console.error('An error occurred:', error); // Logging the error - comes in handy for debugging

    response
        .status(500)
        .send('Internal Server Error');
    // Here we return just the 500 with simple message
    // Generally, we don't want to return stack traces of errors to the public
});

// Yet again, finally, starting the web server
app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});

// IMPORTANT NOTE: for education purposes, defining middleware and endpoints is mixed in this file
// But generally, this is the advised order:
// - Global middleware
// - Routes along with their middleware
//  - So for example defining a route and after it its middleware
// - Global 404 and or error handling/catching etc

// Because express executes the functions in the order they are defined, I would advise to follow this somewhat >]

