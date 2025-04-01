import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function MobileNavigation({ setIsOpen }) {
  const { accessToken } = useContext(UserContext);

  return (
    <>
      <div className="space-y-1 pb-3 pt-2">
        {/* For all users */}

        <NavLink
          to={"/"}
          onClick={() => setIsOpen()}
          className={({ isActive }) =>
            isActive ? navStyles.activeStyle : navStyles.hoverStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/recipes"}
          onClick={() => setIsOpen()}
          className={({ isActive }) =>
            isActive ? navStyles.activeStyle : navStyles.hoverStyle
          }
        >
          Recipes
        </NavLink>
        <NavLink
          to={"/about"}
          onClick={() => setIsOpen()}
          className={({ isActive }) =>
            isActive ? navStyles.activeStyle : navStyles.hoverStyle
          }
        >
          About
        </NavLink>

        {/* For logged users */}
        {accessToken && (
          <>
            <NavLink
              to={"/profile"}
              onClick={() => setIsOpen()}
              className={({ isActive }) =>
                isActive ? navStyles.activeStyle : navStyles.hoverStyle
              }
            >
              Profile
            </NavLink>
            <NavLink
              to={"/recipes/create"}
              onClick={() => setIsOpen()}
              className={({ isActive }) =>
                isActive ? navStyles.activeStyle : navStyles.hoverStyle
              }
            >
              Create
            </NavLink>
          </>
        )}
      </div>

      <div className="border-t border-gray-200 pb-3 pt-4">
        <div className="flex flex-col items-center space-y-2 px-3">
          {accessToken ? (
            <Link
              to="/logout"
              onClick={() => setIsOpen()}
              className="block w-full rounded-md bg-pink-400 px-3 py-2 text-center text-base font-medium text-white"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen()}
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-center text-base font-medium text-pink-400"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                onClick={() => setIsOpen()}
                className="block w-full rounded-md bg-pink-400 px-3 py-2 text-center text-base font-medium text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const navStyles = {
  activeStyle:
    "block border-l-4 border-pink-500 bg-pink-50 py-2 pl-3 pr-4 text-base font-medium text-gray-900",
  hoverStyle:
    "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-pink-300 hover:bg-gray-50 hover:text-gray-700",
};
