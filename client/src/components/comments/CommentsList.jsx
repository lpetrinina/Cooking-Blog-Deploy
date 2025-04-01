import CommentsItem from "./CommentsItem";

export default function CommentsList({ comments }) {
  return (
    <>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentsItem key={comment._id} {...comment} />
        ))}

      {/* If no comments */}
      {comments.length === 0 && (
        <p className="text-md mb-10 mt-8 text-center font-bold italic tracking-wide text-gray-500">
          There are no comments for this recipe yet!
        </p>
      )}
    </>
  );
}
