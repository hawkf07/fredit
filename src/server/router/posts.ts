import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createProtectedRouter } from './protected-router'


export const postRouter = createProtectedRouter()
  .mutation('create-post-by-user', {
    input: z.object({
      title: z.string().nullish(),
      description: z.string().nullish().optional(),
      id: z.string(),

    }),
    async resolve({ input, ctx }) {
      try {
        const createdPost = await ctx.prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            Post: {
              create: {
                title: input.title,
                description: input.description
              }
            }
          }
        })
        return createdPost
      }
      catch (error) {
        console.log(error)
        return new TRPCError({code:"UNAUTHORIZED"})
      }
    }
  })
  .mutation('update-post', {
    input: z.object({
      description: z.string().nullish().optional(),
      title: z.string(),
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      try {
        const updatedPost = await ctx.prisma.post.update({
          data: {
            title: input.title,
            description: input.description
          },
          where: {
            id: input.id
          }
        });

        return updatedPost;
      } catch (error) {
        console.log(error, 'is error');

        return error;
      }
    }
  })
