import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./common/components/layout";
import Hospitals from "@/pages/hospitals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Hospitals />} />
      <Route path="/services" element={<div>Hello Services</div>} />
    </Route>,
  ),
);

export { router };
