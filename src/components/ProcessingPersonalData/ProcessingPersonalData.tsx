import React, { useState } from "react";


interface ProcessingPersonalDataProps {
    onAccept: () => void;
}

const ProcessingPersonalData: React.FC<ProcessingPersonalDataProps> = ({ onAccept }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="mt-2 text-sm">
                Te damos la bienvenida al asistente virtual de la Vicerrectoria Asistente de Estudios de la Universidad Francisco de Paula Santander.
                 Para poder ayudarte, por favor acepta nuestra 
                 <a className="p-1 text-blue-600 underline"
                 href="https://ww2.ufps.edu.co/public/archivos/reglamentacion/Manual_interno_de_politicas_y_procedimientos_de_datos_personales_2014.pdf">
                     Política de Protección de Datos Personales</a>
                 :
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="acceptCheckbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4"
                />
                <label htmlFor="acceptCheckbox" className="text-sm">
                    Acepto los términos y condiciones
                </label>
            </div>
            <button
                onClick={onAccept}
                disabled={!isChecked}
                className={`py-2 px-4 rounded font-bold text-white ${isChecked ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Aceptar y Continuar
            </button>
        </div>
    );
}

export default ProcessingPersonalData;