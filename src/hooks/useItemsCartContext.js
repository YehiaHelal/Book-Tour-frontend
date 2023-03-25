import { ItemsContext } from "../context/ItemsContextCart";
import { useContext } from "react";

export const useItemsCartContext = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
