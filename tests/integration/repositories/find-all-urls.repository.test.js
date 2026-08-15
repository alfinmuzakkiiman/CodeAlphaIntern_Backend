import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import prisma from "../../../src/config/prisma.js";
import * as urlRepository from "../../../src/repositories/url.repository.js";

import { DatabaseError } from "../../../src/errors/database.error.js";


afterEach(() => {
    vi.restoreAllMocks();
});


describe("url.repository - findAll", () => {

    it("should return all URLs", async () => {

        await prisma.url.createMany({
            data: [
                {
                    originalUrl: "https://github.com",
                    shortCode: "FINDALL01"
                },
                {
                    originalUrl: "https://google.com",
                    shortCode: "FINDALL02"
                }
            ]
        });

        const result = await urlRepository.findAll();

        expect(result).toHaveLength(2);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    originalUrl: "https://github.com",
                    shortCode: "FINDALL01"
                }),
                expect.objectContaining({
                    originalUrl: "https://google.com",
                    shortCode: "FINDALL02"
                })
            ])
        );
    });


    it("should throw DatabaseError when database operation fails", async () => {

        vi.spyOn(prisma.url, "findMany")
            .mockRejectedValue(
                new Error("Database connection failed")
            );

        await expect(
            urlRepository.findAll()
        ).rejects.toThrow(DatabaseError);
    });

});