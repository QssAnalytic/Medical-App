import { Outlet } from "react-router-dom";
import Filter from "../filter";

export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="header-container p-8">
          <div className="header-inner">
            <Filter />
          </div>
        </div>
      </header>
      <main className="main">
        <div className="main-container px-8">
          <div className="main-inner">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
