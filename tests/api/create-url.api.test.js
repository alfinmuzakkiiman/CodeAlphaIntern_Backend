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


describe("POST /api/v1/urls", () => {

    it("should create a shortened URL successfully", async () => {

        const response = await request(app)
            .post("/api/v1/urls")
            .send({
                url: "https://github.com"
            });

        expect(response.status).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toMatchObject({
            originalUrl: "https://github.com"
        });

        expect(response.body.data.shortCode)
            .toBeDefined();
    });


    it("should return 400 when URL is invalid", async () => {

        const response = await request(app)
            .post("/api/v1/urls")
            .send({
                url: "not-a-valid-url"
            });

        expect(response.status).toBe(400);

        expect(response.body.success).toBe(false);
    });

});