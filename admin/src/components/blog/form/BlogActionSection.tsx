import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  mode: "create" | "edit";
  onSavePublish: () => void;
  onSaveDraft: () => void;
};

export default function BlogActionsSection(props: Props) {
  const { mode, onSavePublish, onSaveDraft } = props;

  return (
    <div className="d-flex justify-content-end gap-2 mt-4">
      <NavLink to="/">
        <Button variant="secondary">Back</Button>
      </NavLink>

      {mode === "create" && (
        <>
          <Button variant="warning" onClick={onSaveDraft}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={onSavePublish}>
            Save and Publish
          </Button>
        </>
      )}

      {mode === "edit" && (
        <>
          <Button variant="warning" onClick={onSaveDraft}>
            Save changes as Draft
          </Button>
          <Button variant="primary" onClick={onSavePublish}>
            Save changes and Publish
          </Button>
        </>
      )}
    </div>
  );
}
