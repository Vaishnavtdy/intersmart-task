import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Home, Login, RootLayout } from "./container";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(login());
    }
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
