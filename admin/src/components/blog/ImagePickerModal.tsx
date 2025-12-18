import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import type { ImageResponse } from "../../types/Image";
import "./ImagePickerModal.css"

type Props = {
  title: string;
  subTitle: string;
  showUploadImage: boolean;
  onClose: () => void;
  selectedImage? : ImageResponse;
  setSelectedImage: (img?: ImageResponse) => void;
  onApplyImage: (img: ImageResponse) => void;
};

function ImagePickerModal(props: Props) {
  const { showUploadImage, onApplyImage, selectedImage,setSelectedImage, onClose,title,subTitle } = props;
  const [images, setImages] = useState<ImageResponse[]>([]);
  const handleClose = () => {
    onClose();
  }

  useEffect(() => {
    if (showUploadImage) {
      const fetchImages = async () => {
        const res = await axios.get<ImageResponse[]>("/api/uploads");
        console.log(res);
        setImages(res.data);
      };
      fetchImages();
    }
  }, [showUploadImage]);

  const handleApply = () => {
    if (!selectedImage) return;
    onApplyImage(selectedImage);
    handleClose();
  }


  return (
    <>
      <Modal
        show={showUploadImage}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <div className="fw-semibold mb-1">{subTitle}</div>
            <div className="text-muted small">
              Select an image from your library
            </div>
          </div>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {images.length === 0 ? (
              <div className="text-center text-muted py-4">
                No images found. Try uploading one first.
              </div>
            ) : (
              <div
                className="image-grid" 
              >
                {images.map((img) => (
                  <button
                    key={img.path}
                    type="button"
                    className="border-0 bg-transparent p-0 image-tile"
                  >
                    <div
                      className={selectedImage?.path === img.path ? "selected-img" : "border rounded"}
                      style={{
                        width: "100%",
                        height: 160,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.fileName}
                        onClick={() => {
                          setSelectedImage(img);
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" disabled={!selectedImage} onClick={handleApply} >Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ImagePickerModal;