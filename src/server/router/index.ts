// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { postRouter } from './posts';
import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('question.', protectedExampleRouter)
  .merge('posts.', postRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
