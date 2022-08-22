import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { prisma, PrismaClient } from '@prisma/client'


const Home = () => {
  const name = trpc.useQuery(["example.name",{text:"fikri"}])
  return (
    <>
      <header>
        <h1 className="text-3xl"> {name.data?.greeting} </h1>
      </header>
    </>
  )
}

export default Home;
