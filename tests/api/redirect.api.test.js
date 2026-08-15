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


describe("GET /api/v1/:shortCode", () => {

    it("should redirect to original URL and track click", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "REDIRECT_TEST"
            }
        });


        const before = await prisma.url.findUnique({
            where: {
                shortCode: "REDIRECT_TEST"
            }
        });


        const response = await request(app)
            .get("/api/v1/REDIRECT_TEST")
            .redirects(0);


        expect(response.status).toBe(302);

        expect(response.headers.location)
            .toBe("https://github.com");


        const after = await prisma.url.findUnique({
            where: {
                shortCode: "REDIRECT_TEST"
            }
        });


        expect(after.clickCount)
            .toBe(before.clickCount + 1);

        expect(after.lastAccessedAt)
            .not.toBeNull();
    });


    it("should return 404 when shortCode does not exist", async () => {

        const response = await request(app)
            .get("/api/v1/REDIRECT_NOT_FOUND")
            .redirects(0);


        expect(response.status).toBe(404);
    });

});