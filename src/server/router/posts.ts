import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const postRouter = createRouter()
  .middleware(async( {ctx,next}) =>{
    if (!ctx.session) {
      throw new TRPCError({code:"UNAUTHORIZED"});
    }
    return next()
  })
  .mutation('create-post', {
    input: z.object({
      title: z.string().nullish(),
      description: z.string().nullish().optional(),
      something:z.string().optional()
    }),
    async resolve({ input, ctx }) {
      try{
      const createdPost = await ctx.prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          author:{
            create:{
              
            }
          
        }
      });

      return createdPost
    }
    catch(error) {
      console.log(error)
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

