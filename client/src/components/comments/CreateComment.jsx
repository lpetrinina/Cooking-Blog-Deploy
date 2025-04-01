import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useCreateComment } from "../../api/commentsApi";
import PrimaryBtn from "../common/buttons/PrimaryBtn";

export default function CreateComment({ reloadComments }) {
  const { recipeId } = useParams();
  const { create } = useCreateComment();

  const formAction = async (formData) => {
    try {
      const data = Object.fromEntries(formData);
      await create(recipeId, data.comment);
      reloadComments();

      toast.success("Add new comment!");
    } catch (err) {
      toast.error(err.message || "Failed to add comment.");
    }
  };

  return (
    <form className="rounded-sm bg-white p-4 shadow-md" action={formAction}>
      <h3 className="mb-4 text-lg font-bold">Leave a comment</h3>

      <div className="mb-4">
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-1 focus:ring-inset focus:ring-pink-200"
          id="comment"
          name="comment"
          rows="3"
          placeholder="Enter your comment"
          required
        ></textarea>
      </div>

      <div className="mt-5 sm:mt-6 sm:flex sm:justify-center lg:justify-center">
        <div className="rounded-md shadow">
          <PrimaryBtn>Post</PrimaryBtn>
        </div>
      </div>
    </form>
  );
}
