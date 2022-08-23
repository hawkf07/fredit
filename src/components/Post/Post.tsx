import { PostContent } from './../PostContent/';
import { FaArrowUp, FaComment, FaArrowDown } from 'react-icons/fa/';
import { GoCommentDiscussion } from 'react-icons/go/';

import Image from 'next/image';

const Post = () => {
  return (
    <section className="w-full  font-['Inter'] gap-5 justify-around p-5 items-center">
      <PostContent
        postTitle="Hello WOrld"
        PostContent="Something Hello World"
        avatarImage="/avatar-svgrepo-com.svg"
        votesCount={52}
        author="fikri Fadillah"
        dateCreated="December 2022"
      />

      <PostContent
        postTitle="Hello WOrld"
        PostContent="Something Hello World"
        avatarImage="/avatar-svgrepo-com.svg"
        votesCount={52}
        author="fikri Fadillah"
        dateCreated="December 2022"
      />
    </section>
  );
};

export { Post };
