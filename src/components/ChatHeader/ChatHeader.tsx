// src/components/ChatHeader.tsx
import { FaWindowMinimize } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  isCloseDisabled?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMinimize, onClose, isCloseDisabled }) => {
  return (
    <div className="bg-red-600 text-white p-3 font-semibold flex items-center justify-between rounded-t-[35px]">
      {/* Bot avatar */}
      <img
        src="/LOGO BOT UFPS.png"
        alt="Bot"
        className="w-10 h-10 rounded-full object-contain"
      />

      {/* Icon buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMinimize}
          className="text-white text-lg hover:text-gray-200"
          title="Minimizar"
        >
          <FaWindowMinimize />
        </button>
        <button
          onClick={onClose}
          className={`text-lg ${isCloseDisabled ? "text-red-300 cursor-not-allowed" : "text-white hover:text-gray-200"}`}
          title="Cerrar"
          disabled={isCloseDisabled}
        >
          <CgClose className="text-3xl font-extrabold" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
