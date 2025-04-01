import { useContext } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Navigation({ navigation }) {
  const { accessToken } = useContext(UserContext);
  return (
    <>
      <div className="hidden md:ml-8 md:flex md:space-x-9">
        {/* For all users */}
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? navStyles.activeStyle : navStyles.hoverStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/recipes"}
          className={({ isActive }) =>
            isActive ? navStyles.activeStyle : navStyles.hoverStyle
          }
        >
          Recipes
        </NavLink>
        <NavLink
          to={"/about"}
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
              className={({ isActive }) =>
                isActive ? navStyles.activeStyle : navStyles.hoverStyle
              }
            >
              Profile
            </NavLink>

            <NavLink
              to={"/recipes/create"}
              className={({ isActive }) =>
                isActive ? navStyles.activeStyle : navStyles.hoverStyle
              }
            >
              Create
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

const navStyles = {
  activeStyle:
    "inline-flex items-center border-b-2 border-pink-500 px-1 pt-1 text-md font-medium text-gray-900",
  hoverStyle:
    "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-500 hover:border-pink-300 hover:text-gray-700",
};
