import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../hooks/useItemsCartContext";

export default function RootLayout() {
  const { items, dispatch } = useItemsCartContext();
  const [title, setTitle] = useState("");
  const { allItems, dispatcho } = useFetchItemsContext();
  const { user, dispatchUser } = useAuthContext();
  const [showSearchError, setShowSearchError] = useState(false);
  const navTo = useNavigate();

  const LogoutFunctionHandler = async () => {
    // fetch request and if ok the cookie will be removed
    const datas = await axios.post(
      "https://book-tour-api-production.up.railway.app/api/users/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    );

    // then remove user from local storage and redirect , which will set the context to null automatically
    localStorage.removeItem("user");

    // dispatch to context just to re-renders
    dispatchUser({ type: "LOGOUT" });

    navTo("/");
  };

  // useEffect(() => {}, [value]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatchUser({ type: "LOGIN", payload: user });
    }
  }, []);

  let searchedNameobject;

  searchedNameobject = allItems.find(
    (item) => item.name.toLowerCase() === title.toLowerCase()
  );

  let id;
  if (searchedNameobject) {
    const { _id } = searchedNameobject;

    id = _id;
  }

  // the search functionality ^ _ ^

  useEffect(() => {
    if (searchedNameobject) {
      setShowSearchError(false);
    }
  }, [searchedNameobject]);

  let numberOfItems = 0;

  const localStorageCartAllItems = JSON.parse(
    localStorage.getItem("bookingItems")
  );

  if (localStorageCartAllItems) {
    numberOfItems = localStorageCartAllItems.length;
  }

  // if (localStorageCartAllItems) {
  //   numberOfItems = localStorageCartAllItems.length;
  // }

  useEffect(() => {}, [localStorageCartAllItems, numberOfItems]);

  return (
    <div className="root-layout">
      <header>
        <nav className="nav1">
          <nav className="nav1-main">
            <NavLink className="navLink-home" to="/">
              Home
            </NavLink>
            <NavLink to="/europetours">Europe-Tours</NavLink>
            <NavLink to="/asiatours">Asia-Tours</NavLink>
            <NavLink to="/africatours">Africa-Tours</NavLink>
            <NavLink to="/forums">Review-Forum</NavLink>
          </nav>
          <nav className="nav1-right-side">
            {/* <NavLink to="login">Login</NavLink>
            <NavLink to="signup">Signup</NavLink> */}
            {!user && <NavLink to="login">Login</NavLink>}
            {user && <NavLink to="profile">Profile</NavLink>}
            {/* <NavLink to="contact"></NavLink> */}
            {!user && <NavLink to="signup">Signup</NavLink>}
            {user && (
              <Link to="" onClick={LogoutFunctionHandler}>
                Logout
              </Link>
            )}
          </nav>
        </nav>

        <nav className="nav3">
          <div>
            <input
              className="search-bar"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Search For Tour"
            ></input>

            <NavLink
              className="search-button"
              to={
                searchedNameobject
                  ? "https://book-tour-frontend-production.up.railway.app/" + id
                  : ""
              }
              onClick={() => {
                if (searchedNameobject === undefined) {
                  setShowSearchError(true);
                }
              }}
            >
              Find tour
            </NavLink>
          </div>

          {/* <NavLink className="end" to="favourite">
            Heart
          </NavLink> */}
          <NavLink className="Booking-button" to="booking">
            Your Booking {numberOfItems === 0 ? "" : numberOfItems}
          </NavLink>
        </nav>
        <div className="error-Search-main">
          {showSearchError && (
            <div className="error-Search">
              "no item was found matching that input"
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
