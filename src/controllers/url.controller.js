import * as urlService from "../services/url.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";


export const getAllUrls = asyncHandler(async (req, res) => {
    const result = await urlService.getAllUrls();

    return res.status(200).json({
        success: true,
        data: result
    });
});

export const redirectUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    const result = await urlService.getUrlByShortCode(shortCode);

    await urlService.trackClick(shortCode);

    return res.redirect(result.originalUrl);
});

export const createUrl = asyncHandler(async (req, res) => {
    const result = await urlService.createUrl(req.body.url);

    return res.status(201).json({
        success: true,
        message: "URL created successfully",
        data: result
    });
});

export const getUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    const result = await urlService.getUrlByShortCode(shortCode);

    return res.status(200).json({
        success: true,
        data: result
    });
});

export const updateUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;

    const result = await urlService.updateUrl(shortCode, url);

    return res.status(200).json({
        success: true,
        message: "URL updated successfully",
        data: result
    });
});

export const deleteUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;

    const result = await urlService.deleteUrl(shortCode);

    return res.status(200).json({
        success: true,
        message: "URL deleted successfully",
        data: result
    });
});

export const getUrlStats = asyncHandler(async(req, res) => {
    const { shortCode } = req.params;

    const result = await urlService.getUrlStats(shortCode);

    return res.status(200).json({
        success: true,
        data: result
    });
});