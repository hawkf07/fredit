

import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const getPostRouter = createRouter().query('get-posts',{
  
  async resolve({input,ctx}) {
    const getPosts = await ctx.prisma.post.findMany({
      orderBy:[
        {
          dateCreated:'desc'
        }
      ]
    })
    return getPosts
  }
}
)
 
