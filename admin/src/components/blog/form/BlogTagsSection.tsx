
import { Form, Badge } from "react-bootstrap";

type Props = {
  tagInput : string;
  tags: string[];
  addTag: () => void;
  removeTag: (value: string) => void;
  setTagInput: (value: string) => void;
}

export default function BlogTagsSection(props : Props) {
  const {tagInput, tags, addTag, removeTag,setTagInput} = props
  return (
    <>
      <Form.Group>
        <Form.Label className="fw-semibold fs-6 mb-1">Tags</Form.Label>

        <Form.Control
          type="text"
          placeholder="Type a tag and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTag();
            }
          }}
        />

        <div className="d-flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              bg="info"
              pill
              className="px-3 py-2 d-flex align-items-center gap-2"
            >
              {tag}
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => removeTag(tag)}
              >
                ×
              </span>
            </Badge>
          ))}
          {tags.length === 0 && <Form.Text muted>No tags added yet.</Form.Text>}
        </div>
      </Form.Group>
    </>
  );
}
