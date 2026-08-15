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


describe("url.repository - deleteByShortCode", () => {

    it("should delete URL successfully", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "DELETE01",
        });

        const result = await urlRepository.deleteByShortCode(
            "DELETE01"
        );

        expect(result).toMatchObject({
            originalUrl: "https://github.com",
            shortCode: "DELETE01",
        });

        const deletedUrl =
            await urlRepository.findByShortCode("DELETE01");

        expect(deletedUrl).toBeNull();
    });


    it("should throw error when shortCode does not exist", async () => {

        await expect(
            urlRepository.deleteByShortCode("NOTFOUND")
        ).rejects.toThrow();

    });

});