// import { useItemsCartContext } from "../../hooks/useItemsCartContext";
// import Footer from "../footer/Footer";

// const FavouriteItems = () => {
//   const { items, dispatch } = useItemsCartContext();

//   return (
//     <div>
//       <div className="favourite-items-notice">
//         <p>
//           please login to add items to your favourite items or view your
//           favourite items
//         </p>

//         <div className="article-main">
//           <div className="item-default">
//             {items &&
//               items.map((item) => {
//                 return (
//                   <div className="box" key={item._id}>
//                     <img
//                       src={require(`./../../img/products/${item.image}`)}
//                       alt="imageos"
//                     ></img>
//                     <p className="name">{item.name}</p>
//                     <p className="price">{item.price}</p>
//                     <button
//                     // data={item}
//                     // onClick={() => {
//                     //   const itemss = item;
//                     //   // dispatch({ type: "ADD", payload: itemss });
//                     // }}
//                     >
//                       Order
//                     </button>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </div>

//       <div className="at-the-end">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default FavouriteItems;
