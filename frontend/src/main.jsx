import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router";
import {
  LandingPage,
  Signup,
  Login,
  Dashboard,
  Logout,
  AddBlog,
  Blog,
  UserLayout,
  NotFound,
  EditBlog,
  DeleteBlog,
  SitePolicy,
  TermsOfService,
} from "./pages";
import store from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user" element={<UserLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="logout" element={<Logout />} />
        <Route path="blog/add" element={<AddBlog />} />
        <Route path="blog/edit/:blogId" element={<EditBlog />} />
        <Route path="blog/delete/:blogId" element={<DeleteBlog />} />
        <Route path=":blogId" element={<Blog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/privacy-policy" element={<SitePolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
