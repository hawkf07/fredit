import { PostContent } from './../PostContent/';
import { trpc } from '../../utils/trpc';
import { FaArrowUp, FaComment, FaArrowDown } from 'react-icons/fa/';
import { GoCommentDiscussion } from 'react-icons/go/';

import Image from 'next/image';

const Post = () => {
  const posts = trpc.useQuery(['posts.get-posts']);
  console.log(posts.data)
  return (
    <section className="w-full  font-['Inter'] gap-5 justify-around p-5 items-center">
      {posts.isError && 'There is Some Error'}
      {posts.data &&
        posts?.data?.map((post) => {
          return (
            <PostContent
              key={post.id}
              postTitle={post.title}
              PostContent={post.description}
              avatarImage={post?.image ? post?.image :`/avatar-svgrepo-com.svg`}
              votesCount={post.votesCount}
              author="fikri"
              dateCreated={new Date(post.dateCreated)}
            />
          );
        })}
    </section>
  );
};

export { Post };
