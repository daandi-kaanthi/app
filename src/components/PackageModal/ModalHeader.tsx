import { CloseIcon } from "../ui/Icons/CloseIcon";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => (
  <div className="flex fixed right-0 justify-end p-2 z-100">
    <button
      onClick={onClose}
      className="p-2 rounded-full bg-gray-200/30 dark:bg-white/20 hover:bg-gray-300/40 dark:hover:bg-white/30 transition"
    >
      <CloseIcon />
    </button>
  </div>
);

export default ModalHeader;
