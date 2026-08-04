const express = require('express');

const app = express();

// Middleware untuk membaca request body dalam format JSON
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

module.exports = app;