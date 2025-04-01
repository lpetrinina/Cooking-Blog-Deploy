export default function SecondaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full items-center rounded-md px-4 py-2 text-sm font-medium leading-6 text-pink-400 ring-1 ring-pink-300 hover:ring-1 hover:ring-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:ring-offset-1 md:text-base"
    >
      {children}
    </button>
  );
}
//
