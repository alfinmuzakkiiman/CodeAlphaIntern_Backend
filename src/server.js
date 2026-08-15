import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        console.log("Database connected.");

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        const shutdown = async (signal) => {
            console.log(
                `${signal} received. Starting graceful shutdown...`
            );

            server.close(async () => {
                console.log("HTTP server closed.");

                try {
                    await prisma.$disconnect();

                    console.log("Prisma disconnected.");

                    process.exit(0);
                } catch (error) {
                    console.error(
                        "Error during Prisma disconnect:",
                        error
                    );

                    process.exit(1);
                }
            });
        };

        process.on("SIGINT", () => {
            shutdown("SIGINT");
        });

        process.on("SIGTERM", () => {
            shutdown("SIGTERM");
        });

    } catch (error) {
        console.error("Database connection failed.");
        console.error(error.message);

        await prisma.$disconnect();

        process.exit(1);
    }
};

startServer();