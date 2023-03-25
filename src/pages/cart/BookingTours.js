import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const BookingTours = () => {
  const { user, dispatchUser } = useAuthContext();
  const { items, dispatch } = useItemsCartContext();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [placeOrderButton, setPlaceOrderButton] = useState(false);
  const [hideOrderButton, setHideOrderButton] = useState(false);

  //
  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  // useEffect(() => {}, [duplicateItemDealWith]);

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("bookingItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          // console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          // console.log("we are dealing with duplicate");
          //dealing with the duplicate
          // const ItemIncresedNumberofItems = checkforduplicatefilter.map(
          //   (item) => {
          //     item.numberofitem += 1;
          //     return item;
          //   }
          // );

          const ItemIncresedNumberofItems = checkforduplicatefilter.map(
            (item) => {
              item.numberofitem += 1;
              return item;
            }
          );
          // ItemIncresedNumberofItems

          // filtering the duplicated in the local storage and just keeping one

          const filteringanyextra = localStoragecurrentItems.filter((item) => {
            // console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          // console.log(filteringanyextra);

          dispatch({ type: "ADD", payload: ItemIncresedNumberofItems[0] });

          const mergedArray = [
            ...filteringanyextra,
            ItemIncresedNumberofItems[0],
          ];

          localStorage.setItem("bookingItems", JSON.stringify(mergedArray));
        }, 500);
      } else {
        dispatch({ type: "ADD", payload: addItemToCart });

        const mergedArray = [...localStoragecurrentItems, addItemToCart];

        localStorage.setItem("bookingItems", JSON.stringify(mergedArray));
      }

      // if (checkforduplicatefilter) {
      //   setDuplicateItemDealWith(checkforduplicatefilter);
      // }
      // console.log(addItemToCart);
      // console.log("we are inside");

      // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
      // up to date.
      // const ToLocalStorageitems = JSON.parse(
      //   localStorage.getItem("bookingItems")
      // );
    }
  }, [addItemToCart, changeValue]);

  //

  function handlesetPlaceOrderButton() {
    setPlaceOrderButton(true);
  }

  let itemQuantityOneChecking;
  let addingFilterstepone;
  let addingFiltersteptwo;
  let newFilteredTargetItem;

  let filteredTargetItem;

  // console.log(items);

  // removing onclick item from the cart selected. and re-rendering the page fast
  let filterstepone;
  let filtersteptwo;

  const bookingItemsSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("bookingItems")
  );

  // to get all the products name in an array
  const orderProductsNameArray = bookingItemsSavedFromLocalStorage.map(
    (item) => item.name
  );

  const numberOfItems = bookingItemsSavedFromLocalStorage.map((item) => [
    item.numberofitem,
  ]);

  // to get all the products values and sums them
  const orderTotalvalueArray = bookingItemsSavedFromLocalStorage.map(
    (item) => item.price * item.numberofitem
  );
  const orderTotalvalue = orderTotalvalueArray.reduce((a, b) => a + b, 0);

  const OrderDetails = {
    orderProducts: [...orderProductsNameArray],
    orderTotalValue: orderTotalvalue,
    numberofitems: [...numberOfItems],
  };

  function handleShowPopup() {
    setShowPopup(true);
  }

  // to send the order place on the backend
  const BookingFunctionHandler = async () => {
    // fetch request and if ok the cookie will be removed
    const response = await axios.post(
      "https://book-tour-api-production.up.railway.app/api/orders/cartorder",
      { OrderDetails },
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
    // console.log(response);

    if ((response.data.status = 200)) {
      handleShowPopup();
      setHideOrderButton(true);

      // console.log("order placed and redirecting");

      setTimeout(() => {
        localStorage.removeItem("bookingItems");
        navTo("/");
      }, 2000);
    }
  };

  return (
    <div>
      <div className="article-main">
        <div className="cart-page-main-cart">
          <div className="item-default-On-Main-Page-cart">
            {bookingItemsSavedFromLocalStorage &&
              bookingItemsSavedFromLocalStorage.map((item) => {
                return (
                  <div className="box-cart" key={item._id}>
                    <img
                      src={require(`./../../img/tours/${item.imageCover}`)}
                      alt="imageos"
                    ></img>
                    <h3 className="name">
                      {item.name} {/* can be big and in the center */}{" "}
                    </h3>
                    <h4 className="duration">
                      {item.difficulty} {item.duration}-Day Tour{" "}
                      {/* can be big and in the center */}{" "}
                    </h4>
                    <h5 className="summary">
                      {item.summary} {/* can be big and in the center */}{" "}
                    </h5>

                    <div>
                      <p className="h5-normal">
                        Location: {item.startLocation.description}{" "}
                      </p>
                      <p className="h5-normal">Date: July 2023</p>
                    </div>
                    <div className="side-by-side-text">
                      <p>{item.locations.length} Stops</p>
                      <p>Group size: {item.maxGroupSize}</p>
                    </div>

                    <div className="side-by-side-text-up-down">
                      <p className="price">Price: ${item.price}</p>

                      <p className="rating">Rating: {item.ratingsAverage}</p>
                      <p>Bookings Number: {item.numberofitem}</p>
                      <p></p>
                      <button
                        onClick={() => {
                          addingFilterstepone = JSON.parse(
                            localStorage.getItem("bookingItems")
                          );
                          addingFiltersteptwo = addingFilterstepone.filter(
                            (newCart) => newCart._id !== item._id
                          );

                          filteredTargetItem = addingFilterstepone.filter(
                            (newCart) => newCart._id === item._id
                          );

                          newFilteredTargetItem = filteredTargetItem.map(
                            (item) => {
                              item.numberofitem = item.numberofitem - 1;
                              return item;
                            }
                          );

                          [itemQuantityOneChecking] = [
                            ...newFilteredTargetItem,
                          ];

                          // console.log(itemQuantityOneChecking.numberofitem);

                          if (itemQuantityOneChecking.numberofitem >= 1) {
                            const mergedArray2 = [
                              ...addingFiltersteptwo,
                              ...newFilteredTargetItem,
                            ];
                            // console.log(mergedArray2);

                            localStorage.setItem(
                              "bookingItems",
                              JSON.stringify(mergedArray2)
                            );

                            dispatch({
                              type: "SET_ITEM",
                              payload: mergedArray2,
                            });
                          }

                          if (itemQuantityOneChecking.numberofitem < 1) {
                            // console.log("we can't subtract more");

                            filterstepone = JSON.parse(
                              localStorage.getItem("bookingItems")
                            );

                            // console.log(filterstepone);
                            filtersteptwo = filterstepone.filter(
                              (newCart) => newCart._id !== item._id
                            );
                            localStorage.setItem(
                              "bookingItems",
                              JSON.stringify(filtersteptwo)
                            );
                            // setMyCategorya([...filtersteptwo]);

                            dispatch({
                              type: "SET_ITEM",
                              payload: filtersteptwo,
                            });
                            // console.log(items);
                          }
                          // localStorage.setItem(
                          //   "bookingItems",
                          //   JSON.stringify(filtersteptwo)
                          // );
                          // setMyCategorya([...filtersteptwo]);

                          // console.log(items);
                          //   localStorage.setItem(
                          //     "bookingItems",
                          //     JSON.stringify(addingFiltersteptwo)
                          //   );
                          //   // setMyCategorya([...filtersteptwo]);

                          //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                          //   // console.log(items);
                        }}
                      >
                        -1
                      </button>
                      <button
                        onClick={() => {
                          addingFilterstepone = JSON.parse(
                            localStorage.getItem("bookingItems")
                          );
                          addingFiltersteptwo = addingFilterstepone.filter(
                            (newCart) => newCart._id !== item._id
                          );

                          filteredTargetItem = addingFilterstepone.filter(
                            (newCart) => newCart._id === item._id
                          );

                          newFilteredTargetItem = filteredTargetItem.map(
                            (item) => {
                              item.numberofitem = item.numberofitem + 1;
                              return item;
                            }
                          );

                          // localStorage.setItem(
                          //   "bookingItems",
                          //   JSON.stringify(filtersteptwo)
                          // );
                          // setMyCategorya([...filtersteptwo]);

                          const mergedArray2 = [
                            ...addingFiltersteptwo,
                            ...newFilteredTargetItem,
                          ];
                          // console.log(mergedArray2);

                          localStorage.setItem(
                            "bookingItems",
                            JSON.stringify(mergedArray2)
                          );

                          dispatch({
                            type: "SET_ITEM",
                            payload: mergedArray2,
                          });
                          // console.log(items);
                          //   localStorage.setItem(
                          //     "bookingItems",
                          //     JSON.stringify(addingFiltersteptwo)
                          //   );
                          //   // setMyCategorya([...filtersteptwo]);

                          //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                          //   // console.log(items);
                        }}

                        //   const numberofitemforvalue = JSON.parse(
                        //     localStorage.getItem("bookingItems")
                        //   );

                        //   setaddItemToCart(item);
                        //   setChangeValue(numberofitemforvalue.length + 1);
                        // }}
                      >
                        +1
                      </button>
                      <a
                        href={
                          "https://book-tour-frontend-production.up.railway.app/" +
                          item._id
                        }
                      >
                        <button>More Details</button>
                      </a>

                      <button
                        className="remove-item-cart-button"
                        key={item}
                        onClick={() => {
                          // setMyCategory(item._id);

                          filterstepone = JSON.parse(
                            localStorage.getItem("bookingItems")
                          );
                          filtersteptwo = filterstepone.filter(
                            (newCart) => newCart._id !== item._id
                          );
                          localStorage.setItem(
                            "bookingItems",
                            JSON.stringify(filtersteptwo)
                          );
                          // setMyCategorya([...filtersteptwo]);

                          dispatch({
                            type: "SET_ITEM",
                            payload: filtersteptwo,
                          });
                          // console.log(items);
                        }}

                        // data={item}
                        // onClick={() => {
                        //   const itemss = item;
                        //   // dispatch({ type: "ADD", payload: itemss });
                        // }}
                      >
                        Remove tour
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-page-rightSide-order-details">
            <p>Order Details: </p>
            <p>Order total price: {orderTotalvalue}$ </p>

            {!user && <p>To place the order please login</p>}
            {handlesetPlaceOrderButton}

            {placeOrderButton && (
              <p>Please add a tour first to be able to place the order</p>
            )}

            {bookingItemsSavedFromLocalStorage.length === 0 && (
              <div>
                <p>Please add a tour first to book it</p>
              </div>
            )}

            {user &&
              !hideOrderButton &&
              bookingItemsSavedFromLocalStorage.length > 0 && (
                <button onClick={BookingFunctionHandler}>
                  Place your order
                </button>
              )}
            {showPopup && <p>Order was placed, Redirecting in 2 second...</p>}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
};

export default BookingTours;
