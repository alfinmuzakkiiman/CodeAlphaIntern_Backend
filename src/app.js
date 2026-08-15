import express from "express";
import helmet from "helmet";
import cors from "cors";

import urlRoutes from "./routes/url.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rate-limit.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/v1", apiLimiter);
app.use("/api/v1", urlRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

app.use(errorHandler);

export default app;