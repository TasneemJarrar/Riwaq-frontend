import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import RouteSeo from "../components/seo/RouteSeo";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <RouteSeo />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
