import React from "react";
import ReactDOM from "react-dom/client";
import { Messages } from "./views/Messages";
import { Login } from "./views/Login";
import { UserContextProvider } from "./context/userContext";
import "./App.css";

import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
