
//
//
// The Glory of brining JavaScript to backend - Express!
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
// Also, we can modify the "scripts" section of package.json to add a start command - "dev": "node index.js" - so we can start the server with `npm dev`
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

//
// Getting started
//

// TODO

import express from 'express';

const PORT = 3000;

const app = express();

// TODO: define endpoints

app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});


