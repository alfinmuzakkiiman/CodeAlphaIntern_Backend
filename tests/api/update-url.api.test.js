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


describe("PATCH /api/v1/urls/:shortCode", () => {

    it("should update URL successfully", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "UPDATE_SUCCESS"
            }
        });

        const response = await request(app)
            .patch("/api/v1/urls/UPDATE_SUCCESS")
            .send({
                url: "https://google.com"
            });

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toMatchObject({
            originalUrl: "https://google.com",
            shortCode: "UPDATE_SUCCESS"
        });


        const updatedUrl = await prisma.url.findUnique({
            where: {
                shortCode: "UPDATE_SUCCESS"
            }
        });

        expect(updatedUrl.originalUrl)
            .toBe("https://google.com");
    });


    it("should return 404 when shortCode does not exist", async () => {

        const response = await request(app)
            .patch("/api/v1/urls/UPDATE_NOT_FOUND")
            .send({
                url: "https://google.com"
            });

        expect(response.status).toBe(404);

        expect(response.body.success).toBe(false);
    });


    it("should return 400 when URL is invalid", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "UPDATE_INVALID"
            }
        });

        const response = await request(app)
            .patch("/api/v1/urls/UPDATE_INVALID")
            .send({
                url: "not-a-valid-url"
            });

        expect(response.status).toBe(400);

        expect(response.body.success).toBe(false);
    });

});