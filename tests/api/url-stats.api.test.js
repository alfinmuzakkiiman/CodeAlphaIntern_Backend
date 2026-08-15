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


describe("GET /api/v1/urls/:shortCode/stats", () => {

    it("should return URL statistics successfully", async () => {

        await prisma.url.create({
            data: {
                originalUrl: "https://github.com",
                shortCode: "STATS_TEST",
                clickCount: 10,
                lastAccessedAt: new Date("2026-08-13T05:49:13.606Z")
            }
        });


        const response = await request(app)
            .get("/api/v1/urls/STATS_TEST");


        expect(response.status).toBe(200);


        expect(response.body.success)
            .toBe(true);


        expect(response.body.data)
            .toMatchObject({
                shortCode: "STATS_TEST",
                originalUrl: "https://github.com",
                clickCount: 10
            });


        expect(response.body.data.lastAccessedAt)
            .not.toBeNull();
    });


    it("should return 404 when shortCode does not exist", async () => {

        const response = await request(app)
            .get("/api/v1/urls/STATS_NOT_FOUND");


        expect(response.status).toBe(404);
    });

});