import Button from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
};

export default function Modal({ open, onClose, title, content }: ModalProps) {
  if (!open) return null;

  return (
    <div className="simple-modal-overlay" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
        <div className="simple-modal__content">
          {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
          {content}
        </div>
        <div className="simple-modal__actions">
          <Button type="submit" label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
