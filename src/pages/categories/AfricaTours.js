import { useEffect } from "react";
import AllItemsOnMainPage from "../../components/AllItemsOnMainPage";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsComponent from "./AllItems";

const AfricaTours = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

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

  // const Itemss = allItems.slice(5, 25);

  return (
    <>
      <AllItemsOnMainPage /*props={Itemss}*/ />
      <Footer />
    </>
  );
};

export default AfricaTours;
