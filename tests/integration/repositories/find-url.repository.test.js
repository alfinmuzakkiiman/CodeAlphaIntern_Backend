import {
    describe,
    it,
    expect,
    afterEach
} from "vitest";

import prisma from "../../../src/config/prisma.js";
import * as urlRepository from "../../../src/repositories/url.repository.js";


afterEach(async () => {
    await prisma.url.deleteMany();
});


describe("url.repository - findByShortCode", () => {

    it("should return URL when shortCode exists", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "FIND1234",
        });

        const result = await urlRepository.findByShortCode(
            "FIND1234"
        );

        expect(result).toMatchObject({
            originalUrl: "https://github.com",
            shortCode: "FIND1234",
            clickCount: 0,
            lastAccessedAt: null,
        });
    });


    it("should return null when shortCode does not exist", async () => {

        const result = await urlRepository.findByShortCode(
            "NOTFOUND"
        );

        expect(result).toBeNull();
    });

});