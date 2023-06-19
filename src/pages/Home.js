import { useEffect, useState } from "react";
import axios from "axios";

// components

import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../hooks/useItemsCartContext";

import Footer from "./footer/Footer";

import AllItemsOnMainPage from "../components/AllItemsOnMainPage";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { allItems, dispatcho } = useFetchItemsContext();
  const { items, dispatch } = useItemsCartContext();
  const { user, dispatchUser } = useAuthContext();
  const [slidingImagesOffer, setSlidingImagesOffer] = useState(1);
  const [slidingThirtyOfferItems, setSlidingThirtyOfferItems] = useState(1);
  const [showAlertNotifcation, setshowAlertNotifcation] = useState(true);

  // const firstTen = allItems.slice(0, 10);

  // console.log();

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch(
        "https://tourapi-x6d5.onrender.com/api/tours/"
      );

      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchTours();
  }, [dispatcho]);

  useEffect(() => {
    if (showAlertNotifcation) {
      alert(
        "Hello! ,Please wait 30 seconds for the Backend/Database server to start working again (because it's a free hosting after 15min of inactivity it stops working)"
      );

      setshowAlertNotifcation(false);
    }
  }, [dispatcho]);

  useEffect(() => {
    if (user) {
      const checkToken = async () => {
        try {
          const datas = await axios.post(
            "https://tourapi-x6d5.onrender.com/api/users/checktoken",
            {
              message: "checkme",
            },
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
              // headers: {
              //   "Access-Control-Allow-Origin": "*",
              //   "Content-Type": "application/json",
              // },
            }
          );
          // console.log(datas);
          return;
        } catch (error) {
          // console.log(error);
          // then remove user from local storage and   which will set the context to null automatically
          localStorage.removeItem("user");

          // dispatch to context just to re-renders
          dispatchUser({ type: "LOGOUT" });

          return;
        }
      };
      checkToken();
    }
  }, [user]);

  return (
    <div>
      <div className="body">
        <div className="home-welcome-text">
          <h1>Welcome!</h1>
          <div>Browse all our amazing tours!</div>
        </div>
      </div>

      <AllItemsOnMainPage />

      <Footer />
    </div>
  );
};

export default Home;

// export const allItemLoader = async () => {
//   const res = await fetch("https://book-tour-frontend.vercel.app/api/items/");

//   return res.json();
// };
