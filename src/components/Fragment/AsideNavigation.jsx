import { useNavigate } from "react-router-dom"
import Button from "../Element/Button"
import NavbarAside from "../Element/NavbarAside"
import useLogin from "../../hooks/useLogin";
import React from "react";

const AsideNavigation =   React.forwardRef(({ isSidebarOpen }, ref) => {
  const navigate = useNavigate();
  const pustakawanLogin = useLogin();
  
  const handleLogOut = () => {
    localStorage.removeItem("userLoginEmail");
    navigate("/sign-in");

  }
    return (
    <aside ref={ref} className={`z-40 fixed inset-y-0 left-0 w-64 bg-gradient-to-r from-blue-700 to-blue-900 transform ${ isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:relative lg:translate-x-0 text-white`}>
        <div className="p-4 text-center text-xl font-bold border-b border-slate-700">
          UsLibrary
        </div>
        <NavbarAside />
        <div className="p-4 border-t border-slate-700 z-50">
            <Button onClick={handleLogOut}>{pustakawanLogin ? "Logout" : "Login"}</Button>
        </div>
      </aside>
    )

});

export default AsideNavigation