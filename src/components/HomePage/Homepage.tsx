import { Navbar } from '../Navbar';
import { Post } from '../Post';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-around items-center p-5 ">
        <div className="h-screen bg-sky-500  p-16">sidebar</div>
        <Post />
        <div className="h-screen bg-red-500 p-16 w-1/5">Another Sidebar</div>
      </div>
    </>
  );
}

export { HomePage };
