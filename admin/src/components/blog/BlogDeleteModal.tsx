
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
  showDeleteModal : boolean,
  setShowDeleteModal : (value : boolean) => void,
}

export default function BlogDeleteModal(props : Props) {
  const {showDeleteModal, setShowDeleteModal} = props;
  const handleClose = () => setShowDeleteModal(false);
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE BLOG</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}