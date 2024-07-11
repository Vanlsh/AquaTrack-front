import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout/SharedLayout.jsx";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing } from "../redux/auth/selectors.js";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b> Loader... (refreshing user)</b>  //! add Loader
  ) : (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={<RestrictedRoute component={<SignUpPage />} />}
        />

        <Route
          path="/signin"
          redirectTo="/tracker"
          element={<RestrictedRoute component={<SignInPage />} />}
        />

        <Route
          path="/tracker"
          element={
            <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
