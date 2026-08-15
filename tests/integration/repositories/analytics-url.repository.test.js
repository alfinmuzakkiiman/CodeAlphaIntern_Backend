import {
    describe,
    it,
    expect,
    beforeEach
} from "vitest";

import prisma from "../../../src/config/prisma.js";
import * as urlRepository from "../../../src/repositories/url.repository.js";


beforeEach(async () => {
    await prisma.url.deleteMany();
});


describe("url.repository - incrementClick", () => {

    it("should increment clickCount and update lastAccessedAt", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "CLICK123",
        });

        const before = await urlRepository.findByShortCode(
            "CLICK123"
        );

        expect(before.clickCount).toBe(0);
        expect(before.lastAccessedAt).toBeNull();


        const result = await urlRepository.incrementClick(
            "CLICK123"
        );

        expect(result.clickCount).toBe(1);
        expect(result.lastAccessedAt).toBeInstanceOf(Date);
    });


    it("should increment clickCount multiple times", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "CLICK456",
        });

        await urlRepository.incrementClick("CLICK456");
        await urlRepository.incrementClick("CLICK456");
        const result =
            await urlRepository.incrementClick("CLICK456");

        expect(result.clickCount).toBe(3);
        expect(result.lastAccessedAt).toBeInstanceOf(Date);
    });

});


describe("url.repository - getStatsByShortCode", () => {

    it("should return URL statistics successfully", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "STATS123",
        });

        await urlRepository.incrementClick("STATS123");
        await urlRepository.incrementClick("STATS123");

        const result =
            await urlRepository.getStatsByShortCode(
                "STATS123"
            );

        expect(result).toMatchObject({
            shortCode: "STATS123",
            originalUrl: "https://github.com",
            clickCount: 2,
        });

        expect(result.lastAccessedAt).toBeInstanceOf(Date);
    });


    it("should return null when shortCode does not exist", async () => {

        const result =
            await urlRepository.getStatsByShortCode(
                "NOTFOUND"
            );

        expect(result).toBeNull();
    });

});