import { useState } from "react";
import { Product } from "~/utils";

interface ColorProps {
  productDetails: Product;
  onSetActiveColor: (color: string | null) => void;
  activeColor: string | null;
}

export default function ColorHandler({
  activeColor,
  onSetActiveColor,
  productDetails,
}: ColorProps) {
  const [colorIndex, setColorIndex] = useState<null | number>(null);
  return (
    <div className="w-full h-[3.5rem] mt-[1rem]">
      <span className="text-[.9rem] flex gap-[.5rem]">
        Rang: <p className="text-[600]">{activeColor}</p>
      </span>
      <div className="w-fit h-[2rem] flex items-center gap-[1rem] mt-[.3rem] p-[.5rem] rounded-[20px] bg-[rgb(201,201,201)] border border-[rgb(201,201,201)]">
        {productDetails?.options?.color?.map((color, index) => (
          <button
            key={color}
            className={`${
              colorIndex === index
                ? "p-[3px] border-2 border-[black]"
                : "border-none"
            } rounded-[5px] overflow-hidden bg-transparent`}
            onClick={() => {
              if (colorIndex === index) {
                onSetActiveColor(null);
                setColorIndex(null);
                return;
              }
              onSetActiveColor(color);
              setColorIndex(index);
            }}
          >
            <div
              className={`bg-[${color}] w-[1rem] h-[1rem] rounded-[5px] cursor-pointer`}
              style={{ backgroundColor: `${color}` }}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
}
