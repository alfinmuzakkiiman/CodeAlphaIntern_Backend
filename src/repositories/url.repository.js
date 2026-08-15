import prisma from "../config/prisma.js";
import { ConflictError } from "../errors/conflict.error.js";
import { databaseOperation } from "../utils/database-operation.js";

export const findAll = async () => {
    return databaseOperation(() =>
        prisma.url.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    );
};

export const create = async (data) => {
    return databaseOperation(
        () =>
            prisma.url.create({
                data
            }),
        (error) => {
            if (error.code === "P2002") {
                return new ConflictError(
                    "Short Code already exists"
                );
            }

            return null;
        }
    );
};

export const findByShortCode = async (shortCode) => {
    return databaseOperation(() =>
        prisma.url.findUnique({
            where: {
                shortCode
            }
        })
    );
};

export const updateByShortCode = async (shortCode, data) => {
    return databaseOperation(() =>
        prisma.url.update({
            where: {
                shortCode
            },
            data
        })
    );
};

export const deleteByShortCode = async (shortCode) => {
    return databaseOperation(() =>
        prisma.url.delete({
            where: {
                shortCode
            }
        })
    );
};

export const incrementClick = async (shortCode) => {
    return databaseOperation(() =>
        prisma.url.update({
            where: {
                shortCode
            },
            data: {
                clickCount: {
                    increment: 1
                },
                lastAccessedAt: new Date()
            }
        })
    );
};

export const getStatsByShortCode = async (shortCode) => {
    return databaseOperation(() =>
        prisma.url.findUnique({
            where: {
                shortCode
            },
            select: {
                shortCode: true,
                originalUrl: true,
                clickCount: true,
                lastAccessedAt: true
            }
        })
    );
};