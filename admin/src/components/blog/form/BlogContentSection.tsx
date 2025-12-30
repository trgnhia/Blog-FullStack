import { Form } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { useState } from "react";
type Props = {
  excerpt: string;
  content: string;
  setContent: (value: string) => void;
  setExcerpt: (value: string) => void;
  onOpenEditorImagePicker: (
    cb: (url: string, meta?: { title?: string }) => void
  ) => void;
};

export default function BlogContentSection(props: Props) {
  const { excerpt, setExcerpt, content, setContent, onOpenEditorImagePicker } =
    props;

  const [editorRef, setEditorRef] = useState<TinyMCEEditor | null>(null);

  return (
    <>
      <Form.Group>
        <Form.Label className="fw-semibold fs-6 mb-1">Excerpt</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="fw-semibold fs-6 mb-1">
          Content <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Editor
          apiKey="3fue6tl30xhh9oagw5oyj75e588z1lrj67msifuh0ofd3glf"
          value={content}
          onInit={(_evt, editor) => setEditorRef(editor)}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{
            height: 400,
            menubar: true,
            image_dimensions: true,
            image_caption: true,
            image_advtab: true,
            setup: (editor) => {
              editor.ui.registry.addButton("myImagePicker", {
                icon: "image",
                tooltip: "Insert image",
                onAction: () => {
                  onOpenEditorImagePicker((url) => {
                    editor.insertContent(`
                      <img 
                        src="${url}" 
                        alt=""
                        style="max-width:100%; height:auto;"
                      />
                    `);
                  });
                },
              });
            },
          }}
          plugins="advlist autolink lists link image charmap print preview anchor
                     searchreplace visualblocks code fullscreen
                     insertdatetime media table paste help wordcount"
          toolbar="undo redo | formatselect | bold italic underline |
                     alignleft aligncenter alignright alignjustify |
                     bullist numlist outdent indent |
                     link myImagePicker | removeformat | help"
        />
      </Form.Group>
    </>
  );
}
