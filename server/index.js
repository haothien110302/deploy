const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/dbConfig');
const cors = require('cors');
const route = require('./routes');

dotenv.config();
connectDB();

const app = express();

// First, enable CORS using the defined options
app.use(cors());

// Middleware to parse JSON
app.use(express.json());


// Define routes
route(app);

// Set up the server port
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
