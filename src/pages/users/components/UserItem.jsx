import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function UserItem({ user }) {
  return (
    <Link to={`/users/${user?.uuid}`}>
      <li
        key={user?.uuid}
        to={`/users/${user.uuid}`}
        className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
      >
        <div className="flex min-w-0 gap-x-4">
          <img alt={user?.name} src={user?.image} className="size-12 flex-none rounded-full bg-gray-50" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              <span>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {user?.name}
              </span>
            </p>
            <p className="mt-1 flex text-xs/5 text-gray-500">
              <span href={`mailto:${user?.email}`} className="relative truncate hover:underline">
                {user?.email}
              </span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900 capitalize">{user?.role}</p>
            {user?.bio && <p className="mt-1 text-xs/5 text-gray-500">{user?.bio}</p>}
          </div>
          <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
        </div>
      </li>
    </Link>
  );
}
