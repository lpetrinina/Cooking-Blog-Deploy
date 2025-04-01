import { useLikesByOwner } from "../../api/likesApi";
import { useLikedRecipes, useRecipesByOwner } from "../../api/recipeApi";
import useAuth from "../../hooks/useAuth";
import Spinner from "../common/spinner/Spinner";
import ServerError from "../error-page/ServerError";
import RecipeItemBasic from "../recipe-item/RecipeItemBasic";

export default function UserProfile() {
  const { authData } = useAuth();
  const { recipes, isPending, ownRecipeError } = useRecipesByOwner(
    authData._id,
  );

  const { likedRecipesIds } = useLikesByOwner();
  const { likedRecipes, isLikedPending, likedRecipeError } =
    useLikedRecipes(likedRecipesIds);

  if (ownRecipeError || likedRecipeError) {
    return <ServerError />;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-8 flex max-w-72 gap-3 self-end text-center text-gray-500">
          <div className="text-md mt-5">
            <p className="font-normal text-gray-900">
              Wellcome, <span className="font-medium">{authData.username}</span>
              !
            </p>
            <p className="text-sm">({authData.email})</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-7 flex justify-between border-b text-sm">
            <div className="flex items-center border-b-2 border-pink-400 pb-2 pr-2 uppercase text-pink-600">
              <p className="ml-2 inline-block font-semibold">Your Recipes</p>
            </div>
          </div>

          {isPending ? (
            <Spinner />
          ) : (
            <>
              {recipes.length > 0 && (
                <div className="mx-auto flex flex-col flex-wrap gap-4 md:flex md:flex-row lg:justify-between">
                  {recipes.map((recipe) => (
                    <RecipeItemBasic key={recipe._id} {...recipe} />
                  ))}
                </div>
              )}

              {recipes.length === 0 && (
                <p className="mb-10 mt-28 text-center text-lg font-bold tracking-wide text-gray-500">
                  You have no recipes in this category!
                </p>
              )}
            </>
          )}
        </div>

        <div>
          <div className="mb-7 flex justify-between border-b text-sm">
            <div className="flex items-center border-b-2 border-pink-400 pb-2 pr-2 uppercase text-pink-600">
              <p className="ml-2 inline-block font-semibold">Liked Recipes</p>
            </div>
          </div>

          {isLikedPending ? (
            <Spinner />
          ) : (
            <>
              {likedRecipes.length > 0 && (
                <div className="mx-auto flex flex-col flex-wrap justify-between gap-4 md:flex md:flex-row">
                  {likedRecipes.map((recipe) => (
                    <RecipeItemBasic key={recipe._id} {...recipe} />
                  ))}
                </div>
              )}

              {likedRecipes.length === 0 && (
                <p className="mb-10 mt-28 text-center text-lg font-bold tracking-wide text-gray-500">
                  You have no recipes in this category.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
