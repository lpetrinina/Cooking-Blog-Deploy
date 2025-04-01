import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { useValidateLoginForm } from "../../utils/validateForm";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import PrimaryBtn from "../common/buttons/PrimaryBtn";
import styles from "./Login.module.css";
import ErrorPage from "../error-page/NotFound";

export default function Login() {
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin();

  const { validateEmail, validatePassword } = useValidateLoginForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passErrorMsg, setPassErrorMsg] = useState(null);

  const handleEmailValue = (e) => {
    setEmail(e.target.value);
  };
  const showEmailError = (e) => {
    const err = validateEmail(email);
    setEmailErrorMsg(err);
  };

  const handlePassValue = (e) => {
    setPassword(e.target.value);
  };
  const showPassError = () => {
    const err = validatePassword(password);
    setPassErrorMsg(err);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (!emailErrorMsg && !passErrorMsg) {
      try {
        const authData = await login(email, password);
        userLoginHandler(authData);

        toast.success("Successful login!");
        navigate("/recipes");
      } catch (error) {
        if (error.message === "Failed to fetch") {
          navigate("/error");
        }

        if (error.code === 403) {
          toast.error("Invalid email or password!");
          setPassword("");
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-gradient-to-t from-white to-pink-100 px-4 py-8 shadow-lg sm:rounded-lg sm:px-10">
            {/* <!-- Header --> */}
            <div className={styles["header"]}>
              <h2>Login</h2>
            </div>

            {/* <!-- Form --> */}
            <form className="space-y-7" onSubmit={loginSubmitHandler}>
              {/* <!-- Email --> */}
              <div className={styles["field"]}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailValue}
                  onBlur={showEmailError}
                  required
                />
                <label htmlFor="email">Email Address</label>
                {emailErrorMsg && (
                  <p className={styles["error-msg"]}>{emailErrorMsg}</p>
                )}
              </div>

              {/* <!-- Password --> */}
              <div className={styles["field"]}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePassValue}
                  onBlur={showPassError}
                  required
                />
                <label htmlFor="password">Password</label>
                {passErrorMsg && (
                  <p className={styles["error-msg"]}>{passErrorMsg} </p>
                )}
              </div>

              <PrimaryBtn>Login</PrimaryBtn>
            </form>

            <div className={styles["link-container"]}>
              <p>Don't have an account?</p>
              <Link to="/sign-up" className={styles["link-to-register"]}>
                Sign up &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
