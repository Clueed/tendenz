import { PrismaClient } from '@prisma/client'
import { PolygonRequestHandler } from './lib/polygonApi/polygonRequestHandler.js'

export const prisma = new PrismaClient()
export const polygon = new PolygonRequestHandler()
