import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import * as urlRepository from "../../src/repositories/url.repository.js";

import { updateUrl } from "../../src/services/url.service.js";

import { NotFoundError } from "../../src/errors/not-found.error.js";


afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});


describe("updateUrl", () => {

    it("should update URL successfully", async () => {

        const existingUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "abc123",
        };

        const updatedUrl = {
            id: "123",
            originalUrl: "https://google.com",
            shortCode: "abc123",
        };

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(existingUrl);

        vi.spyOn(urlRepository, "updateByShortCode")
            .mockResolvedValue(updatedUrl);

        const result = await updateUrl(
            "abc123",
            "https://google.com"
        );

        expect(result).toEqual(updatedUrl);

        expect(urlRepository.updateByShortCode)
            .toHaveBeenCalledWith(
                "abc123",
                {
                    originalUrl: "https://google.com"
                }
            );
    });


    it("should throw NotFoundError when shortCode does not exist", async () => {

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(null);

        await expect(
            updateUrl(
                "not-found",
                "https://github.com"
            )
        ).rejects.toThrow(NotFoundError);
    });

});