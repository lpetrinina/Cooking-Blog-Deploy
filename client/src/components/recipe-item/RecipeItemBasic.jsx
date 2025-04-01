import { Link } from "react-router";

export default function RecipeItemBasic({ _id, title, description, imageUrl }) {
  const pattern = /^(\S+(?:\s+\S+){0,15})/;
  const match = description.match(pattern);
  const shortDescription = match[1];

  return (
    <div className="flex basis-full items-center gap-3 overflow-hidden rounded-xl border border-gray-300 bg-white lg:basis-[49%]">
      <div className="relative h-44 w-44 flex-shrink-0">
        <Link to={`/recipes/${_id}/details`}>
          <img
            className="absolute left-0 top-0 h-full w-full object-cover object-center transition duration-75"
            loading="lazy"
            src={imageUrl}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-20 transition duration-1000 hover:bg-transparent"></div>
        </Link>
      </div>

      <div className="mr-3 flex flex-col gap-3 py-2">
        <Link to={`/recipes/${_id}/details`}>
          <p className="text-lg font-medium transition duration-500 ease-in-out hover:text-pink-600">
            {title}
          </p>
        </Link>

        <p className="text-sm text-gray-500"> {shortDescription} ...</p>
      </div>
    </div>
  );
}
