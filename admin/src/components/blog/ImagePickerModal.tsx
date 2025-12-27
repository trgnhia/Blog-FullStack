import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import type { ImageResponse, ImagePageResponse } from "../../types/Image";
import "./ImagePickerModal.css";

type Props = {
  title: string;
  subTitle: string;
  showImagePicker: boolean;
  onClose: () => void;
  selectedImage?: ImageResponse;
  setSelectedImage: (img?: ImageResponse) => void;
  onApplyImage: (img: ImageResponse) => void;
};

const PAGE_SIZE = 10;

function ImagePickerModal(props: Props) {
  const {
    showImagePicker,
    onApplyImage,
    selectedImage,
    setSelectedImage,
    onClose,
    title,
    subTitle,
  } = props;
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(0);
  const hasNextRef = useRef(true);
  const isLoadingRef = useRef(false);

  const handleClose = () => {
    onClose();
  };

  const fetchImages = async (pageToLoad: number) => {
    if (isLoadingRef.current) return;
    if (!hasNextRef.current && pageToLoad > 0) return;

    try {
      // isLoadingRef.current = true;
      setIsLoading(true);
      const res = await axios.get<ImagePageResponse>("/api/uploads/pageable", {
        params: {
          page: pageToLoad,
          size: PAGE_SIZE,
        },
      });
      console.log(res.data);
      const { items, hasNext } = res.data;
      setImages((prev) => [...prev, ...items]);
      setHasNext(hasNext);
      setPage(pageToLoad);

      pageRef.current = pageToLoad;
      hasNextRef.current = hasNext;
    } catch (error) {
      console.log("Failed to fetch images ", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showImagePicker) return;
    setImages([]);
    setPage(0);
    setHasNext(true);

    // reset ref để không dính session cũ
    pageRef.current = 0;
    hasNextRef.current = true;
    isLoadingRef.current = false;
    fetchImages(0);
  }, [showImagePicker]);

  useEffect(() => {
    if (!showImagePicker) return;
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    console.log(sentinelRef.current);
    console.log(sentinelRef.current?.isConnected);
    if (!container || !sentinel) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (isLoadingRef.current) return;

        if (!hasNextRef.current) return;
        fetchImages(pageRef.current + 1);
      },
      {
        root: container,
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [showImagePicker]);

  const handleApply = () => {
    if (!selectedImage) return;
    onApplyImage(selectedImage);
    handleClose();
  };

  return (
    <>
      <Modal
        show={showImagePicker}
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
            ref={containerRef}
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {isLoading && page === 0 ? (
              <div className="text-center text-muted py-4">
                Loading Image1st
              </div>
            ) : images.length === 0 ? (
              <div className="text-center text-muted py-4">
                No images found. Tuy uploading one first
              </div>
            ) : (
              <div className="image-grid">
                {images.map((img) => (
                  <button
                    key={img.path}
                    type="button"
                    className="border-0 bg-transparent p-0 image-tile"
                  >
                    <div
                      className={
                        selectedImage?.path === img.path
                          ? "selected-img"
                          : "border rounded"
                      }
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
                        onClick={() => setSelectedImage(img)}
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
            <div
              ref={sentinelRef}
              style={{
                height: 8,
                marginTop: 8,
              }}
            />
            {isLoading && page > 0 && (
              <div className="text-center text-muted py-3">Loading more...</div>
            )}

            {!hasNext && images.length > 0 && (
              <div className="text-center text-muted py-3">No more images</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            disabled={!selectedImage}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ImagePickerModal;
