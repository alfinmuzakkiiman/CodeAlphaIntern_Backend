import * as urlRepository from "../repositories/url.repository.js";

export const createUrl = async (url) => {
    const shortCode = "abc123";

    const result = await urlRepository.create({
        originalUrl: url,
        shortCode
    });

    return result;
};