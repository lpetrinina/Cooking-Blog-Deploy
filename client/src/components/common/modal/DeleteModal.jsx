import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";

export default function DeleteModal({ componentName, onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 z-40 flex min-h-full items-center overflow-y-auto overflow-x-hidden transition">
      {/* <!-- overlay --> */}
      <div
        aria-hidden="true"
        className="fixed inset-0 h-full w-full cursor-pointer bg-black/50"
        onClick={onCancel}
      ></div>

      {/* <!-- Modal --> */}
      <div className="pointer-events-none relative my-auto w-full cursor-pointer p-8 transition">
        <div className="pointer-events-auto relative m-auto max-w-md cursor-default rounded-sm bg-white p-4 shadow-md">
          <svg
            class="mx-auto mt-4 h-20 w-20 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <p className="mb-10 mt-5 text-center text-lg font-bold">
            Are you sure you want to delete this {componentName}?
          </p>

          <button
            type="button"
            className="absolute right-2 top-2 rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-pink-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-pink-400 rtl:left-2 rtl:right-auto"
            data-modal-toggle="product-modal"
            onClick={onCancel}
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

          <div className="mt-10 flex flex-col justify-center gap-3 sm:mt-6 sm:flex sm:flex-row sm:justify-center lg:justify-center">
            <div className="rounded-md shadow">
              <PrimaryBtn onClick={onDelete}>Yes, I'm sure</PrimaryBtn>
            </div>

            <div className="rounded-md shadow">
              <SecondaryBtn onClick={onCancel}>Cancel</SecondaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
