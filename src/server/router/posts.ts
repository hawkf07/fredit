import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const postRouter = createRouter()
  .mutation('create-post', {
    input: z.object({
      title: z.string().nullish(),
      description: z.string().nullish().optional()
    }),
    async resolve({ input, ctx }) {
      const createdPost = await ctx.prisma.post.create({
        data: {
          title: input.title,
          description: input.description
        }
      });
      return createdPost;
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
  .query('get-posts', {
    async resolve({ input, ctx }) {
      try {
        const posts = await ctx.prisma.post.findMany();
        return posts;
      } catch (error) {
        console.log('there are no posts ', error);
      }
    }
  });
