import express from "express";
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1", urlRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

export default app;