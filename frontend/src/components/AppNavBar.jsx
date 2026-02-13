import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppNavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const role = String(user?.role || "").toLowerCase();

  const handleLogout = async () => {
    await logout();
    nav("/login", { replace: true });
  };

  return (
    <Navbar expand="lg" className="mb-4">
      <Container className="shell">
        <div className="glass w-100 px-3 py-2 d-flex align-items-center justify-content-between">
          <Navbar.Brand as={Link} to={role === "admin" ? "/admin" : "/student"} className="fw-semibold title">
            Student/Course System
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="nav" />

          <Navbar.Collapse id="nav" className="ms-3">
            <Nav className="me-auto">
              {role === "student" && (
                <Nav.Link as={Link} to="/student" className="fw-medium">
                  Student
                </Nav.Link>
              )}
              {role === "admin" && (
                <Nav.Link as={Link} to="/admin" className="fw-medium">
                  Admin
                </Nav.Link>
              )}
            </Nav>

            <Nav className="ms-auto align-items-center gap-2">
              <span className="pill">
                {user?.firstName || "User"} · {role}
              </span>
              <Button variant="outline-danger" size="sm" className="btn-soft" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
