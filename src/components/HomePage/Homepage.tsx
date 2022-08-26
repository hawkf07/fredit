import { Navbar } from '../Navbar';
import { Post } from '../Post';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-around items-center p-5 ">
        <Post />
      </div>
    </>
  );
}

export { HomePage };
