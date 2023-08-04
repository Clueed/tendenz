import { PrismaClient } from "@prisma/client";
import { PolygonApi } from "./polygonApi/polygonApi.js";

export const polygon = new PolygonApi();
