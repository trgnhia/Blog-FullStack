import React from "react";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 bg-light d-flex flex-column">
        <TopBar />
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
