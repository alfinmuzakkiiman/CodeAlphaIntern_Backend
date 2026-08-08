import prisma from "../config/prisma.js";

export const create = async (data) => {
    return await prisma.url.create({
        data
    });
};