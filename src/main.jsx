import { createRoot } from "react-dom/client"; // Import from react-dom/client
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { AlertCountProvider } from "./contexts/AlertCountContext";

import "./index.css";
import App from "./App";

const store = configureStore({
  reducer: rootReducer, // Pass your rootReducer to the configureStore function
});

createRoot(document.getElementById("root")).render(
  <AlertCountProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </AlertCountProvider>
);
