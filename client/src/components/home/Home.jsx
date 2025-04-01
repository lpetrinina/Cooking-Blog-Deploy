import { Link } from "react-router";
import { useLatestRecipes } from "../../api/recipeApi";
import Spinner from "../common/spinner/Spinner";
import RecipeItem from "../recipe-item/RecipeItem";
import ServerError from "../error-page/ServerError";

export default function Home() {
  const { latestRecipes, isPending, error } = useLatestRecipes();

  if (error) {
    return <ServerError />;
  }

  return (
    <>
      <div className="mb-5 flex justify-between border-b text-sm">
        <div className="flex items-center border-b-2 border-pink-400 pb-2 pr-2 uppercase text-pink-600">
          <img
            src="/heart-decoration-svgrepo-com.svg"
            alt=""
            className="h-4 w-auto"
          />
          <p className="ml-2 inline-block font-semibold">Latest recipes</p>
        </div>

        <Link
          to={"/recipes"}
          className="text-sm italic text-gray-500 hover:text-pink-400"
        >
          See more &rarr;
        </Link>
      </div>

      {/* The latest three added recipes */}
      {isPending ? (
        <Spinner />
      ) : (
        <>
          {latestRecipes.length > 0 && (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
              {latestRecipes.map((recipe) => (
                <RecipeItem key={recipe._id} {...recipe} />
              ))}
            </div>
          )}

          {latestRecipes.length === 0 && (
            <p className="mt-28 text-center text-xl font-bold tracking-wide text-gray-500">
              There is no recipe yet!
            </p>
          )}
        </>
      )}
    </>
  );
}
