import { nanoid } from "nanoid";
import * as urlRepository from "../repositories/url.repository.js";
import { NotFoundError } from "../errors/not-found.error.js";

export const getAllUrls = async () => {
    const result = await urlRepository.findAll();

    return result;
};

export const createUrl = async (url) => {
    let shortCode;
    let existingUrl;

    do {
        shortCode = nanoid(8);

        existingUrl = await urlRepository.findByShortCode(shortCode);
    } while (existingUrl);

    const result = await urlRepository.create({
        originalUrl: url,
        shortCode
    });

    return result;
};

export const getUrlByShortCode = async (shortCode) => {
    const result = await urlRepository.findByShortCode(shortCode);

    if (!result) {
        throw new NotFoundError("URL not found");
    }

    return result;
};

export const updateUrl = async (shortCode, url) => {
    const existingUrl = await urlRepository.findByShortCode(shortCode);

    if (!existingUrl) {
        throw new NotFoundError("URL not found");
    }

    const result = await urlRepository.updateByShortCode(
        shortCode,
        {
            originalUrl: url
        }
    );

    return result;
};

export const deleteUrl = async (shortCode) => {
    const existingUrl = await urlRepository.findByShortCode(shortCode);

    if (!existingUrl) {
        throw new NotFoundError("URL not found");
    }

    const result = await urlRepository.deleteByShortCode(shortCode);

    return result;
};

export const trackClick = async (shortCode) => {
    return await urlRepository.incrementClick(shortCode);
};

export const getUrlStats = async (shortCode) => {
    const result = await urlRepository.getStatsByShortCode(shortCode);

    if (!result) {
        throw new NotFoundError("URL not found");
    }

    return result;
}