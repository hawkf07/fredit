const Button = ({ children }) => {
  return (
    <button className="py-2  px-4 border-2 border-sky-400 flex items-center  gap-2 rounded-xl">
      {' '}
      {children}
    </button>
  );
};

export { Button };
