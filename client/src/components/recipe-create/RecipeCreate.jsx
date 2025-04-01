import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { useCreateRecipe } from "../../api/recipeApi";

import PrimaryBtn from "../common/buttons/PrimaryBtn";
import styles from "./RecipeCreate.module.css";
import { toast } from "react-toastify";

export default function RecipeCreate() {
  const navigate = useNavigate();
  const { create } = useCreateRecipe();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    try {
      await create(formData);

      toast.success("New recipe added!🎉");

      navigate("/recipes");
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
              <h2>New recipe</h2>
            </div>

            {/* <!-- Form --> */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- Title --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="title"
                  {...register("title", {
                    required: "Title is required.",
                    minLength: {
                      value: 5,
                      message: "Title should be at least 5 characters long.",
                    },
                  })}
                  placeholder="Banana Spinach Muffins"
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
                  placeholder="Nutritious banana spinach muffins made right in your blender! ..."
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
                  placeholder="20"
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
                  placeholder="60"
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
                  placeholder="https://www.ambitiouskitchen.com/wp-content/uploads/2021/06/Banana-Spinach-Muffins-5-594x594.jpg"
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
                    pattern: {
                      value: /^\d+\s+\w+(?:\s+\w+)*(?:,\d+\s+\w+(?:\s+\w+)*)*$/,
                      message:
                        "Ingredients should be separated by a comma, with no white space between them.",
                    },
                  })}
                  placeholder="3 cups (128g) spinach,4 eggs, ..."
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
                  placeholder="Add the eggs, bananas, maple syrup/honey, dairy free milk.,Add the dry ingredients to ..."
                />
                <label htmlFor="steps">Steps **</label>
                {errors.steps && (
                  <p className={styles["error-msg"]}>{errors.steps.message}</p>
                )}
              </div>

              <p className={styles["info"]}>
                ** Steps must end with a dot and be separated by a comma, with
                no white space between them.
              </p>

              <PrimaryBtn>Create</PrimaryBtn>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
