import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { prisma } from '../utils';
import { HomePage } from '../components/HomePage/Homepage';
import { useMutation } from 'react-query';

const Home = () => {
  return (
    <>
      <Head>
        <title>Freddit | A Reddit Clone</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
