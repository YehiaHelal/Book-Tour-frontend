import { useItemsCartContext } from "../hooks/useItemsCartContext";
import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useEffect, useState } from "react";

const AllItemsOnMainPage = (props) => {
  const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart
  const [dropDown, setDropDown] = useState(false);

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

  // const firstTen = props.props;

  let emptyarray = [];
  if (!localStorage.getItem("bookingItems")) {
    localStorage.setItem("bookingItems", JSON.stringify(emptyarray));
  }

  // const [value, setValue] = useState(0); // integer state
  const [ItemsShowen0, setItemsShowen] = useState([]); // integer state

  // const { showedItems, setShowedItems } = useState();
  // const changeShowedItemsdata = (item) => {
  //   setShowedItems(item.slice(10, 20));
  // };

  useEffect(() => {
    setItemsShowen((ItemsShowen0) => allItems.slice(0, 6));
  }, [allItems]);

  function handleSortPlh() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }
  function handleSortPhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handlerSetNormal() {
    const sortedData = [...allItems].slice(0, 9);

    setItemsShowen(sortedData);
  }

  function handleSortDhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handleDropDown() {
    setDropDown(true);
  }

  function handleDropDownReset() {
    setDropDown(false);
  }

  // request a currency format
  // console.log(number.toLocaleString('en-us', { month: 'currency', year: 'EUR' }));
  // // → 123.456,79 €

  // // the Japanese yen doesn't use a minor unit
  // console.log(number.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }))

  // const addingToLocalStorage = JSON.parse(localStorage.getItem("bookingItems"));

  // console.log(addingToLocalStorage);

  // when u write from 0 to 10 , the first index is at 0 and the 10 item is at 9 index , and starting from 0 index so total 10
  // const newData1 = allItems.slice(0, 10);
  // console.log(newData1);
  // const newData2 = allItems.slice(10, 20);
  // console.log(newData2);

  // <div>
  //       <div className="sorting-icons">
  //         <button onClick={handleSortPhl}>
  //           Sort from high price to low price{" "}
  //         </button>
  //         <button onClick={handleSortPlh}>
  //           Sort from low price to high price
  //         </button>
  //         <button onClick={handleSortDhl}>Sort from newest to oldest</button>
  //         <button onClick={handlerSetNormal}>Sort back to normal</button>
  //       </div>
  //     </div>

  return (
    <div>
      <div className="sorting-main">
        {!dropDown && (
          <button onClick={handleDropDown}>Sorting & Filters</button>
        )}

        {dropDown && (
          <div className="sorting-icons">
            <button onClick={handleSortPhl}>
              Sort from high price to low price{" "}
            </button>
            <button onClick={handleSortPlh}>
              Sort from low price to high price
            </button>
            <button onClick={handleSortDhl}>Sort from Newest to Oldest</button>
            <button onClick={handlerSetNormal}>Sort back to normal</button>
            <button onClick={handleDropDownReset}>Click to hide</button>
          </div>
        )}
      </div>
      <div className="item-default-On-Main-Page">
        {ItemsShowen0 &&
          ItemsShowen0.map((item) => {
            return (
              <div className="box" key={item._id}>
                <img
                  src={require(`./../img/tours/${item.imageCover}`)}
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

                  <a
                    href={
                      "https://book-tour-frontend-production.up.railway.app/" +
                      item._id
                    }
                  >
                    <button>More Details</button>
                  </a>
                  <p className="rating">Rating: {item.ratingsAverage}</p>
                  <button
                    // data={item}
                    onClick={() => {
                      // const itemss = item;
                      // const itemssId = item._id;

                      const numberofitemforvalue = JSON.parse(
                        localStorage.getItem("bookingItems")
                      );

                      setChangeValue(numberofitemforvalue.length + 1);
                      setaddItemToCart(item);

                      // const localStoragecurrentItems = JSON.parse(
                      //   localStorage.getItem("bookingItems")
                      // );

                      // console.log(checkforduplicatefilter);

                      // setaddItemToCart()

                      // if (checkforduplicatefilter === [null]) {
                      // }

                      // dispatchoo({ type: "SET_TO_TRUE", payload: true });
                    }}
                  >
                    Add To Booking
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="button-instead-of-scrolling">
        <div>Page</div>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(0, 10));
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(3, 20));
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(4, 30));
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(5, 40));
          }}
        >
          4
        </button>
      </div>
    </div>
  );
};

export default AllItemsOnMainPage;
