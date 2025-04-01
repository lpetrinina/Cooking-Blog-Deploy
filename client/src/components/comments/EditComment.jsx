import PrimaryBtn from "../common/buttons/PrimaryBtn";
import SecondaryBtn from "../common/buttons/SecondaryBtn";

export default function EditComment() {
  return (
    <div className="fixed inset-0 z-40 flex min-h-full items-center overflow-y-auto overflow-x-hidden transition">
      {/* <!-- overlay --> */}
      <div
        aria-hidden="true"
        className="fixed inset-0 h-full w-full cursor-pointer bg-black/50"
      ></div>

      {/* <!-- Modal --> */}
      <div className="pointer-events-none relative my-auto w-full cursor-pointer p-8 transition">
        <form className="pointer-events-auto relative m-auto max-w-xl cursor-default rounded-sm bg-white p-4 shadow-md">
          <h3 className="mb-4 text-lg font-bold">Edit your comment</h3>

          <button
            type="button"
            className="absolute right-2 top-2 rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-pink-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-pink-400 rtl:left-2 rtl:right-auto"
            data-modal-toggle="product-modal"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-800" for="comment">
              Comment
            </label>
            <textarea
              className="focus:shadow-outline h-40 w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none focus:ring-1 focus:ring-inset focus:ring-pink-400"
              id="comment"
              rows="3"
              placeholder="Enter your comment"
            ></textarea>
          </div>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:mt-6 sm:flex sm:flex-row sm:justify-center lg:justify-center">
            <div className="rounded-md shadow">
              <PrimaryBtn>Edit</PrimaryBtn>
            </div>

            <div className="rounded-md shadow">
              <SecondaryBtn>Cancel</SecondaryBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
