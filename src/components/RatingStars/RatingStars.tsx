// src/components/RatingStars.tsx
import { useState } from "react";


type Props = {
  onRate: (rating: number) => void;
};

const RatingStars: React.FC<Props> = ({ onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center pt-36 p-4 bg-white">
      <p className="text-gray-800 font-medium mb-2">Califica tu experiencia con nuestra asistente ADMIA. ¿La información que recibiste ayudó a resolver tus dudas?</p>

      <div className="flex gap-4 pt-6">
        {[1, 2, 3, 4, 5].map((value) => {
          // verificamos que hovered no sea null
          const isActive = hovered !== null && value <= hovered;

          const colorMap: Record<number, string> = {
            1: "fill-green-500",
            2: "fill-lime-500",
            3: "fill-yellow-400",
            4: "fill-orange-500",
            5: "fill-red-500",
          };

          const fillColor = isActive ? colorMap[value] : "fill-gray-300";

          return (
            <button
              key={value}
              onClick={() => onRate(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              className="transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className={`w-12 h-12 ${fillColor} stroke-black stroke-[2px] rounded-full`}
              >
                <circle cx="32" cy="32" r="30" />
                {/* ojos */}
                <circle cx="22" cy="25" r="3" fill="black" />
                <circle cx="42" cy="25" r="3" fill="black" />

                {/* boca según nivel */}
                {value === 1 && (
                  <path d="M22 40 Q32 50 42 40" stroke="black" strokeWidth="3" fill="none" />
                )}
                {value === 2 && (
                  <path d="M22 40 Q32 45 42 40" stroke="black" strokeWidth="3" fill="none" />
                )}
                {value === 3 && (
                  <line x1="22" y1="42" x2="42" y2="42" stroke="black" strokeWidth="3" />
                )}
                {value === 4 && (
                  <path d="M22 45 Q32 35 42 45" stroke="black" strokeWidth="3" fill="none" />
                )}
                {value === 5 && (
                  <path d="M22 48 Q32 32 42 48" stroke="black" strokeWidth="3" fill="none" />
                )}
              </svg>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 mt-2">Haz clic en una carita para calificar</p>
    </div>

  );
};

export default RatingStars;
