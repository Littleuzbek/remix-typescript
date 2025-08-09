import { Product } from "~/utils";
import ColorHandler from "./ColorHandler";

interface OptionsProps {
  productDetails: Product;
  activeColor: string | null;
  onSetActiveColor: (color: string | null) => void;
  activeSize: string | null;
  onSetActiveSize: (size: string | null) => void;
}

export default function Options({
  productDetails,
  activeColor,
  onSetActiveColor,
  activeSize,
  onSetActiveSize,
}: OptionsProps) {
  return (
    <>
      {productDetails?.options?.size && (
        <div className="w-auto h-auto my-[.5rem]">
          <h4>O&apos;lcham:</h4>
          <div className="flex gap-[.5rem] mt-[.3rem]">
            {productDetails.options?.size.map((size) => (
              <button
                className={`text-[1rem] py-[5px] px-[10px] rounded-[5px] bg-transparent ${
                  size === activeSize
                    ? "border-3  border-[black]"
                    : "border  border-[rgb(160,160,160)]"
                }`}
                key={size}
                id={size}
                onClick={() => size === activeSize ? onSetActiveSize(null) : onSetActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {productDetails?.options?.color && (
        <ColorHandler
          activeColor={activeColor}
          onSetActiveColor={onSetActiveColor}
          productDetails={productDetails}
        />
      )}
    </>
  );
}
