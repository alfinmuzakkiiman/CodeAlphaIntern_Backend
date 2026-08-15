import {
    describe,
    it,
    expect,
    beforeEach,
    afterAll
} from "vitest";

import request from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/prisma.js";


beforeEach(async () => {
    await prisma.url.deleteMany();
});


afterAll(async () => {
    await prisma.$disconnect();
});


describe("DELETE /api/v1/urls/:shortCode", () => {

    it("should delete URL successfully", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "DELETE_SUCCESS"
            }
        });

        const response = await request(app)
            .delete("/api/v1/urls/DELETE_SUCCESS");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);


        const deletedUrl = await prisma.url.findUnique({
            where: {
                shortCode: "DELETE_SUCCESS"
            }
        });

        expect(deletedUrl).toBeNull();
    });


    it("should return 404 when shortCode does not exist", async () => {

        const response = await request(app)
            .delete("/api/v1/urls/DELETE_NOT_FOUND");

        expect(response.status).toBe(404);

        expect(response.body.success).toBe(false);
    });

});