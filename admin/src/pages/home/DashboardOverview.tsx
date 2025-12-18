
import { Row, Col, Card, Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
//import { TiTickOutline } from "react-icons/ti";
import type { BlogResponse } from "../../types/Blog";

type Props = {
  allBlogs : BlogResponse[]
}

const DashboardOverview = ({allBlogs} : Props) => {
  const publishedCount = allBlogs.filter((b) => b.publish).length;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Dashboard</h3>
          <p className="text-muted mb-0">
            Overview of your blog performance and recent activity.
          </p>
        </div>
        <NavLink to="/blogs/create">
          <Button variant="primary">+ New Blog</Button>
        </NavLink>
      </div>

      <Row className="g-3 mt-3"></Row>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Total Blogs</Card.Title>
              <Card.Text className="display-6 fw-bold">
                {allBlogs.length}
              </Card.Text>
              <small className="text-success">+12 this week</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Published</Card.Title>
              <Card.Text className="display-6 fw-bold">
                {publishedCount}
              </Card.Text>
              <small className="text-muted">Live on website</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mb-1">Drafts</Card.Title>
              <Card.Text className="display-6 fw-bold">
                {allBlogs.length - publishedCount}
              </Card.Text>
              <small className="text-warning">Need review</small>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              <span className="fw-semibold">Tips</span>
            </Card.Header>
            <Card.Body>
              <p className="small mb-1">
                <TiTickOutline size={20} className="me-1" />
                Write clear, descriptive titles for better SEO.
              </p>
              <p className="small mb-1">
                <TiTickOutline size={20} className="me-1" />
                Add tags to help organize your content.
              </p>
              <p className="small mb-0">
                <TiTickOutline size={20} className="me-1" />
                Use rich text editor to format your article nicely.
              </p>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default DashboardOverview;
