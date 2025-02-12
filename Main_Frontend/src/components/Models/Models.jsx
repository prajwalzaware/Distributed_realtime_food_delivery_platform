import { createPortal } from 'react-dom';
import SignInForm from "../Home/SignInForm.jsx";

const Models = ({ onClose }) => {
  return createPortal(
    <div className="modal-overlay bg-black bg-opacity-50" onClick={onClose}>
      <div className="modal-content " onClick={(e) => e.stopPropagation()}>
        <SignInForm onClose={onClose} />

      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Models;
