import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import prisma from "../../../src/config/prisma.js";
import * as urlRepository from "../../../src/repositories/url.repository.js";
import { ConflictError } from "../../../src/errors/conflict.error.js";
import { DatabaseError } from "../../../src/errors/database.error.js";

describe("url.repository - create", () => {

    afterEach(async () => {
        await prisma.url.deleteMany();
    });


    it("should create URL in database", async () => {

        const data = {
            originalUrl: "https://github.com",
            shortCode: "TEST1234",
        };

        const result = await urlRepository.create(data);

        expect(result).toMatchObject({
            originalUrl: "https://github.com",
            shortCode: "TEST1234",
            clickCount: 0,
            lastAccessedAt: null,
        });

        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it("should throw ConflictError when shortCode already exists", async () => {

    const data = {
        originalUrl: "https://github.com",
        shortCode: "DUPLICATE",
    };

    await urlRepository.create(data);

    await expect(
        urlRepository.create({
            originalUrl: "https://google.com",
            shortCode: "DUPLICATE",
        })
    ).rejects.toThrow(ConflictError);

});

it("should throw DatabaseError when database operation fails", async () => {
    const databaseError = new Error("Database connection failed");

    vi.spyOn(prisma.url, "create")
        .mockRejectedValue(databaseError);

    await expect(
        urlRepository.create({
            originalUrl: "https://github.com",
            shortCode: "DB_ERROR"
        })
    ).rejects.toThrow(DatabaseError);
});

});