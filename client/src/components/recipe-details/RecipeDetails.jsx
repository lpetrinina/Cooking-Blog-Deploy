import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

import PrimaryBtn from "../common/buttons/PrimaryBtn";
import Spinner from "../common/spinner/Spinner";
import DeleteModal from "../common/modal/DeleteModal";
import CreateComment from "../comments/CreateComment";
import ServerError from "../error-page/ServerError";
import CommentsItem from "../comments/CommentsItem";

import { useDeleteRecipe, useOneRecipe } from "../../api/recipeApi";
import { useDislikeRecipe, useLikeRecipe, useLikes } from "../../api/likesApi";
import useAuth from "../../hooks/useAuth";
import styles from "./RecipeDetails.module.css";
import CommentsList from "../comments/CommentsList";
import { useAllComments } from "../../api/commentsApi";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { recipeId } = useParams();
  const { recipe, isPending, error } = useOneRecipe(recipeId);
  const { deleteRecipe } = useDeleteRecipe();
  const [isOpen, setIsOpen] = useState(false);
  const { isLiked, setIsLiked, likes, setLikes, likeId, setLikeId } =
    useLikes(recipeId);
  const { likeRecipe } = useLikeRecipe();
  const { dislikeRecipe } = useDislikeRecipe();
  const { comments, reloadComments } = useAllComments(recipeId);

  if (error) {
    return <ServerError />;
  }

  const isOwner = recipe._ownerId === authData._id;

  const clickDeleteHadler = async () => {
    try {
      await deleteRecipe(recipeId);
      toast.success("The recipe was deleted successfully!");
      navigate("/recipes");
    } catch (error) {
      toast.error(error.message);
      setIsOpen(false);
    }
  };
  const clickCancelHandler = () => {
    setIsOpen(false);
  };

  const clickLikeHandler = async () => {
    try {
      const data = await likeRecipe(recipeId);
      setLikes((currentData) => [...currentData, data]);
      setIsLiked(true);
      setLikeId(data._id);

      toast.success("You liked this recipe!👍");
    } catch (error) {
      toast.error("Failed to like. Try again later!");
    }
  };

  const clickDislikeHandler = async () => {
    try {
      await dislikeRecipe(likeId);
      toast.success("You dislike this recipe!👎");

      setLikes((currentLikes) =>
        currentLikes.filter((like) => like._id !== likeId),
      );
      setIsLiked(false);
      setLikeId(null);
    } catch (error) {
      toast.error("Failed to dislike. Try again later!");
    }
  };

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <div className={styles["wrapper"]}>
            <div className={styles["container"]}>
              <header className={`${styles["section-header"]}`}>
                <div className={styles["text-container"]}>
                  <h1 className={styles["post-title"]}>{recipe.title}</h1>

                  <p className={styles["post-info"]}>{recipe.description}</p>

                  <div className={styles["recipe-times"]}>
                    <div>
                      <div className={styles["rt-label"]}>Prep time</div>
                      <div className={styles["rt-value"]}>
                        {recipe.prepTime} min
                      </div>
                    </div>
                    <div>
                      <div className={styles["rt-label"]}>Cook time</div>
                      <div className={styles["rt-value"]}>
                        {recipe.cookTime} min
                      </div>
                    </div>
                    <div>
                      <div className={styles["rt-label"]}>Total time</div>
                      <div className={styles["rt-value"]}>
                        {recipe.cookTime + recipe.prepTime} min
                      </div>
                    </div>
                  </div>

                  <div className={styles["recipe-feedback"]}>
                    <div className={styles["likes"]}>
                      <img src="/heart-svgrepo-com.svg" alt="" />
                      <p>
                        {likes.length} {likes.length == 1 ? " Like" : " Likes"}
                      </p>
                    </div>

                    <div className={styles["coments"]}>
                      <img src="/message-svgrepo-com.svg" alt="" />
                      <p>
                        {comments.length}{" "}
                        {comments.length == 1 ? "Comment" : "Comments"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles["image-container"]}>
                  <img src={recipe.imageUrl} alt={recipe.title} />
                </div>
              </header>

              <section className={styles["section-ingredients"]}>
                <h2>Ingredients</h2>

                <ul className={styles["ingredients-list"]}>
                  {recipe.ingredients?.map((item, idx) => (
                    <li key={idx + 1}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={styles["section-instructions"]}>
                <h2>Instructions</h2>
                <ul className={styles["instructions-list"]}>
                  {recipe.steps?.map((step, idx) => (
                    <li key={idx + 1}>
                      <span className={styles["step"]}>{idx + 1}.</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Only logged users can see this section */}
              {authData.accessToken && (
                <section>
                  {/* Every auth user can like recipe, except the owner of it*/}
                  {!isOwner && (
                    <>
                      <div className="mt-5 sm:mt-6 sm:flex sm:justify-center lg:justify-center">
                        <div className="rounded-md shadow">
                          {isLiked ? (
                            <PrimaryBtn onClick={clickDislikeHandler}>
                              Dislike
                            </PrimaryBtn>
                          ) : (
                            <PrimaryBtn onClick={clickLikeHandler}>
                              Like
                            </PrimaryBtn>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Recipe owner can edit and delete it */}
                  {isOwner && (
                    <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 sm:flex sm:flex-row sm:justify-center sm:gap-4 lg:justify-center">
                      <div className="rounded-md shadow">
                        <Link
                          to={`/recipes/${recipe._id}/edit`}
                          className="text-md block w-full items-center rounded-md bg-pink-400 px-6 py-2 font-medium leading-6 text-white ring-1 ring-pink-400 transition duration-150 ease-in-out hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-offset-1 md:px-6 md:py-2 md:text-base"
                        >
                          Edit
                        </Link>
                      </div>

                      <div className="rounded-md shadow">
                        <PrimaryBtn onClick={() => setIsOpen(!isOpen)}>
                          Delete
                        </PrimaryBtn>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>

          {isOpen && (
            <DeleteModal
              componentName={"recipe"}
              onCancel={clickCancelHandler}
              onDelete={clickDeleteHadler}
            />
          )}

          {/* Comments section */}
          <div className="mt-5 bg-pink-100 p-12">
            <h2 className="mb-4 text-lg font-bold uppercase">Comments</h2>
            <div className="flex flex-col space-y-4">
              <CommentsList comments={comments} />

              {/* Auth users can create comments, except the recipe owner */}
              {authData.accessToken && !isOwner && (
                <CreateComment reloadComments={reloadComments} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
