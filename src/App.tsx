import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { Toaster } from "./common/components/ui/toaster";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
