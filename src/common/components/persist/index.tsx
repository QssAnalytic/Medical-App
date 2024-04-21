import useAuthStore from "@/services/store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../spinner";

export default function Persist() {
  const { isAuth, isUserLoading } = useAuthStore();
  if (isAuth === undefined || isUserLoading) return <Spinner />;
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
