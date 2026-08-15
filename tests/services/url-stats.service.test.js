import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import * as urlRepository from "../../src/repositories/url.repository.js";

import { getUrlStats } from "../../src/services/url.service.js";

import { NotFoundError } from "../../src/errors/not-found.error.js";


afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});


describe("getUrlStats", () => {

    it("should return URL statistics successfully", async () => {

        const fakeStats = {
            shortCode: "abc123",
            originalUrl: "https://github.com",
            clickCount: 10,
            lastAccessedAt: new Date(
                "2026-08-13T05:49:13.606Z"
            ),
        };

        vi.spyOn(urlRepository, "getStatsByShortCode")
            .mockResolvedValue(fakeStats);

        const result = await getUrlStats(
            "abc123"
        );

        expect(result).toEqual(fakeStats);

        expect(urlRepository.getStatsByShortCode)
            .toHaveBeenCalledWith("abc123");
    });


    it("should throw NotFoundError when shortCode does not exist", async () => {

        vi.spyOn(urlRepository, "getStatsByShortCode")
            .mockResolvedValue(null);

        await expect(
            getUrlStats("not-found")
        ).rejects.toThrow(NotFoundError);
    });

});