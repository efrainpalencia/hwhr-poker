import { Link, Outlet } from "react-router";
import logoSrc from "../assets/images/seminole-logo.jpg";
import HamburgerMenu from "../components/HamburgerMenu";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-wrap items-end space-x-4 lg:pl-30 text-white p-4">
        <div>
          <HamburgerMenu onShareApp={() => alert("Next: QR Share Modal")} />
        </div>
        <div>
          <Link to="/">
            <img className="w-12" src={logoSrc} alt="logo" />
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Seminole Tribe of Florida</h1>
        </div>
      </header>
      <main className="grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-sm text-gray-600">© 2024 HWHR Poker</p>
      </footer>
    </div>
  );
}
