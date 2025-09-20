import { useState, useRef } from "react";
import { validateAndSanitizeMessage } from "../../utils/validation";
import { SendHorizontal } from 'lucide-react';

type Props = {
  onSend: (msg: string) => void;
};

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();

    const { valid, sanitized, error } = validateAndSanitizeMessage(input);

    if (!valid) {
      setError(error);
      return;
    }

    setError(null);
    onSend(sanitized);
    setInput("");

    // Opcional: autoscroll al fondo o limpiar altura
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-200 px-4 py-3 rounded-b-[35px]">
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          className="w-full pr-10 pl-4 py-2 rounded-full bg-white
    resize-none focus:outline-none whitespace-pre-wrap break-words
    overflow-hidden max-h-32 text-sm text-gray-700 placeholder-gray-400
    hide-scrollbar"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-800 transition"
          aria-label="Enviar"
        >
          <SendHorizontal size={20} color="red" />
        </button>
      </div>

      {/* Mensaje de error estilizado */}
      {error && (
        <p className="mt-2 text-sm text-red-600 bg-red-100 px-3 py-1 rounded-md shadow-sm">
          {error}
        </p>
      )}
    </form>
  );
};

export default MessageInput;
