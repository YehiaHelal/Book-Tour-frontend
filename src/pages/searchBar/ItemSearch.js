import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";

export default function ItemSearch() {
  const { id } = useParams();
  const item = useLoaderData();

  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart

  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("bookingItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          //     console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          //     console.log("we are dealing with duplicate");
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
            //    console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          //   console.log(filteringanyextra);

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

  return (
    <div>
      <div className="article-main-item-search">
        <div className="item-default-On-Main-Page">
          <div className="box" key={item._id}>
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

              <a href={"https://book-tour-frontend.vercel.app/" + item._id}>
                <button>More Details</button>
              </a>
              <p className="rating">Rating: {item.ratingsAverage}</p>
              <button
                // data={item}
                onClick={() => {
                  // const itemss = item;
                  const numberofitemforvalue = JSON.parse(
                    localStorage.getItem("bookingItems")
                  );

                  setaddItemToCart(item);
                  setChangeValue(numberofitemforvalue.length + 1);
                }}
              >
                Add to Booking
              </button>
            </div>
          </div>
          <div>
            <div className="tour-details">
              <p>Tour Full Description:</p>
              <p>Tour Name: {item.name}</p>
              <p>Duration: {item.duration} Day Tour</p>
              <p>Max Group Size: {item.maxGroupSize}</p>
              <p>Difficulty for newcomers: {item.difficulty}</p>
              <p>Summary: {item.summary}</p>
            </div>

            <p className="full-description">
              Full Tour Description: {item.description}
            </p>
          </div>
        </div>
      </div>

      <div className="at-the-end-item-search">
        <Footer />
      </div>
    </div>
  );
}

// data loader
export const itemSearchLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("https://tourapi-x6d5.onrender.com/api/tours/" + id);

  if (!res.ok) {
    throw Error("Could not find that item");
  }

  return res.json();
};
