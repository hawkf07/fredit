import Link from 'next/link';
import {MdLogout} from 'react-icons/md'
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
    <nav className="flex justify-between px-3 items-center w-full shadow shadow-gray-500">
      <header>
        <h1 className="font-['Inter'] text-3xl first-letter:text-blue-500">
          {' '}
          Freddit{' '}
        </h1>
      </header>
      <ul className="flex w-1/2 justify-around items-stretch">
        <NavList>
          {!session && (
            <Button>
              {' '}
              <Link href="/api/auth/signin">Sign In/Log In </Link>{' '}
            </Button>
          )}
        </NavList>
        <NavList additionalClasses={`dropdown dropdown-left`}>
          <Image
            src={`${
              session?.user?.image
                ? session?.user?.image
                : '/avatar-svgrepo-com.svg'
            } `}
            tabIndex="0"
            className="rounded-full border-2 border-white bg-gray-400"
            width={32}
            height={32}
          />
          <div className="dropdown-content ">
          <ul tabIndex="0" className="flex flex-col w-96 h-36 bg-primary" >
            {session && 
<li className="flex items-center w-full justify-evenly hover:bg-gray-400 text-gray-100 "> <MdLogout className="text-2xl"/> <button className="rounded-none text-md " onClick={() => signOut()}> Logout</button> </li>
            }
            
          </ul>
          </div>
        </NavList>
       <NavList>
         {session && <PostForm/>} 
        </NavList>
      </ul>
    </nav>
  );
};

export { Navbar, NavList };
