import Link from 'next/link';
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { ReactNode, FC } from 'react';
import { Button } from '../Button'
interface NavListType {
  additionalClasses?: string;
  text?: string;
  children: ReactNode;
}

const NavList = ({ additionalClasses, text, children }: NavListType) => {
  return (
    <li className={`cursor-pointer p-3 ${additionalClasses}`}>
      {' '}
      {children ? children : text}{' '}
    </li>
  );
};
const Navbar = () => {
  const { data: session } = useSession()
  return (
    <nav className="flex justify-between px-3 py-2 gap-3 items-center w-full shadow-lg ">
      <header>
        <h1 className="font-['Inter'] text-3xl first-letter:text-blue-500">
          {' '}
          Freddit{' '}
        </h1>
      </header>
      <ul className="flex justify-around items-center">
        <NavList>
          {!session && <Button> <Link href="/api/auth/signin" >Sign In/Log In </Link> </Button>}
        </NavList>
        <NavList >
          <Image width={24} height={24} className="rounded-full bg-gray-300 w-8 h-8 shadow" src={session?.user?.image} />
        </NavList>
      </ul>
    </nav>
  );
};

export { Navbar, NavList };
