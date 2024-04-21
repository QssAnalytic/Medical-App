import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Hospitals from "@/pages/hospitals";
import Login from "@/pages/login";
import Layout from "./common/components/layout";
import Services from "./pages/services-page";
import Persist from "./common/components/persist";
import useAuthStore from "./services/store/authStore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*"/>
      <Route element={<Persist />}>
        <Route element={<Layout />}>
          <Route index element={<Hospitals />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Route>
      <Route
        index
        path="login"
        element={
          useAuthStore.getState().isAuth !== undefined && useAuthStore.getState().isAuth ? (
            <Navigate to={"/"} replace />
          ) : (
            <Login />
          )
        }
      />
    </Route>,
  ),
);

export { router };
