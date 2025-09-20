// src/components/RoleSelector/RoleSelector.tsx
import { useChatStore } from "../../stores/chatStore";
import { useState } from "react";
import { motion } from 'framer-motion'

type Props = {
  ws: React.MutableRefObject<WebSocket | null>;
};

const roles = ["aspirante", "estudiante", "graduado", "otro"] as const;

const RoleSelector: React.FC<Props> = ({ ws }) => {
  const setUserRole = useChatStore((state) => state.setUserRole);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (role: "aspirante" | "estudiante" | "graduado" | "otro") => {
    setSelected(role);

    setTimeout(() => {
      setUserRole(role); // Ya no es necesario el 'as any'

      // Enviar el evento select_role al backend
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            event_type: "select_role",
            role,
          })
        );
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-24 px-4 p-20" >
      <h2 className="text-lg font-semibold text-center text-gray-800 ">Selecciona Tu Rol</h2>
      <div className="flex flex-col gap-3 w-full">
        {roles.map((role) => (
          <motion.button
            key={role}
            onClick={() => handleSelect(role)}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#7f1d1d',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-red-600 text-white py-2 px-4 rounded-lg w-48 mx-auto"
          >
            {role}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
