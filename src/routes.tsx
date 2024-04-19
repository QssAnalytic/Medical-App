import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Hospitals from "@/pages/hospitals";
import Login from "@/pages/login";
import Layout from "./common/components/layout"; // Layout bileşenini buraya dahil ediyoruz
import Services from "./pages/services-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route index element={<Hospitals />} />
        <Route path="/services" element={<Services />} />
      </Route>,
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export { router };