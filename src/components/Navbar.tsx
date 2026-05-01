import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f2e8dc]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-semibold tracking-[0.15em] text-[#02101f]">
          HOLIDAZE
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-[#02101f]">
          <Link to="/">Stays</Link>
          <Link to="/login">Login</Link>
          <Link
            to="/register"
            className="rounded-full bg-[#02101f] px-4 py-2 text-white transition hover:bg-[#162036]"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;