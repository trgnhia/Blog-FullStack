import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import {mutate} from 'swr';
import type { BlogResponse } from "../../types/Blog";
type Props = {
  showDeleteModal : boolean,
  setShowDeleteModal : (value : boolean) => void,
  id : string;
}

export default function BlogDeleteModal(props : Props) {
  const {showDeleteModal, setShowDeleteModal, id} = props;
  const handleClose = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${id}`)
      toast.success("Delete Modal success 🎉");
      handleClose();
      mutate<BlogResponse[]>(
        "/api/blogs",
        (currentBlog) => currentBlog?.filter((b) => b.id !== id) ?? [],
        {revalidate : false}
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete blog");
    }
  }

  return (
    <>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE BLOG</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure to delete this blog - id: ${id} ?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}