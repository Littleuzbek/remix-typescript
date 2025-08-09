import Skeleton from "../Card/Skeleton";
import Card from "../Card/Card";
import { useState } from "react";
import { Product } from "~/utils";

type CollectionProps = {
  section?: string;
  all: Product[] | null;
  scroll?: true;
};

export default function Collection({ all, scroll, section }: CollectionProps) {
  const [more, setMore] = useState(10);
  const visibleProducts = all ? all.slice(0, more) : all || [];
  return (
    <>
      <h2 className="my-[1rem] text-[2rem]">{section || ""}</h2>
      <div className="collection w-full grid grid-cols-5 gap-[1rem] pb-[1rem]">
        {all ? (
          (scroll ? visibleProducts : all || [])?.map((item: Product, i: number) => (
            <Card
              key={`${item?.id}+${i}`}
              id={item?.id}
              title={item?.title || item?.name}
              image={item?.image}
              price={item?.discount || item?.price}
              oldPrice={item?.oldPrice || item?.price}
              rating={item?.rating || 0}
              feedback={item?.feedback || 0}
              product={item}
            />
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}

        {scroll && (
          <button
            className="collection-more-button py-[1rem] rounded-[10px] text-[22px] border-none bg-[var(--second-color)] text-[black] duration-500 cursor-pointer col-start-2 col-end-5 hover:bg-[#e7e8e9]"
            onClick={() => {
              setMore(more + 10);
            }}
          >
            Yana ko&apos;rsatish
          </button>
        )}
      </div>
    </>
  );
}
