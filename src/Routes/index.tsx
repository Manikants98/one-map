import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Loader from "../Shared/Loader";

interface RouteType {
  id: number;
  path: string;
  element: React.ReactNode;
}

const routes: RouteType[] = [
  {
    id: 1,
    path: "/",
    element: <Home />,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Router>
          <Route element={<Layout />}>
            {routes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
          </Route>
        </Router>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
