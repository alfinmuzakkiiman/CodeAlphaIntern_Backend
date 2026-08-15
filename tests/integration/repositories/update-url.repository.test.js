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


describe("url.repository - updateByShortCode", () => {

    it("should update URL successfully", async () => {

        await urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "UPDATE01",
        });

        const result = await urlRepository.updateByShortCode(
            "UPDATE01",
            {
                originalUrl: "https://google.com",
            }
        );

        expect(result).toMatchObject({
            originalUrl: "https://google.com",
            shortCode: "UPDATE01",
        });
    });


    it("should throw error when shortCode does not exist", async () => {

        await expect(
            urlRepository.updateByShortCode(
                "NOTFOUND",
                {
                    originalUrl: "https://google.com",
                }
            )
        ).rejects.toThrow();
    });

});