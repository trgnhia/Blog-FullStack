import React from "react";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Title + button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Dashboard</h3>
          <p className="text-muted mb-0">
            Overview of your blog performance and recent activity.
          </p>
        </div>
        <Button variant="primary">+ New Blog</Button>
      </div>

      {/* Stats cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Total Blogs</Card.Title>
              <Card.Text className="display-6 fw-bold">128</Card.Text>
              <small className="text-success">+12 this week</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Published</Card.Title>
              <Card.Text className="display-6 fw-bold">96</Card.Text>
              <small className="text-muted">Live on website</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Drafts</Card.Title>
              <Card.Text className="display-6 fw-bold">32</Card.Text>
              <small className="text-warning">Need review</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent blogs table */}
      <Row className="g-3">
        <Col lg={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Recent Blogs</span>
              <Button variant="outline-secondary" size="sm">
                View all
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Tags</th>
                    <th>Updated</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Getting started with Next.js</td>
                    <td>Alice</td>
                    <td>
                      <Badge bg="secondary" className="me-1">
                        nextjs
                      </Badge>
                      <Badge bg="secondary">javascript</Badge>
                    </td>
                    <td>2025-01-01</td>
                    <td>
                      <Badge bg="success">Published</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Styling with Tailwind CSS</td>
                    <td>Bob</td>
                    <td>
                      <Badge bg="secondary" className="me-1">
                        css
                      </Badge>
                      <Badge bg="secondary">tailwind</Badge>
                    </td>
                    <td>2025-01-02</td>
                    <td>
                      <Badge bg="warning" text="dark">
                        Draft
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Building an admin dashboard</td>
                    <td>Charlie</td>
                    <td>
                      <Badge bg="secondary" className="me-1">
                        react
                      </Badge>
                      <Badge bg="secondary">admin</Badge>
                    </td>
                    <td>2025-01-03</td>
                    <td>
                      <Badge bg="success">Published</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right side: small card */}
        <Col lg={4}>
          <Card className="mb-3">
            <Card.Header>
              <span className="fw-semibold">Quick Actions</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
              <Button variant="outline-primary" size="sm">
                Create new blog
              </Button>
              <Button variant="outline-secondary" size="sm">
                Manage tags
              </Button>
              <Button variant="outline-secondary" size="sm">
                View all blogs
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <span className="fw-semibold">Tips</span>
            </Card.Header>
            <Card.Body>
              <p className="small mb-1">
                ✅ Write clear, descriptive titles for better SEO.
              </p>
              <p className="small mb-1">
                ✅ Add tags to help organize your content.
              </p>
              <p className="small mb-0">
                ✅ Use rich text editor to format your article nicely.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
