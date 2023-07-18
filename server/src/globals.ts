import { PrismaClient } from "@prisma/client";
import { PolygonApi } from "./polygonApi/polygonApi.js";

export const prisma = new PrismaClient();
export const polygon = new PolygonApi();
