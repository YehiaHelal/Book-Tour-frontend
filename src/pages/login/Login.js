import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

export default function Login() {
  const data = useActionData();
  const { user, dispatchUser } = useAuthContext();
  const navTo = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopupfrontend, setErrorShowPopupfrontend] = useState(false);
  const [showBackendErrorPopup, setShowBackendErrorPopup] = useState(false);
  const [showBackendErrorMessage, setShowBackendErrorMessage] = useState();

  // console.log(user);

  // console.log(data);

  useEffect(() => {
    if (data === "password error") {
      // count.current = count.current + 1;
      // console.log(count);
      setErrorShowPopupfrontend(true);
      setShowBackendErrorPopup(false);
    }
    // if (data !== undefined && data !== "error") {
    //   setShowPopup(true);
    // }
    if (data === "incorrect password") {
      setErrorShowPopupfrontend(false);
      setShowBackendErrorPopup(true);
      setShowBackendErrorMessage("incorrect password");
      // console.log(showBackendErrorMessage);
    }

    if (data === "No such user found") {
      setErrorShowPopupfrontend(false);
      setShowBackendErrorPopup(true);
      setShowBackendErrorMessage("No user was found matching that email");
      // console.log(showBackendErrorMessage);
    }

    if (typeof data === "object") {
      setShowBackendErrorPopup(false);
      setErrorShowPopupfrontend(false);

      // console.log("we are in");
      dispatchUser({ type: "LOGIN", payload: data });

      localStorage.setItem("user", JSON.stringify(data));

      setShowPopup(true);

      setTimeout(() => {
        navTo("/");
      }, 1000);
    }
  }, [data]);

  return (
    <div>
      <div className="article-main">
        <div className="component-default-login-signup">
          <h3>Please enter your information here</h3>
          <Form method="post" action="/login">
            <label>
              <span>Your email:</span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span>Your password:</span>
              <input type="password" name="password" required />
            </label>
            <button>Login</button>
            {showPopup && (
              <p>Login was successful, Redirecting in 1 second...</p>
            )}

            {showErrorPopupfrontend && (
              <div className="error">
                Password must be longer than 6 characters long
              </div>
            )}

            {showBackendErrorPopup && (
              <div className="error">{showBackendErrorMessage}</div>
            )}

            {/* {data && data.error && <p>{data.error}</p>} */}
          </Form>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}

export const LoginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (submission.password.length < 6) {
    // "password must be longer than 6 characters"
    // console.log("password must be longer than 6 characters long");
    const errorSet = "password error";
    return errorSet;
  }

  try {
    const datas = await axios.post(
      "https://book-tour-api-production.up.railway.app/api/users/login",
      {
        submission,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Content-Type": "application/json",
        // },
      }
    );

    // if (submission.message.length < 10) {
    //   return { error: "Message must be over 10 chars long." };
    // }

    // send your post request
    return datas;
  } catch (error) {
    // console.log(error.response.data[0]);
    return error.response.data.error;
  }

  return 1;
};
// );

// const sendingRequest = async () => {
//   const response = await fetch("https://book-tour-frontend-production.up.railway.app/api/users/");

//   const json = await response.json();

//   if (response.ok) {
//     console.log("sent");
//   }

//   return json;
// };

// if (submission.message.length < 10) {
//   return { error: "Message must be over 10 chars long." };
// }

// redirect the user
// return redirect("/")
