import { PrismaClient } from '../generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;