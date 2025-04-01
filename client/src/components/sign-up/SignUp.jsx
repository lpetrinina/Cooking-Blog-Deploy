import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { useValidateSignUpForm } from "../../utils/validateForm";
import { UserContext } from "../../contexts/UserContext";
import { useRegister } from "../../api/authApi";

import PrimaryBtn from "../common/buttons/PrimaryBtn";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const navigation = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useContext(UserContext);
  const {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  } = useValidateSignUpForm();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passErrorMsg, setPassErrorMsg] = useState(null);
  const [confirmPassErrorMsg, setConfirmPassErrorMsg] = useState(null);

  const handleUsernameValue = (e) => {
    setUsername(e.target.value);
  };
  const showUsernameError = () => {
    const err = validateUsername(username);
    setUsernameErrorMsg(err);
  };

  const handleEmailValue = (e) => {
    setEmail(e.target.value);
  };
  const showEmailError = () => {
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

  const handleConfirmPassValue = (e) => {
    setConfirmPassword(e.target.value);
  };
  const showConfirmPassError = () => {
    const err = validateConfirmPassword(password, confirmPassword);
    setConfirmPassErrorMsg(err);
  };

  const isFormValid =
    !usernameErrorMsg &&
    !emailErrorMsg &&
    !passErrorMsg &&
    !confirmPassErrorMsg;

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const authData = await register(username, email, password);
        userLoginHandler(authData);

        toast.success("Successful sign up!");
        navigation("/");
      } catch (error) {
        if (error.message === "Failed to fetch") {
          navigate("/error");
        }

        toast.error(error.message);
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
              <h2>Sign up</h2>
            </div>

            {/* <!-- Form --> */}
            <form className="space-y-7" onSubmit={registerSubmitHandler}>
              {/* <!-- Username --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={handleUsernameValue}
                  onBlur={showUsernameError}
                  required
                />
                <label htmlFor="username">Username</label>
                {usernameErrorMsg && (
                  <p className={styles["error-msg"]}>{usernameErrorMsg}</p>
                )}
              </div>

              {/* <!-- Email --> */}
              <div className={styles["field"]}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
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
                  <p className={styles["error-msg"]}>{passErrorMsg}</p>
                )}
              </div>

              {/* <!-- Confirm Password --> */}
              <div className={styles["field"]}>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPassValue}
                  onBlur={showConfirmPassError}
                  required
                />
                <label htmlFor="confirmPassword">Confirm password</label>
                {confirmPassErrorMsg && (
                  <p className={styles["error-msg"]}>{confirmPassErrorMsg}</p>
                )}
              </div>

              <PrimaryBtn>Sign up</PrimaryBtn>
            </form>

            <div className={styles["link-container"]}>
              <p>Already have an account?</p>
              <Link to="/login" className={styles["link-to-login"]}>
                Login &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
