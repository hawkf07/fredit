import { usePostHandler } from '../../utils/posts-handler';
import {trpc} from '../../utils/trpc'

const PostForm = () => {
  const {userInput, userInputHandler } = usePostHandler();
  const createPost = trpc.useMutation("posts.create-post")
  return (
    <>
      <label htmlFor="my-modal" className="btn modal-button">
        Submit
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-10 flex flex-col w-full gap-10 items-center">
          <header>
            <h3 className="font-bold text-lg">Create A Post</h3>
          </header>
          <form
            onSubmit={(e) => {
                e.preventDefault()
                createPost?.mutate({title:userInput.title,description:userInput.description})
                console.log(createPost?.data)
              }}
            className="flex flex-col w-full gap-3"
          >
            <input
              type="text"
              onKeyUp={userInputHandler}
              className="input w-full rounded-none border-slate-400"
              placeholder="please enter the post title"
              name="title"
            />
            <textarea
              className="textarea border-slate-400 rounded-none w-full"
              name="description"
              onKeyUp={userInputHandler}
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-wide">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export { PostForm };
