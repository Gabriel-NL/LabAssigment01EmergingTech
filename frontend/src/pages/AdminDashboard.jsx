import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Row, Col, Table, Badge } from "react-bootstrap";
import { api } from "../api/client";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [roster, setRoster] = useState([]);
  const [courseIdForRoster, setCourseIdForRoster] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    favoriteTopic: "",
    strongestSkill: "",
    address: "",
    city: "",
    phone: "",
  });

  const loadStudents = async () => {
    const res = await api.get("/api/admin/students");
    setStudents(res.data || []);
  };

  const loadCourses = async () => {
    const res = await api.get("/api/admin/courses");
    setCourses(res.data || []);
  };

  const loadRoster = async () => {
    if (!courseIdForRoster.trim()) return;
    const res = await api.get(`/api/admin/courses/${courseIdForRoster}/students`);
    setRoster(res.data || []);
  };

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([loadStudents(), loadCourses()]);
      } catch (ex) {
        setErr(ex?.response?.data?.message || "Failed to load admin data.");
      }
    })();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post("/api/admin/students", form);
      setMsg("Student added.");
      setForm({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        program: "",
        favoriteTopic: "",
        strongestSkill: "",
        address: "",
        city: "",
        phone: "",
      });
      await loadStudents();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to add student.");
    }
  };

  return (
    <div className="page-wrap">
      <Container className="shell">
        <Row className="g-3">
          <Col lg={5}>
            <Card className="card-soft">
              <Card.Body className="p-4">
                <div className="pill mb-2">Admin</div>
                <h4 className="fw-semibold title mb-1">Student Management</h4>
                <div className="muted mb-3">Create new students and review enrollments.</div>

                {msg && <Alert variant="success">{msg}</Alert>}
                {err && <Alert variant="danger">{err}</Alert>}

                <Form onSubmit={addStudent}>
                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Student #</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.studentNumber}
                          onChange={(e) => setForm({ ...form, studentNumber: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Password</Form.Label>
                        <Form.Control
                          className="input-soft"
                          type="password"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">First Name</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Last Name</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Email</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Program</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.program}
                          onChange={(e) => setForm({ ...form, program: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Favorite Topic</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.favoriteTopic}
                          onChange={(e) => setForm({ ...form, favoriteTopic: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Strongest Skill</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.strongestSkill}
                          onChange={(e) => setForm({ ...form, strongestSkill: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">Address</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="fw-medium">City</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-medium">Phone</Form.Label>
                        <Form.Control
                          className="input-soft"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" className="w-100 btn-soft" size="lg">
                    Create Student
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="card-soft mb-3">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <h4 className="fw-semibold title mb-1">Students</h4>
                    <div className="muted">All registered students.</div>
                  </div>
                  <Button variant="outline-secondary" className="btn-soft" onClick={loadStudents}>
                    Refresh
                  </Button>
                </div>

                <div className="mt-3">
                  <Table responsive hover className="table-soft mb-0">
                    <thead>
                      <tr>
                        <th>Student #</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Program</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="muted">
                            No students.
                          </td>
                        </tr>
                      ) : (
                        students.map((s) => (
                          <tr key={s._id}>
                            <td className="fw-semibold">{s.studentNumber}</td>
                            <td>
                              {s.firstName} {s.lastName}
                            </td>
                            <td className="muted">{s.email}</td>
                            <td>
                              <Badge bg="secondary" pill>
                                {s.program || "N/A"}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <Card className="card-soft">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <h4 className="fw-semibold title mb-1">Courses</h4>
                    <div className="muted">All available courses.</div>
                  </div>
                  <Button variant="outline-secondary" className="btn-soft" onClick={loadCourses}>
                    Refresh
                  </Button>
                </div>

                <div className="mt-3">
                  <Table responsive hover className="table-soft mb-0">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="muted">
                            No courses.
                          </td>
                        </tr>
                      ) : (
                        courses.map((c) => (
                          <tr key={c._id}>
                            <td className="fw-semibold">{c.courseCode}</td>
                            <td>{c.courseName}</td>
                            <td>
                              <Badge bg="primary" pill>
                                {c.section || "N/A"}
                              </Badge>
                            </td>
                            <td className="muted">{c.semester}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>

                <hr className="my-4" />

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <div className="fw-semibold">Students taking a specific course</div>
                    <div className="muted small">Enter a courseId to load the roster.</div>
                  </div>
                </div>

                <Form className="d-flex gap-2 mt-2" onSubmit={(e) => { e.preventDefault(); loadRoster(); }}>
                  <Form.Control
                    className="input-soft"
                    value={courseIdForRoster}
                    onChange={(e) => setCourseIdForRoster(e.target.value)}
                    placeholder="Paste courseId"
                  />
                  <Button type="submit" className="btn-soft">
                    View
                  </Button>
                </Form>

                <div className="mt-3">
                  <Table responsive hover className="table-soft mb-0">
                    <thead>
                      <tr>
                        <th>Student #</th>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roster.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="muted">
                            No roster loaded.
                          </td>
                        </tr>
                      ) : (
                        roster.map((s) => (
                          <tr key={s._id}>
                            <td className="fw-semibold">{s.studentNumber}</td>
                            <td>
                              {s.firstName} {s.lastName}
                            </td>
                            <td className="muted">{s.email}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
