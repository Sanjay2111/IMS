import { createRoot } from "react-dom/client"; // Import from react-dom/client
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";


import "./index.css";
import App from "./App";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { userSlice } from "./features/users/userSlice";

const store = configureStore({
  reducer: rootReducer, // Pass your rootReducer to the configureStore function
});

createRoot(document.getElementById("root")).render(
  
  <Provider store={store}>
    <App />
  </Provider>
  
);
