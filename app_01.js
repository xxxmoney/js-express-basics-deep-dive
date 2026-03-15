
//
//
// Basic setup - dead simple basics
//
//

//
// What's Express?
//

// Let's get to it right of the bat - Express is a simple library for Node.Js - it allows as to create a simple web server (API)
// We can do it in such a way it requires minimum code, and it's pretty simple - neat, right?

//
// Installation
//

// Pretty simple - firstly, we initialize the NPM (node package manager) - AKA how to get packages for our project (something like Nugget for .NET, Composer for PHP, or Pip for Python)
// Packages used with NPM are listed here: https://www.npmjs.com/
// Run `npm init -y`
// Then modify the package.json file (add "type": "module", to be able to use ES6 imports)
// Then install Express - `npm install express`
// Also, we can modify the "scripts" section of package.json to add a start command - "dev": "node app_01.js" - so we can start the server with `npm dev`
// Simple, right?

//
// Setting up the Git correctly - .gitignore
//

// Before we proceed, important note - when installing packages, NPM will store them in node_modules folder
// We do NOT include this to the GIT repository!
// What we do is we use something called .gitignore file
// This file simply tells the GIT to ignore some files or folders
// There are usually templates for .gitignore for different languages and frameworks
// You can yoink the one from this repo :]

// Side note - because we do not include the packages in the repository, if you clone the repository somewhere else, you need to install them
// It's simple - for project with NPM set up (existing package.json file), you can just run `npm install`
// That will install the packages - ie. creating the node_modules folder

//
// Before Getting started
//

// Now, as we have the NPM setup, we can continue with the package itself - Express
// When using packages, and having set the "type": "module" in package.json, we can use ES6 imports
// Meaning we can import the packages simply, for our use case: `import express from 'express'`
// IMPORTANT: for every package you use, first thing you should do is READ DOCUMENTATION
// It should usually explain the getting started, basic usages, etc
// We can do so in our case also, go here: www.npmjs.com/package/express
// Usually, on the package page, we can also see the documentation
// Or there are specific links to documentation

// Anyways, regarding the import - some older packages might use what's called CommonJS modules - simply put, it's an predecessor of `import`
// You can recognize it by the usage of `require ('package-name')` instead of `import package from 'package-name'`
// It's great idea to check if the package supports the ES6 imports, in our case Express does, so we can use the `import` syntax

// Before getting started v2

// I know you might be eager to start, but stick just a bit longer with me >]
// Before we proceed to setting up the web server, it would be nice to have tool to test it
// Something to send the HTTP requests to our web server
// There are many tools, like desktop Postman
// Simple one is an extension to VsCode - EchoAPI

//
// Getting started
//

// Finally, getting started FR
// So, to set up out simple web server

// Import the Express package
import express from 'express';

// Just defining the port variable - will use this lower
const PORT = 666;

// This creates new instance of the Express app - we will use this instance to set up our web server, define the routes, etc
const app = express();

// Now, this is where we define what's called endpoint
// Simply put - it's a path on our web server we call with HTTP request
// In this case, it's root path (so the same as the web server)
// And it is type GET - as we use `get` method
// The `get` method takes two parameters - firstly, the path
// Secondly, a function which should process the request
// The function has two parameters
// - request - we use this to get data from the user - like from query parameters, body, etc
// - response - we use this to define what to send back - definng the HTTP response - like status code, body, etc
app.get('/', (request, response) => {
    // In this case, we don't care about user data, so we do not use request
    // We just need to define the response
    // The response uses something called method chaining
    // Simply put, we can call multiple methods one after another
    response
        // `status` defines the HTTP status code - in this case, 200 means OK
        .status(200)
        // `send` defines the body of the response - in this case, we just define simple text
        .send('Hello World from Express!');

    // And that's it - stupidly simple, right?

    // Side not - we NEED to define the response for each endpoint - otherwise, the request will just hang and never get response - which is SADGE
});

// Btw, we can define many endpoints
// Like having more app.get(...), app.post(...), etc
// For now, let's just have this simple example

// Finally, as we have defined our endpoints, we can START the web server - YIPPEE
// We do this with `listen` method
// It takes two parameters
// - port - the port our web server will "live on"
// - callback function - this is a function which will be called once the server starts
app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});

// And BAAM - that's it - dead simple, right?
// Important note - the `listen` method put simply runs an infinite loop
// Meaning any code written below it will not execute
// Why? Well obviously, duh - the web server needs to run constantly - listening to the requests
// How else it would operate, dummy >]
