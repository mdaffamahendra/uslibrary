import { useState } from "react";
import Button from "../Element/Button";
import AsideNavigation from "../Fragment/AsideNavigation";

const PageLayout = ({children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-white via-gray-100 to-gray-50 relative">
      <Button  className={"fixed top-4 left-4 z-50 bg-blue-600 rounded-full shadow-lg lg:hidden w-8 h-8 flex justify-center items-center text-white"} onClick={toggleSidebar}>
        {isSidebarOpen ? "✖" : "☰"}
      </Button>
      <AsideNavigation isSidebarOpen={isSidebarOpen}/>
      {children}
    </div>
  );
}

export default PageLayout;
