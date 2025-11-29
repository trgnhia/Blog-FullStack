import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Button, Card } from "react-bootstrap";

type BlogFormProps = {
  mode: "create" | "edit";
}

export default function BlogForm({ mode } : BlogFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  return (
    <Card className="p-4">
      <h4 className="mb-3">
        {mode === "create" ? "Create New Blog" : "Edit Blog"}
      </h4>

      <Form className="d-flex flex-column gap-3">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated or custom slug"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Editor
            apiKey="no-api-key"
            value={content}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | bold italic | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(newValue) => setContent(newValue)}
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Form>
    </Card>
  );
}
