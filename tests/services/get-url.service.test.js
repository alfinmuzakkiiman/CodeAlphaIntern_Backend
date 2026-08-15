import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import * as urlRepository from "../../src/repositories/url.repository.js";

import { getUrlByShortCode } from "../../src/services/url.service.js";

import { NotFoundError } from "../../src/errors/not-found.error.js";


afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});


describe("getUrlByShortCode", () => {

    it("should return URL when shortCode exists", async () => {

        const fakeUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "abc123",
        };

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(fakeUrl);

        const result = await getUrlByShortCode(
            "abc123"
        );

        expect(result).toEqual(fakeUrl);
    });


    it("should throw NotFoundError when shortCode does not exist", async () => {

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(null);

        await expect(
            getUrlByShortCode("not-found")
        ).rejects.toThrow(NotFoundError);
    });

});