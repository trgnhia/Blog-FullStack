import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Button, Card, Badge } from "react-bootstrap";

type BlogFormProps = {
  mode: "create" | "edit";
};

export default function BlogForm({ mode }: BlogFormProps) {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];
    if (!imageFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setCoverImagePreview((preUrl) => {
      if (preUrl) {
        URL.revokeObjectURL(preUrl);
      }
      return objectUrl;
    });
    setCoverImage(objectUrl);
  }

  useEffect(() => {
    return () => {
      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  function addTag() {
    const tag = tagInput;
    if (!tag) return;
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((x) => x !== tag));
  }
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
            placeholder="Enter blog's title"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter blog's author"
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
          <Form.Label>Cover Image</Form.Label>

          {/* Upload từ máy */}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />

          {/* Preview ảnh nếu có */}
          {coverImagePreview && (
            <div className="mb-2">
              <img
                src={coverImagePreview}
                alt="Preview"
                style={{ width: 200, borderRadius: 6 }}
              />
            </div>
          )}

          <Form.Control
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Or paste an image URL:   https://example.com/image.jpg"
          />
          <Form.Text muted>You can upload file from device or paste URL</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Tags</Form.Label>

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
            {tags.length === 0 && (
              <Form.Text muted>No tags added yet.</Form.Text>
            )}
          </div>
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
            apiKey="3fue6tl30xhh9oagw5oyj75e588z1lrj67msifuh0ofd3glf"
            value={content}
            onEditorChange={(newValue) => setContent(newValue)}
            init={{
              height: 400,
              menubar: true,
            }}
            // 👇 Đưa plugins ra ngoài, không để trong init nữa
            plugins="advlist autolink lists link image charmap print preview anchor
                     searchreplace visualblocks code fullscreen
                     insertdatetime media table paste help wordcount"
            // 👇 Toolbar cũng để ra ngoài
            toolbar="undo redo | formatselect | bold italic underline |
                     alignleft aligncenter alignright alignjustify |
                     bullist numlist outdent indent |
                     link image media | removeformat | help"
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
