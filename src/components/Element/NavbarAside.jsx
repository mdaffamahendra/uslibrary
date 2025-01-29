import { Link } from "react-router-dom"

const NavbarAside = () => {
    return (
        <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded hover:bg-slate-700">
          Library
        </Link>
        <Link to="/peminjaman" className="block px-4 py-2 rounded hover:bg-slate-700">
          Peminjaman
        </Link>
        <Link to="/service" className="block px-4 py-2 rounded hover:bg-slate-700">
          Layanan
        </Link>
        <Link to="/event" className="block px-4 py-2 rounded hover:bg-slate-700">
          Event
        </Link>
        <Link to="/profil" className="block px-4 py-2 rounded hover:bg-slate-700">
          My Profile
        </Link>
      </nav>
    )
}

export default NavbarAside