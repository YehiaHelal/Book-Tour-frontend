import { useEffect } from "react";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsOnMainPage from "../../components/AllItemsOnMainPage";

const EuropeTours = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://www.rtourbk.shoponlinemarket.cloud/api/tours/"
      );
      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  return (
    <>
      <AllItemsOnMainPage /*props={Itemss}*/ />
      <Footer />
    </>
  );
};

export default EuropeTours;
