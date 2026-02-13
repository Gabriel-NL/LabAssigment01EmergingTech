import { useState } from "react";
import { Alert, Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const data = await login(studentNumber.trim(), password);
      const role = String(data?.role || "").toLowerCase();
      if (role === "admin") nav("/admin", { replace: true });
      else nav("/student", { replace: true });
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-wrap">
      <Container className="shell">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="mb-4 text-center">
              <h1 className="display-6 fw-semibold title mb-2">Welcome back</h1>
              <div className="muted">Students and Admin can sign in with their credentials.</div>
            </div>

            <Card className="card-soft">
              <Card.Body className="p-4 p-md-5">
                {err && <Alert variant="danger">{err}</Alert>}

                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Student Number</Form.Label>
                    <Form.Control
                      className="input-soft"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      placeholder="e.g., 301234567 or admin001"
                      autoComplete="username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <Form.Control
                      className="input-soft"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </Form.Group>

                  <Button type="submit" disabled={busy} className="w-100 btn-soft" size="lg">
                    {busy ? "Signing in..." : "Sign in"}
                  </Button>

                  <div className="muted small mt-3">
                    Admin accounts will be redirected to the Admin Dashboard automatically.
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
