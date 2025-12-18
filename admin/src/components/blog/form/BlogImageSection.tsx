import { Form, Button } from "react-bootstrap";
import type { ImageResponse } from "../../../types/Image";
import { MdCancel } from "react-icons/md";

type Props = {
  selectedImage?: ImageResponse;
  coverImageFile: File | null;
  coverImagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearImage: () => void;
  openCoverPicker: () => void;
}

export default function BlogImageSection(props : Props) {
  const {selectedImage, coverImageFile, coverImagePreview,handleImageChange,handleClearImage,openCoverPicker} = props;
  return (
    <>
      <Form.Group>
        <Form.Label className="fw-semibold fs-6 mb-1">
          Cover Image <span style={{ color: "red" }}>*</span>
        </Form.Label>
      </Form.Group>

      <div className="mb-3">
        <Form.Label className="">
          Option 1: Pick from our image library
        </Form.Label>
        <Button
          variant={selectedImage ? "success" : "primary"}
          onClick={() => openCoverPicker()}
          disabled={!!coverImageFile}
        >
          {selectedImage ? "Selected from library" : "Choose from library"}
        </Button>

        {coverImageFile && (
          <Form.Text className=" d-block mt-1">
            You already selected an image from device → remove it first to use
            this option.
          </Form.Text>
        )}
      </div>

      <div className="mb-3">
        <Form.Label className="">Option 2: Upload from your device</Form.Label>

        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={!!selectedImage}
        />

        {selectedImage && (
          <Form.Text className="d-block mt-1">
            You already selected an image from library → remove it first to
            upload a new one.
          </Form.Text>
        )}
      </div>
      <Form.Group>
        <Form.Label>Cover Image Preview</Form.Label>

        {coverImagePreview && (
          <div className="position-relative mb-2" style={{ width: 260 }}>
            <MdCancel
              onClick={handleClearImage}
              size={24}
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                background: "white",
                borderRadius: "50%",
                boxShadow: "0 0 4px rgba(248, 8, 8, 0.3)",
                cursor: "pointer",
              }}
            />
            <img
              src={coverImagePreview}
              alt="Preview"
              style={{
                width: "100%",
                borderRadius: 6,
                border: "1px solid #ddd",
                display: "block",
              }}
            />
          </div>
        )}
      </Form.Group>
    </>
  );
}
