
//
//
// CORS
//
//

//
// Why cannot I call my API from my frontend - the hell is CORS?
//

// So far, we have gone through the basics - setting up the express, endpoints etc
// Up this point, we might be ready to have a simple API and some client
// You might have already tried calling your API from a frontend
// But there was a gatcha - an error called CORS
// The hell is that?

// CORS stands for Cross-Origin Resource Sharing
// Simply put, it is a default security restriction to prevent requests from different origins (domains)
// Take our example:
// - We have spun our API at http://localhost:666
// - Now, if we tried to have a frontend running locally (ie with live server on http://localhost:5500) and tried to call our API, we would get a CORS error
// - Why? Because the origin is different - http://localhost:666 VS http://localhost:5500

// So, what's the fix?
// As CORS restriction is BE based, we need to change our Express server
// Ideally, we want to enable a specific origin (ie our frontend) and methods to access our API
// Rule of thumb - only allow what's needed

//
// Enabling the CORS
//

// First things first, we need to install a CORS package
// `npm install cors`
// If you take a look at the documentation - https://www.npmjs.com/package/cors
// You can see it is actually a middleware for Express
// Great - we already know what's middleware and how to use it

//
// Putting it up all together
//

// Enough with the chit-chat - let's do it now
// We shall do the classic - define the app, endpoints, etc
// The difference is this time, we will also use the CORS middleware

import express from 'express';
import cors from 'cors'; // THIS is the CORS package

const PORT = 666;
const app = express();

// Let's define some global middleware here
app.use(express.json()); // Classic, we already know this
//app.use(cors()); // THIS is the usage the CORS package - like this, it will enable all origins
// BUT - because we want to be specific, we will only allow the frontend
app.use(cors({
   origin: 'http://127.0.0.1:5500', // Technically the same as http://localhost:5500 - will explain later why we use this one
   methods: ['GET']
}));
// Fun fact - under the hood, it actually sets the header
// When allowing all - 'Access-Control-Allow-Origin': '*'
// When allowing specific origin - 'Access-Control-Allow-Origin': 'http://localhost:5500'
// Without this header, the browser will block the request from different origins - hence the CORS error
// You can actually see this in the Headers tab

// Great, with this defined, now let's just define some simple endpoint
app.get('/beep', (request, response) => {
    response
        .status(200)
        .send('Boop');
});

// And start the server
app.listen(PORT, () => {
    console.log(`Server is available at 'http://localhost:${PORT}'`);
});

// Now, with this setup, the frontend running at http://localhost:5500 should be able to call our API at http://localhost:666 without any CORS error
// Yipee!

// Regarding the localhost VS 127.0.0.1 difference
// - They are both technically the same - they both refer to the local machine
// - But in case of CORS in browser, they are treated as different origins
// - That's why we need to specify the 127.0.0.1 version
// - You can actually check the Headers -> Origin of the request - it should be http://127.0.0.1:5500
// - And because CORS checking basically does string comparison, it sees http://127.0.0.1:5500 different from http://localhost:5500


