import { Outlet } from "react-router-dom";
import RouteSeo from "../components/seo/RouteSeo";

export default function AuthLayout() {
  return (
    <>
      <RouteSeo />
      <Outlet />
    </>
  );
}