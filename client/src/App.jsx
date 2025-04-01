import { Route, Routes } from "react-router";

import UserProvider from "./components/providers/UserProvider";
import { ToastContainer } from "react-toastify";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/sign-up/SignUp";
import About from "./components/about/About";
import Catalog from "./components/catalog/Catalog";
import RecipeDetails from "./components/recipe-details/RecipeDetails";
import RecipeCreate from "./components/recipe-create/RecipeCreate";
import RecipeEdit from "./components/recipe-edit/RecipeEdit";
import Footer from "./components/footer/Footer";
import Logout from "./components/logout/Logout";
import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";
import UserProfile from "./components/profile/UserProfil";
import NotFound from "./components/error-page/NotFound";
import ServerError from "./components/error-page/ServerError";

import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <Header />

        <ToastContainer />
        <div className="bg-white pt-16">
          <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-screen-xl bg-white p-5 sm:p-10 md:p-16">
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<ServerError />} />

                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/recipes/:recipeId/details"
                  element={<RecipeDetails />}
                />

                <Route element={<AuthGuard />}>
                  <Route path="/recipes/create" element={<RecipeCreate />} />
                  <Route
                    path="/recipes/:recipeId/edit"
                    element={<RecipeEdit />}
                  />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<UserProfile />} />
                </Route>

                <Route element={<GuestGuard />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Route>
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
