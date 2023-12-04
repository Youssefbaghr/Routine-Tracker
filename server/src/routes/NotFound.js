export const notFound = (req, res, next) => {
    res.status(404).json({
        StatusCode: 404,
        message: `Sorry, this page does not exist`,
    });
};
