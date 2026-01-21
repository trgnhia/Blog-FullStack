import React from "react";
import { Navbar, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const TopBar: React.FC = () => {
  const {logOut} = useAuth();
  return (
    <Navbar
      bg="white"
      className="px-3 py-2 border-bottom d-flex justify-content-between"
    >
      <div>
        <span className="text-muted">Dashboard</span>
        <span className="mx-1">/</span>
        <NavLink to="/">
          <strong>Home</strong>
        </NavLink>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Form className="d-none d-md-block">
          <InputGroup size="sm">
            <FormControl placeholder="Search..." />
          </InputGroup>
        </Form>

        {/* Click avatar/name => dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            as="div"
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <div
              className="rounded-circle bg-secondary"
              style={{ width: 32, height: 32 }}
            />
            <div className="d-flex flex-column">
              <span className="small fw-semibold">Tran Nghia</span>
              <span className="small text-muted">Admin</span>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Account</Dropdown.Header>
            <Dropdown.Item disabled>Profile (coming soon)</Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item
              className="text-danger"
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default TopBar;
