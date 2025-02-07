import { Link } from "react-router-dom";

export default function BlogItem({ blog }) {
  const DEFAULT_AVATAR = "http://placekitten.com/250/250";

  const { _id, author, content, title, createdAt } = blog;

  return (
    <article
      key={_id}
      className="flex flex-col items-start justify-between bg-white border border-gray-200 rounded-lg shadow-md p-5"
    >
      <div className="flex items-center gap-x-4 text-xs text-gray-500">
        <time dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
      </div>
      <div className="group relative mt-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600">
          <Link to={`/blogs/${_id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm text-gray-600">{content}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 font-semibold text-lg">
          {author.charAt(0)}
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{author}</p>
        </div>
      </div>
    </article>
  );
}
