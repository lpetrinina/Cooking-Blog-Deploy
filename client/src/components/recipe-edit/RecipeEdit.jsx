import { useNavigate, useParams } from "react-router";

import { useEditRecipe, useOneRecipe } from "../../api/recipeApi";
import PrimaryBtn from "../common/buttons/PrimaryBtn";
import styles from "./RecipeEdit.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RecipeEdit() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe } = useOneRecipe(recipeId);
  const { edit } = useEditRecipe();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      prepTime: "",
      imageUrl: "",
      ingredients: "",
      steps: "",
    },
  });

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title || "",
        description: recipe.description || "",
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        imageUrl: recipe.imageUrl || "",
        ingredients: recipe.ingredients || "",
        steps: recipe.steps || "",
      });
    }
  }, [recipe, reset]); // Runs when `recipe` changes

  const onSubmit = async (formData) => {
    try {
      await edit(recipeId, formData);
      toast.success("Your edits have been applied!");
      navigate(`/recipes/${recipeId}/details`);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        navigate("/error");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-white sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-gradient-to-t from-white to-pink-100 px-4 py-8 shadow-lg sm:rounded-lg sm:px-10">
            {/* <!-- Header --> */}
            <div className={styles["header"]}>
              <h2>Edit recipe</h2>
            </div>

            {/* <!-- Form --> */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- Title --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="title"
                  {...register("title", {
                    required: "Title is required!",
                    minLength: {
                      value: 5,
                      message: "Title should be at least 5 characters long.",
                    },
                  })}
                />
                <label htmlFor="title">Title</label>
                {errors.title && (
                  <p className={styles["error-msg"]}>{errors.title.message} </p>
                )}
              </div>

              {/* <!-- Description --> */}
              <div className={styles["field"]}>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required.",
                    minLength: {
                      value: 40,
                      message:
                        "Description should be at least 40 characters long.",
                    },
                  })}
                />
                <label htmlFor="description">Description</label>
                {errors.description && (
                  <p className={styles["error-msg"]}>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* <!-- Preparation time --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="prepTime"
                  {...register("prepTime", {
                    required: "Preparation time is required.",
                    min: {
                      value: 1,
                      message: "Preparation time should be at least 1 minute.",
                    },
                    max: {
                      value: 120,
                      message:
                        "Preparation time should not exceed 120 minutes (2 hours).",
                    },
                  })}
                />
                <label htmlFor="prepTime">Preparation time (in minutes)</label>
                {errors.prepTime && (
                  <p className={styles["error-msg"]}>
                    {errors.prepTime.message}
                  </p>
                )}
              </div>

              {/* <!-- Cook time --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="cookTime"
                  {...register("cookTime", {
                    required: "Cook time is required.",
                    min: {
                      value: 0,
                      message: "Cook time should be a positive number.",
                    },
                    max: {
                      value: 240,
                      message:
                        "Cook time should not exceed 240 minutes (4 hours).",
                    },
                  })}
                />
                <label htmlFor="cookTime">Cook time (in minutes)</label>
                {errors.cookTime && (
                  <p className={styles["error-msg"]}>
                    {errors.cookTime.message}
                  </p>
                )}
              </div>

              {/* <!-- Image --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="imageUrl"
                  {...register("imageUrl", {
                    required: "Image is required.",
                    pattern: {
                      value:
                        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)(\?.*)?$/,
                      message: "Invalid image url format.",
                    },
                  })}
                />
                <label htmlFor="imageUrl">Image</label>
                {errors.imageUrl && (
                  <p className={styles["error-msg"]}>
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              {/* <!-- Ingredients --> */}
              <div className={styles["field"]}>
                <textarea
                  id="ingredients"
                  {...register("ingredients", {
                    required: "Ingredients are required.",
                    minLength: {
                      value: 50,
                      message:
                        "Ingredients should be at least 50 characters long.",
                    },
                  })}
                />
                <label htmlFor="ingredients">Ingredients</label>
                {errors.ingredients && (
                  <p className={styles["error-msg"]}>
                    {errors.ingredients.message}
                  </p>
                )}
              </div>

              {/* <!-- Steps --> */}
              <div className={styles["field"]}>
                <textarea
                  id="steps"
                  {...register("steps", {
                    required: "Steps are required.",
                    minLength: {
                      value: 50,
                      message: "Steps should be at least 50 characters long.",
                    },
                  })}
                />
                <label htmlFor="steps">Steps</label>
                {errors.steps && (
                  <p className={styles["error-msg"]}>{errors.steps.message}</p>
                )}
              </div>

              <PrimaryBtn>Submit</PrimaryBtn>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
