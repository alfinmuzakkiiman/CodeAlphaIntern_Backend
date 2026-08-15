import { AppError } from "./app.error.js";

export class DatabaseError extends AppError {
    constructor(message = "Database error", options = {}) {
        super(message, 500, options);
    }
}