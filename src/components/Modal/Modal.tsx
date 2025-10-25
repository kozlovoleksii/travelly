import React from "react";
import "./Modal.css"

type ModalProps = {
  message: string, 
  onClose: () => void, 
};

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  const [visible, setVisible] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className={`modal__overlay ${visible ? "show" : ""}`}>
      <div className="modal__content">
        <p>{message}</p>
        <button onClick={handleClose} className="modal__btn">
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal