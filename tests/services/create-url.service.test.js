import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import { nanoid } from "nanoid";
import * as urlRepository from "../../src/repositories/url.repository.js";

import { createUrl } from "../../src/services/url.service.js";


vi.mock("nanoid", () => ({
    nanoid: vi.fn(),
}));


afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});


describe("createUrl", () => {

    it("should create URL successfully", async () => {

        nanoid.mockReturnValue("abc12345");

        const fakeUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "abc12345",
        };

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValue(null);

        vi.spyOn(urlRepository, "create")
            .mockResolvedValue(fakeUrl);

        const result = await createUrl(
            "https://github.com"
        );

        expect(result).toEqual(fakeUrl);

        expect(urlRepository.create)
            .toHaveBeenCalledWith({
                originalUrl: "https://github.com",
                shortCode: "abc12345",
            });
    });


    it("should generate a new shortCode when collision occurs", async () => {

        nanoid
            .mockReturnValueOnce("ABC12345")
            .mockReturnValueOnce("XYZ67890");

        const existingUrl = {
            id: "old",
            originalUrl: "https://example.com",
            shortCode: "ABC12345",
        };

        const createdUrl = {
            id: "123",
            originalUrl: "https://github.com",
            shortCode: "XYZ67890",
        };

        vi.spyOn(urlRepository, "findByShortCode")
            .mockResolvedValueOnce(existingUrl)
            .mockResolvedValueOnce(null);

        vi.spyOn(urlRepository, "create")
            .mockResolvedValue(createdUrl);

        const result = await createUrl(
            "https://github.com"
        );

        expect(result).toEqual(createdUrl);

        expect(urlRepository.findByShortCode)
            .toHaveBeenCalledTimes(2);

        expect(urlRepository.create)
            .toHaveBeenCalledWith({
                originalUrl: "https://github.com",
                shortCode: "XYZ67890",
            });
    });

});