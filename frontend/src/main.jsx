import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router";
import {
  Home,
  Signup,
  Layout,
  Login,
  UserHome,
  Logout,
  AddBlog,
  Blog,
} from "./pages";
import store from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<UserHome />} />
        <Route path="logout" element={<Logout />} />
        <Route path="add-blog" element={<AddBlog />} />
        <Route path=":blogId" element={<Blog />} />
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
);
