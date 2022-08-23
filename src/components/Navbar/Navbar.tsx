import Link from 'next/link';
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
  return (
    <nav className="flex justify-around items-center w-full shadow-lg ">
      <header>
        <h1 className="font-['Inter'] text-3xl first-letter:text-blue-500">
          {' '}
          Freddit{' '}
        </h1>
      </header>
      <ul className="flex justify-around items-center">
        <NavList>
          <Button> <Link href="/api/auth/signin" >Sign In/Log In </Link> </Button>
        </NavList>
        <NavList >
          <div className="rounded-[50%] bg-gray-300 w-8 h-8 shadow"></div>
        </NavList>
      </ul>
    </nav>
  );
};

export { Navbar, NavList };
