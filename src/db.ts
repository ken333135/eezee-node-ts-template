import { PrismaClient, } from "@prisma/client";

const prisma = new PrismaClient();

export const setupDbConnection = async (): Promise<void> => {
    await prisma.$connect();
};

export const setupSystemDefaults = async (): Promise<void> => {
    console.log("Setting up system defaults");
};

export default prisma;