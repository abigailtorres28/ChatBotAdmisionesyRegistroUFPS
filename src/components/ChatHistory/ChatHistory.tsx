import { useEffect, useRef } from "react";
import { useChatStore } from "../../stores/chatStore";
import { FaUser } from "react-icons/fa";

interface Source {
  document_name: string;
  page_number: number;
  content_fragment: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface ChatHistoryProps {
  isTyping: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ isTyping }) => {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null); // 👈 referencia para el scroll

  useEffect(() => {
    // 👇 hace scroll hasta el fondo cuando cambia la lista de mensajes
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1 bg-gray-50">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-4">No hay mensajes aún.</div>
      )}

      {messages.map((msg: Message) => (
        <div
          key={msg.id}
          className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"
            }`}
        >
          {/* Avatar del bot */}
          {msg.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
              <img
                src="/LOGO BOT UFPS.png"
                alt="Bot"
                className="w-6 h-6 object-contain"
              />
            </div>
          )}

          {/* Burbuja del mensaje */}
          <div
            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words shadow
          ${msg.role === "user"
                ? "bg-white text-gray-800 rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"}`}
          >
            {msg.content}

            {/* Fuentes si existen */}
            {msg.role === "assistant" && Array.isArray(msg.sources) && msg.sources?.length > 0 && (
              <details className="mt-2 bg-gray-100 rounded-md p-2 text-xs text-gray-700">
                <summary className="cursor-pointer font-semibold text-gray-800">
                  📄 Ver fuente documental
                </summary>
                <ul className="list-disc pl-4 mt-2 space-y-2">
                  {msg.sources.map((source, index) => (
                    <li key={index}>
                      <strong>{source.document_name}</strong> — Página {source.page_number}
                      <br />
                      <em>“{source.content_fragment}”</em>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>

          {/* Indicador del usuario (círculo rojo) */}
          {msg.role === "user" && (
            <div className="w-8 h-8 rounded-full  bg-red-600  text-white flex items-center justify-center ml-0 place-self-end">
              <FaUser className="text-xs text-white" />
            </div>
          )}
        </div>
      ))}

      {/* Indicador de escritura */}
      {isTyping && (
        <div className="flex items-start gap-2 justify-start">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <img
              src="/LOGO BOT UFPS.png"
              alt="Bot"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="flex gap-1 mt-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
          </div>
        </div>
      )}

      {/* Scroll al final */}
      <div ref={bottomRef} />
    </div>

  );
};

export default ChatHistory;
