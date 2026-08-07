const createUrl = async (url) => {
    console.log("Creating URL:", url);

    return {
        originalUrl: url,
        shortcode: "abc123",
    };
};

module.exports = {
    createUrl
}