import React, { useState } from "react";

type UserDataProps = {
  onAccept: (name: string, id: string) => void;
};

const UserData: React.FC<UserDataProps> = ({ onAccept }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const isFormValid = name.trim() !== "" && id.trim() !== "";

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-lg font-bold text-center text-gray-800 mt-16">Datos Personales</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full mt-10 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <input
        type="number"
        minLength={5}
        placeholder="Número de identificación"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={() => onAccept(name, id)}
        disabled={!isFormValid}
        className={`mt-6 py-2 px-4 rounded font-bold text-white  ${
          isFormValid ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Aceptar
      </button>
    </div>
  );
};

export default UserData;