import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import * as urlRepository from "../../src/repositories/url.repository.js";

import { deleteUrl } from "../../src/services/url.service.js";

import { NotFoundError } from "../../src/errors/not-found.error.js";


afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});


describe("deleteUrl", () => {

    it("should delete URL successfully", async () => {

        const existingUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "abc123",
        };

        const deletedUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "abc123",
        };

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(existingUrl);

        vi.spyOn(urlRepository, "deleteByShortCode")
            .mockResolvedValue(deletedUrl);

        const result = await deleteUrl(
            "abc123"
        );

        expect(result).toEqual(deletedUrl);

        expect(urlRepository.deleteByShortCode)
            .toHaveBeenCalledWith("abc123");
    });


    it("should throw NotFoundError when shortCode does not exist", async () => {

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(null);

        await expect(
            deleteUrl("not-found")
        ).rejects.toThrow(NotFoundError);
    });

});