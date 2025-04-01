export default function PrimaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-md w-full items-center rounded-md bg-pink-400 px-6 py-2 font-medium leading-6 text-white ring-1 ring-pink-400 transition duration-150 ease-in-out hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-offset-1 md:px-6 md:py-2 md:text-base"
    >
      {children}
    </button>
  );
}
