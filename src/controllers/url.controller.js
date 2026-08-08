import * as urlService from "../services/url.service.js";

export const createUrl = async (req, res) => {
    const result = await urlService.createUrl(req.body.url);

    return res.status(201).json({
        success: true,
        message: "URL created successfully",
        data: result
    });
};