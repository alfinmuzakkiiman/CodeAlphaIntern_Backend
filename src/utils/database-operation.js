import { DatabaseError } from "../errors/database.error.js";

export const databaseOperation = async (
    operation,
    handleError = null
) => {
    try {
        return await operation();
    } catch (error) {
        if (handleError) {
            const handledError = handleError(error);

            if (handledError) {
                throw handledError;
            }
        }

        throw new DatabaseError(
            "Database operation failed",
            {
                cause: error
            }
        );
    }
};