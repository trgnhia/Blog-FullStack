import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar: React.FC = () => {
  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: 200, height: "100vh", position: "sticky", top: 0 }}
    >
      <div className="mb-4">
        <span className="fs-4 fw-bold">Admin Site</span>
      </div>

      <Nav className="flex-column gap-2">
        <Nav.Link className="text-white active bg-secondary rounded px-3 py-2">
          Dashboard
        </Nav.Link>
      </Nav>

      <div className="mt-auto pt-3 border-top border-secondary small">
        <div>Logged in as</div>
        <strong>Admin</strong>
      </div>
    </div>
  );
};

export default Sidebar;
