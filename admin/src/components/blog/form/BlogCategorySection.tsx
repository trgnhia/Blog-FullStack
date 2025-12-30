import { Form } from "react-bootstrap";
import { BLOG_CATEGORIES, type BlogCategory } from "../../../types/Categories";
type Props = {
  category: BlogCategory;
  setCategory: (value: BlogCategory) => void;
};

export default function BlogCategorySection(props: Props) {
  const { category, setCategory } = props;
  return (
    <>
      <Form.Group>
        <Form.Label className="fw-semibold fs-6 mb-1">
          Category <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value as BlogCategory)}
        >
          {BLOG_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">
          Category is fixed to keep data clean.
        </Form.Text>
      </Form.Group>
    </>
  );
}
