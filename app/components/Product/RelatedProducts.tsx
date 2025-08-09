import { Product } from "~/utils";
import Collection from "../Home/Collection";

interface RelatedProps {
  relatedProducts: Product[] | null;
}

export default function RelatedProducts({ relatedProducts }: RelatedProps) {
  return (
    <div className="w-[90%] mx-auto">
      <Collection
        all={relatedProducts || []}
        section={"O'xshash mahsulotlar"}
      />
    </div>
  );
}
