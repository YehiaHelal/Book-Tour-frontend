import { useEffect, useState } from "react";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import {
  Form,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReviewForum = () => {
  const navTo = useNavigate();
  const data = useActionData();
  const reviews = useLoaderData();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showSendReviewForum, SetShowSendReviewForum] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  const { user, dispatchUser } = useAuthContext();

  useEffect(() => {
    if (data) {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  }, [data]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://book-tour-api-production.up.railway.app/api/tours/"
      );

      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  const toursNames = allItems.map((item) => {
    return item.name;
  });

  // console.log(toursName);

  if (reviews) {
    // console.log("done");
  }

  function handleShowSendReviewForum() {
    setShowAllReviews(false);
    SetShowSendReviewForum(true);
  }

  function handleShowAllReviews() {
    SetShowSendReviewForum(false);
    setShowAllReviews(true);
  }

  // const { allItems, dispatcho } = useFetchItemsContext();

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch(
  //       "https://book-tour-frontend-production.up.railway.app/api/reviews/getuserreviews"
  //     );
  //     const json = await response.json();

  //     if (response.ok) {
  //       console.log(json);
  //     }
  //   };

  //   fetchWorkouts();
  // }, []);

  // const Items = allItems.slice(15, 35);

  return (
    <div>
      <div className="article-main">
        <div className="review-main-component">
          <div className="review-1st">
            <h2>Reviews Forum</h2>
            <p>Check tours reviews, and add a review to any tour </p>
          </div>

          <div className="review-2nd">
            <button onClick={handleShowAllReviews}>Show All Reviews</button>
            <button onClick={handleShowSendReviewForum}>Add a Review</button>
          </div>

          <div className="review-3rd">
            {showSendReviewForum && (
              <div className="component-default-login-signup">
                <Form method="post" action="/forums">
                  <h3>Please choose a tour from the list</h3>
                  <div className="select-drop-down-style-component">
                    <select
                      type="tour"
                      name="tour"
                      className="select-drop-down-style"
                    >
                      {toursNames.map((item, index) => {
                        return (
                          <option key={index} type="tour" name="tour">
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <label>
                    <span>Your Review:</span>
                    <input
                      placeholder="add review"
                      type="review"
                      name="review"
                      required
                    />
                  </label>
                  {user && <button className="button-green">Submit</button>}
                  {!user && (
                    <p>Please login to be able to see the Submit button</p>
                  )}

                  {showPopup && <p>Sending Review was successful</p>}

                  {/* {data && data.error && <p>{data.error}</p>} */}
                </Form>
              </div>
            )}
            {showAllReviews &&
              reviews.Review.map((item) => {
                return (
                  <div className="reviews">
                    <h3>Tour : {item.tour} </h3>
                    <p>Review : {item.review} </p>
                    <p>Client name : {item.user} </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
};

export default ReviewForum;

// data loader
export const ReviewForumPageLoader = async ({}) => {
  const res = await fetch(
    "https://book-tour-api-production.up.railway.app/api/reviews/getuserreviews"
  );

  if (!res.ok) {
    throw Error("Could not find reviews");
  }

  return res.json();
};

export const ReviewForumAction = async ({ request }) => {
  const data = await request.formData();

  const reviewdetails = {
    tour: data.get("tour"),
    review: data.get("review"),
  };

  const datas = await axios.post(
    "https://book-tour-api-production.up.railway.app/api/reviews/addreview",
    {
      reviewdetails,
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
    }
  );

  return datas;
};
