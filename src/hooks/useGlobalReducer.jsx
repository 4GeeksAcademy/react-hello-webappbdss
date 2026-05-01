// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throughout all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const actions = {
        setPeople: (data) => dispatch({ type: "set_people", payload: data }),
        setPlanets: (data) => dispatch({ type: "set_planets", payload: data }),
        setVehicles: (data) => dispatch({ type: "set_vehicles", payload: data }),
        addFavorite: (item) => dispatch({ type: "add_favorite", payload: item }),
        removeFavorite: (item) => dispatch({ type: "remove_favorite", payload: item }),
        addTask: (payload) => dispatch({ type: "add_task", payload }),
    };
    // Provide the store, dispatch and actions to all child components.
    return <StoreContext.Provider value={{ store, dispatch, actions }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    return useContext(StoreContext);
}