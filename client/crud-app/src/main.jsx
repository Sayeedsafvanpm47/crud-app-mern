import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'




ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <ChakraProvider>
      <App/>
      </ChakraProvider>
   
      </BrowserRouter>
    
    </React.StrictMode>
  </Provider>
);
