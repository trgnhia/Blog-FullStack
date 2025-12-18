import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toBlogViewModels } from "../../../utils/BlogMapper";
import type { BlogResponse } from "../../../types/Blog";
import TablePagination from "./TablePagination";

type Props = {
  currentPage: number;
  allBlogs: BlogResponse[];
  handleOpenDeleteModal: (value: string) => void;
  totalPages: number;
  goToPage: (value: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const TableSection = (props: Props) => {
  const {
    allBlogs,
    handleOpenDeleteModal,
    totalPages,
    goToPage,
    currentPage,
    onNextPage,
    onPrevPage,
  } = props;
  const blogsModel = toBlogViewModels(allBlogs);
  return (
    <div>
      <Row className="g-3">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Recent Blogs</span>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th style={{ maxWidth: "280px" }}>Title</th>
                    <th>Author</th>
                    <th>Tags</th>
                    <th className="text-nowrap">Created</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogsModel.map((blog, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td
                          style={{
                            maxWidth: "280px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >
                          {blog.title}
                        </td>
                        <td>{blog.author}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {blog.tagsArray.slice(0, 2).map((t) => {
                              return (
                                <Badge pill bg="secondary">
                                  {t}
                                </Badge>
                              );
                            })}
                          </div>
                        </td>
                        <td className="text-nowrap">{blog.created}</td>
                        <td>
                          {blog.publish && (
                            <Badge bg="success">Published</Badge>
                          )}
                          {!blog.publish && (
                            <Badge bg="warning" text="dark">
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2 flex-nowrap">
                            <NavLink to={`/blogs/view/${blog.slug}`}>
                              <Button variant="outline-secondary" size="sm">
                                View
                              </Button>
                            </NavLink>
                            <NavLink to={`/blogs/edit/${blog.slug}`}>
                              <Button variant="outline-primary" size="sm">
                                Edit
                              </Button>
                            </NavLink>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                handleOpenDeleteModal(blog.id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-end mt-3 pe-3"></div>
      <TablePagination
        totalPages={totalPages}
        goToPage={goToPage}
        currentPage={currentPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
};

export default TableSection;
