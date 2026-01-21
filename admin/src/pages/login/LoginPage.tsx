import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthenticated, status} = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  if (status === "authenticated") {
    return <Navigate to="/" replace/>
  }

  // handle submit button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/auth/login", {email, password}, {withCredentials: true});  
      const newAccessToken = res.data?.accessToken;
      if (newAccessToken) {
        setAuthenticated(newAccessToken);
        navigate("/", {replace: true});
      } else {
        setErrorMsg("Login failed: access token missing.");
        return;
      }
    } catch(err: any) {
      const errStatusCode = err?.response?.status;
      console.log(errStatusCode);
      if (errStatusCode === 401 || errStatusCode === 403 ) {
        setErrorMsg("Wrong email or password, try again");
      } else if (errStatusCode === 400) {
        setErrorMsg("Invalid Credentials");
      } else {
        setErrorMsg("Something wrong happen, try again");
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f5f6fa" }}
    >
      <Card style={{ width: 380 }} className="shadow-sm">
        <Card.Body>
          <h4 className="text-center mb-4">Admin Login</h4>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
            >
             Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};


export default LoginPage;
