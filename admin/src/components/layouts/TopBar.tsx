import React from "react";
import { Navbar, Form, FormControl, InputGroup } from "react-bootstrap";

const TopBar: React.FC = () => {
  return (
    <Navbar
      bg="white"
      className="px-3 py-2 border-bottom d-flex justify-content-between"
    >
      <div>
        <span className="text-muted">Dashboard</span>
        <span className="mx-1">/</span>
        <strong>Home</strong>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Form className="d-none d-md-block">
          <InputGroup size="sm">
            <FormControl placeholder="Search..." />
          </InputGroup>
        </Form>

        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle bg-secondary"
            style={{ width: 32, height: 32 }}
          />
          <div className="d-flex flex-column">
            <span className="small fw-semibold">Derek Alvarado</span>
            <span className="small text-muted">Admin</span>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default TopBar;
