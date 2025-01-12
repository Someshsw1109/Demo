import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducer/index.js";


const store=configureStore({
  reducer:rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster></Toaster>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
);