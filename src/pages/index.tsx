import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { prisma, PrismaClient } from '@prisma/client';
import { HomePage } from '../components/HomePage/Homepage';

const Home = () => {
  const name = trpc.useQuery(['example.name', { text: 'fikri' }]);
  const {data:session} = useSession()
  console.log(session)
  return (
    <>
      <span> Signed In As {session?.user.email}</span>
      <button onClick={() => signOut()}> Logout </button> 
      <HomePage />
    </>
  );
};

export default Home;
