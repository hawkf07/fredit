import create from 'zustand'
interface postHandlerType {
  userInput? : {
    title:"",
    description:""
  };
  userInputHandler : (e:{target:HTMLInputElement}) => void;
  createPostHandler?: () => void
}


const usePostHandler = create<postHandlerType>((set,get) => ({
  userInput: {title:"",description:""},
  userInputHandler: (e) => set((state) => {
    return { userInput :{
      ...state.userInput,
      [e.target.name]:e.target.value
    }
    }
  })
}))

export {usePostHandler}
