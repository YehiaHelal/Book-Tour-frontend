import { createContext, useEffect, useReducer } from "react";

export const ItemsContext = createContext();

// let us have access to createContext
// state is the current value and the action is what change or update or create it
// switch means we have multipe action.type and depending on that action.type the return which changes the state is different
// action.payload is the value we add we try to push something to the context
// and the default will return nothing or just the current state value

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEM":
      return {
        items: action.payload,
      };
    case "ADD":
      return {
        // items: [action.payload, ...state.items],
        items: [action.payload, ...state.items],
      };

    // case "DELETE_ITEM":
    //   return {
    //     items: items.workouts.filter((w) => w._id !== action.payload._id),
    //   };
    default:
      return state;
  }
};

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    items: [],
  });

  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
