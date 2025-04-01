import { Link } from "react-router";

export default function RecipeItem({
  _id,
  title,
  description,
  prepTime,
  cookTime,
  imageUrl,
}) {
  const shortDescription = description.slice().split(/[,.!]/)[0];
  const recipeTime = prepTime + cookTime;

  return (
    <div className="flex flex-col overflow-hidden rounded shadow-lg">
      <div className="relative">
        <Link to={`/recipes/${_id}/details`}>
          <img className="w-full" src={imageUrl} alt={title} />
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-20 transition duration-1000 hover:bg-transparent"></div>
        </Link>
      </div>

      <div className="mb-auto px-6 py-4">
        <Link
          to={`/recipes/${_id}/details`}
          className="mb-2 inline-block text-lg font-medium transition duration-500 ease-in-out hover:text-pink-600"
        >
          {title}
        </Link>

        <p className="text-sm text-gray-500">{shortDescription} ...</p>
      </div>

      <div className="flex flex-row items-center justify-between bg-pink-50 px-6 py-3 opacity-70">
        <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-700">
          <svg
            height="13px"
            width="13px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
              </g>
            </g>
          </svg>
          <span className="ml-1">{recipeTime} min</span>
        </span>

        {/* Comments count */}
        {/* <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-900">
          <svg
            className="h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          <span className="ml-1">39 Comments</span>
        </span> */}
      </div>
    </div>
  );
}
