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


describe("GET /api/v1/urls", () => {

    it("should return all URLs successfully", async () => {

        await prisma.url.createMany({
            data: [
                {
                    originalUrl: "https://github.com",
                    shortCode: "ALL_TEST_1"
                },
                {
                    originalUrl: "https://google.com",
                    shortCode: "ALL_TEST_2"
                }
            ]
        });


        const response = await request(app)
            .get("/api/v1/urls");


        expect(response.status).toBe(200);


        expect(response.body.success)
            .toBe(true);


        expect(response.body.data)
            .toHaveLength(2);


        expect(response.body.data)
            .toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        originalUrl: "https://github.com",
                        shortCode: "ALL_TEST_1"
                    }),
                    expect.objectContaining({
                        originalUrl: "https://google.com",
                        shortCode: "ALL_TEST_2"
                    })
                ])
            );
    });


    it("should return empty array when no URLs exist", async () => {

        const response = await request(app)
            .get("/api/v1/urls");


        expect(response.status).toBe(200);


        expect(response.body.success)
            .toBe(true);


        expect(response.body.data)
            .toEqual([]);
    });

});