import { createContext, useReducer } from "react";

export const AllItemsFetched = createContext();

// let us have access to createContext
// state is the current value and the action is what change or update or create it
// switch means we have multipe action.type and depending on that action.type the return which changes the state is different
// action.payload is the value we add we try to push something to the context
// and the default will return nothing or just the current state value

export const allItemsFetched = (state, action) => {
  switch (action.type) {
    case "FETCHED-ALL":
      return {
        allItems: action.payload,
      };
    case "ADD_MORE":
      return {
        // items: [action.payload, ...state.items],
        allItems: [action.payload, ...state.items],
      };
    // case "DELETE_ITEM":
    //   return {
    //     items: items.workouts.filter((w) => w._id !== action.payload._id),
    //   };
    default:
      return state;
  }
};

export const AllItemsFetchedProvider = ({ children }) => {
  const [state, dispatcho] = useReducer(allItemsFetched, {
    allItems: [],
  });

  return (
    <AllItemsFetched.Provider value={{ ...state, dispatcho }}>
      {children}
    </AllItemsFetched.Provider>
  );
};
