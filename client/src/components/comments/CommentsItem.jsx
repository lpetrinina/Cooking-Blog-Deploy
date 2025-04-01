export default function CommentsItem({ content, _createdOn, author }) {
  return (
    <div className="mb-2 rounded-sm bg-white p-4 shadow-md">
      <h3 className="text-lg font-bold text-gray-800">{author.username}</h3>
      <p className="mb-2 text-sm italic text-gray-700">
        Posted on {_createdOn}
      </p>
      <p className="text-gray-700">{content}</p>

      {/* Comment owner can edit and delete it */}
      {/* <div class="mt-3 flex items-center justify-end gap-2">
          <button class="mr-2 flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <img src="/edit.svg" alt="Edit svg" className="w-5" />
            Edit
          </button>

          <button class="mr-2 flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <img src="/delete.svg" alt="Delete svg" className="h-5 w-5" />
            Delete
          </button>
        </div> */}
    </div>
  );
}
