const urlService = require("../services/url.service");

const createUrl = async (req, res) => {
    const result = await urlService.createUrl(req.body.url);

    return res.status(201).json({
        success: true,
        message: "URL created successfully",
        data: result
    });
}

module.exports = {
    createUrl
};