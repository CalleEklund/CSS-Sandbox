import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const demoRouter = createTRPCRouter({
    getConfig: publicProcedure.query(async ({ ctx }) => {
        //console.log('db', ctx.prisma.test.findMany())
        return await ctx.prisma.demoConfig.findFirst();
    }),

    setConfig: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
        const currConfig = await ctx.prisma.demoConfig.findFirst()
        if (currConfig == null) {
            return await ctx.prisma.demoConfig.create({
                data: {
                    config: input
                }
            })
        } else {
            return await ctx.prisma.demoConfig.update({
                where: {
                    id: currConfig.id
                },
                data: {
                    config: input
                }
            })
        }
    })
});