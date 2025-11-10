const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bugRouter = require('./routes/BugRouter');


// middlewares
app.use(cors());
app.use(express.json());


// routes
app.use('/api/bugs', bugRouter);


// error handling
app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).json({
        success: false,
        message: "Internal server error"
    })
})

// connect to mongodb
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to mongodb successfully"))
.catch(err => console.error("Error connecting to mongodb: ", err.message))

// listening port
app.listen(process.env.PORT || 5000, () => { console.log("Port running on port 5000") })