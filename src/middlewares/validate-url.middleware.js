import { ValidationError } from "../errors/validation.error.js";

export const validateUrl = (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        return next(
            new ValidationError("URL is required")
        );
    }

    if (typeof url !== "string") {
        return next(
            new ValidationError("URL must be a string")
        );
    }

    let parsedUrl;

    try {
        parsedUrl = new URL(url);
    } catch {
        return next(
            new ValidationError("Invalid URL")
        );
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return next(
            new ValidationError(
                "Only HTTP and HTTPS URLs are allowed"
            )
        );
    }

    next();
};