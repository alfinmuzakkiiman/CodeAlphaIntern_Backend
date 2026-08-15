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


describe("GET /api/v1/urls/:shortCode", () => {

    it("should return URL when shortCode exists", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "GET_SUCCESS"
            }
        });

        const response = await request(app)
            .get("/api/v1/urls/GET_SUCCESS");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toMatchObject({
            originalUrl: "https://github.com",
            shortCode: "GET_SUCCESS"
        });
    });


    it("should return 404 when shortCode does not exist", async () => {

        const response = await request(app)
            .get("/api/v1/urls/GET_NOT_FOUND");

        expect(response.status).toBe(404);

        expect(response.body.success).toBe(false);
    });

});