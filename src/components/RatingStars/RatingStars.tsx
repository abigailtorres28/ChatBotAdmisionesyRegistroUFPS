// src/components/RatingStars.tsx
import { useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  onRate: (rating: number) => void;
};

const RatingStars: React.FC<Props> = ({ onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center  pt-52 p-4 bg-white">
      <p className="text-gray-800 font-medium">¿Cómo calificarías tu experiencia?</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="text-yellow-400 hover:text-yellow-700"
          >
            <FaStar className={`w-6 h-6 ${hovered && star <= hovered ? "scale-110" : ""}`} />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">Haz clic en una estrella para calificar</p>
    </div>
  );
};

export default RatingStars;
