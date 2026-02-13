import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Row, Col, Table, Badge } from "react-bootstrap";
import { api } from "../api/client";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [courseId, setCourseId] = useState("");
  const [section, setSection] = useState("");

  const loadMyCourses = async () => {
    setErr("");
    setMsg("");
    try {
      const res = await api.get("/api/student/courses");
      setCourses(res.data || []);
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to load courses.");
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  const enroll = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post("/api/student/courses/enroll", { courseId, section });
      setMsg("Course added successfully.");
      setCourseId("");
      setSection("");
      await loadMyCourses();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to add course.");
    }
  };

  const updateSection = async (id) => {
    setErr("");
    setMsg("");
    try {
      await api.patch(`/api/student/courses/${id}`, { section });
      setMsg("Course updated.");
      setSection("");
      await loadMyCourses();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to update course.");
    }
  };

  const drop = async (id) => {
    setErr("");
    setMsg("");
    try {
      await api.delete(`/api/student/courses/${id}`);
      setMsg("Course dropped.");
      await loadMyCourses();
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to drop course.");
    }
  };

  return (
    <div className="page-wrap">
      <Container className="shell">
        <Row className="g-3 align-items-stretch">
          <Col lg={4}>
            <Card className="card-soft h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <div className="pill">Student</div>
                    <h4 className="fw-semibold title mt-2 mb-0">Manage Courses</h4>
                    <div className="muted small mt-1">Add a course or update your section.</div>
                  </div>
                </div>

                {msg && <Alert variant="success">{msg}</Alert>}
                {err && <Alert variant="danger">{err}</Alert>}

                <Form onSubmit={enroll}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Course ID</Form.Label>
                    <Form.Control
                      className="input-soft"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      placeholder="Paste courseId"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Section</Form.Label>
                    <Form.Control
                      className="input-soft"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      placeholder="e.g., 001"
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 btn-soft" size="lg">
                    Add Course
                  </Button>

                  <div className="muted small mt-3">
                    Use the Section box above, then click Update Section on a course row.
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="card-soft h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <h4 className="fw-semibold title mb-1">My Courses</h4>
                    <div className="muted">All courses currently enrolled.</div>
                  </div>
                  <Button variant="outline-secondary" className="btn-soft" onClick={loadMyCourses}>
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
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="muted">
                            No courses yet.
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
                            <td className="text-end">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="btn-soft me-2"
                                onClick={() => updateSection(c._id)}
                              >
                                Update
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="btn-soft"
                                onClick={() => drop(c._id)}
                              >
                                Drop
                              </Button>
                            </td>
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
