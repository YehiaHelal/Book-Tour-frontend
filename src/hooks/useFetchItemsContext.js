import { AllItemsFetched } from "../context/AllItemsFetched";
import { useContext } from "react";

export const useFetchItemsContext = () => {
  const context = useContext(AllItemsFetched);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
