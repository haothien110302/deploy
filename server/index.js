const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/dbConfig');
const cors = require('cors');
const route = require('./routes');

dotenv.config();
connectDB();

const app = express();

// CORS options configuration
const corsOptions = {
    origin: '*',  // Allow the frontend app (React) to make requests
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'x-auth-token'],  // Allow custom headers (including your API key)
    preflightContinue: false,  // End preflight requests after response
    optionsSuccessStatus: 200,  // Some legacy browsers (IE11, older Chrome) choke on 204
};

// Enable CORS with the configured options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Preflight (OPTIONS) requests handling
app.options('*', cors(corsOptions));

// Define routes
route(app);

// Set up the server port
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
