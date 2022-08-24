import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { ReactNode, FC } from 'react';
import { Button } from '../Button';
import { PostForm } from '../PostForm/';
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
  const { data: session } = useSession();
  console.log(session);
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
          {!session && (
            <Button>
              {' '}
              <Link href="/api/auth/signin">Sign In/Log In </Link>{' '}
            </Button>
          )}
        </NavList>
        <NavList>{session && session?.user?.name}</NavList>
        <NavList>
          <Image
            src={`${
              session?.user?.image
                ? session?.user?.image
                : '/avatar-svgrepo-com.svg'
            } `}
            className="rounded-full"
            width={32}
            height={32}
          />
        </NavList>
        {session && (
          <NavList>
            <button onClick={() => signOut()}> Logout</button>
          </NavList>
        )}
        <NavList>
          <PostForm />
        </NavList>
      </ul>
    </nav>
  );
};

export { Navbar, NavList };
