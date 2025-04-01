import { useContext, useState } from "react";
import { Link } from "react-router";

import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen);
  };

  const { accessToken } = useContext(UserContext);
  return (
    <>
      {/* <!-- Sticky Navbar with Dropdown --> */}
      <nav className="fixed z-10 w-full bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-9 w-auto"
                  src="/logo/baked-cake-cup-svgrepo-com.png"
                  alt="Logo"
                />
              </Link>

              {/* Main navigation */}
              <Navigation />
            </div>

            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:items-center">
                <div className="flex justify-between gap-3">
                  {accessToken ? (
                    <Link
                      to="/logout"
                      className="rounded-md px-4 py-2 text-sm font-medium text-pink-400 hover:ring-1 hover:ring-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:ring-offset-1"
                    >
                      Logout
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="rounded-md px-4 py-2 text-sm font-medium text-pink-400 hover:ring-1 hover:ring-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:ring-offset-1"
                      >
                        Login
                      </Link>

                      <Link
                        to="/sign-up"
                        className="rounded-md bg-pink-400 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:ring-offset-1"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-pink-500"
                  aria-expanded={mobileMenuOpen}
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state --> */}
        <div className={mobileMenuOpen ? "block" : "hidden"} id="mobile-menu">
          <MobileNavigation setIsOpen={toggleMobileMenu} />
        </div>
      </nav>
    </>
  );
}
