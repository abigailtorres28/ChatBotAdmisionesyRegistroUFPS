// src/ChatWidget.tsx
import React, { useState, useRef, useEffect } from "react";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import MessageInput from "./components/MessageInput/MessageInput";
import RoleSelector from "./components/RoleSelector/RoleSelector";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import { useChatStore } from "./stores/chatStore";
import RatingStars from "./components/RatingStars/RatingStars";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // 👈 NUEVO ESTADO

  const userRole = useChatStore((state) => state.userRole);
  const setUserRole = useChatStore((state) => state.setUserRole);
  const addMessage = useChatStore((state) => state.addMessage);
  const clearMessages = useChatStore((state) => state.clearMessages);
  const hasGreeted = useRef(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = () => {
    const wsUrl = import.meta.env.VITE_BACKEND_WS_URL || "ws://localhost:5000/ws/chat";
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("✅ Conectado al WebSocket");
      setIsConnected(true);

      if (userRole) {
        ws.current?.send(JSON.stringify({
          event_type: "select_role",
          role: userRole,
        }));
      }

      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event_type === "message_received") {
          addMessage({
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message,
          });
          setIsTyping(false); // 👈 OCULTAR INDICADOR DE ESCRITURA
        } else if (data.event_type === "system_message") {
          console.log("🟢 Mensaje del sistema:", data.message);
        } else if (data.event_type === "error") {
          console.error("⚠️ Error recibido:", data.message);
          setIsTyping(false); // 👈 OCULTAR INDICADOR SI HAY ERROR
        }
      } catch (err) {
        console.error("❌ Error al parsear mensaje WebSocket:", err);
        setIsTyping(false); // 👈 OCULTAR INDICADOR SI HAY ERROR
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ Error WebSocket:", error);
    };

    ws.current.onclose = () => {
      console.warn("🔌 Conexión WebSocket cerrada");
      setIsConnected(false);
      clearMessages();
      setUserRole(null);

      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(() => {
          console.log("🔄 Intentando reconectar...");
          connectWebSocket();
        }, 3000);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
      if (reconnectInterval.current) clearInterval(reconnectInterval.current);
    };
  }, []);

  const handleMinimize = () => {
    setIsOpen(false);
  };
  const [showRating, setShowRating] = useState(false);

  const handleClose = () => {
    setShowRating(true);
  };

  const handleRated = (rating: number) => {
    console.log("⭐ Calificación:", rating);
    setShowRating(false);
    setIsOpen(false);
    clearMessages();
    setUserRole(null);
    hasGreeted.current = false;
  };


  const handleSend = (content: string) => {
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content,
    });

    setIsTyping(true); // 👈 MOSTRAR INDICADOR DE ESCRITURA

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          event_type: "send_message",
          message: content,
        })
      );
    } else {
      console.warn("⚠️ WebSocket no está conectado");
    }
  };

  useEffect(() => {
    if (userRole && !hasGreeted.current) {
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: "¡Hola! ¿En qué puedo ayudarte?",
      });
      hasGreeted.current = true;
    }
  }, [userRole, addMessage]);


  return (
    <>
      {/* Botón de burbuja flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        title={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        <img
          src="/LOGO BOT UFPS.png"
          alt="Bot de chat"
          className="fixed bottom-6 right-6 object-contain max-h-20 max-w-20 transition-transform duration-300 ease-in-out group-hover:scale-110"

        />
      </button>


      {/* Panel del chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-24 w-[350px] max-w-[90vw] h-[500px] max-h-[90vh] bg-white rounded-[35px] shadow-xl flex flex-col overflow-hidden z-50">

          {!isConnected ? (
            <div className="p-4 text-center text-gray-600 animate-pulse">
              🔌 Reconectando...
            </div>
          ) : !userRole ? (
            <RoleSelector ws={ws} />
          ) : showRating ? (
            // ✅ Mostrar calificación
            <RatingStars onRate={handleRated} />
          ) : (
            <>
              <ChatHeader
                onMinimize={handleMinimize}
                onClose={handleClose}
                isCloseDisabled={!userRole}
              />
              <ChatHistory isTyping={isTyping} />
              <MessageInput onSend={handleSend} />
            </>
          )}
        </div>
      )}

    </>
  );
};

export default ChatWidget;
