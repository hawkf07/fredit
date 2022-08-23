import Image from 'next/image';
import { GoCommentDiscussion } from 'react-icons/go';
import {FaArrowUp,FaArrowDown} from 'react-icons/fa/'
import React from 'react';

interface PostContentType {
  postTitle: string;
  PostContent: string;
  avatarImage: string;
  dateCreated: string;
  author: string;
  votesCount: number;
}

function PostContent({
  postTitle,
  author,
  dateCreated,
  PostContent,
  avatarImage,
  votesCount
}: PostContentType) {
  return (
    <section className="flex min-h-96 shadow rounded gap-10 my-3 w-full mx-3  p-5 justify-around rounded">

      <div className="flex flex-col justify-around gap-5 h-32 ">
        <div className="text-2xl text-slate-400"><FaArrowUp/> </div>
        <div className="text-xl"> {votesCount} </div>
        <div className="text-2xl text-slate-400"><FaArrowDown/> </div>
      </div>
    <div className="w-full gap-3 flex min-h-64 h-64 flex-col justify-around">
      <header className="text-3xl">
        <h1> {postTitle} </h1>
      </header>
      <div className="text-xl">{PostContent}</div>
      <section className="flex border-t-4 justify-evenly mt-5 items-center p-5">
        <figure className="flex justify-around items-center w-1/2 h-auto gap-5">
          <Image
            width={36}
            height={36}
            src={avatarImage}
            className="w-9 rounded-full h-9 shadow"
          />
          <figcaption className="flex w-full justify-start gap-5">
            {' '}
            <h3 className="text-slate-500">
              {' '}
              Posted By <span className="text-blue-400"> {author}</span>
            </h3>{' '}
            <h3>{dateCreated}</h3>
          </figcaption>
        </figure>
        <div className="flex gap-5 items-center justify-around">
          <GoCommentDiscussion size="1.5rem" />
          <span className="text-xl"> {votesCount}</span>
        </div>
      </section>
  </div>
    </section>
  );
}
export {
  PostContent  
}
