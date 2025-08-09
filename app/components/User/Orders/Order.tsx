import Carousel from "~/components/Card/Carousel";
import { formatDate, PriceFormatter } from "~/components/Extra/Extra";
import { OrderProps } from "~/utils";
import NasiyaIndicators from "./NasiyaIndicators";

export default function Order({ order }: { order: OrderProps }) {
  const productImages = order?.orderItems?.map((item) =>
    Array?.isArray(item?.image) ? item?.image[0] : item?.image
  ) as string[];

  const active = "text-[rgb(255,166,0)]";
  const bad = "text-[red]";
  const good = "text-[var(--success-color)]";

  return (
    <div className="border-3 border-[var(--first-color)] bg-[var(--second-color)] mx-[1rem] mb-[2rem]">
      <div className="mx-[1rem] grid grid-cols-[45%_50%] gap-[5%] p-[1rem]">
        <Carousel productImg={productImages} />
        <div className="flex flex-col gap-[2rem] justify-center">
          <span
            className={`
             flex gap-[1rem] text-[18px] items-center
            ${order?.confirmed === null && active}
            ${order?.confirmed === false && bad}
            ${order?.orderCondition === true && good}
            ${order?.orderCondition === false && bad}
            ${
              order?.confirmed === null ||
              (order?.confirmed === true &&
                order?.orderCondition === null &&
                active)
            }
            `}
          >
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Holat:
            </p>
            {order?.confirmed === null && "Tasdiqlamagan"}
            {order?.confirmed === false && "EXKO tomonidan rad etilgan"}
            {order?.orderCondition === true && "Xaridor qabul qilgan"}
            {order?.orderCondition === false && "Rad etilgan"}
            {order?.confirmed === null ||
              (order?.confirmed === true &&
                order?.orderCondition === null &&
                "Jarayonda")}
          </span>
          {order?.confirmed !== false && order?.orderCondition !== false && (
            <span
              className={`
              flex gap-[1rem] text-[18px] items-center
                ${
                  order?.orderCondition
                    ? good
                    : order?.orderCondition !== null
                    ? bad
                    : active
                }
              `}
            >
              <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
                Yetkazib berish sanasi:
              </p>{" "}
              {order?.orderCondition
                ? order?.orderDeliveryDate
                : order?.orderCondition !== null
                ? "Rad etilgan"
                : "Jarayonda"}
            </span>
          )}
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Yetkazib berish manzili:
            </p>{" "}
            {order?.orderAdress}
          </span>
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Buyurtma sanasi:
            </p>{" "}
            {formatDate(order?.orderDate)}
          </span>
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Buyurtma qiymati:
            </p>{" "}
            {PriceFormatter(order?.orderTotalPrice)} so&apos;m
          </span>

          <NasiyaIndicators order={order} />

          {/* Buyurtmani rad etish start */}

          {/* {order?.confirmed === null && (
            <form className="user-order-cancel-btn" onSubmit={handleCancel}>
              Buyurtmani bekor qilish
              <button type="submit"></button>
            </form>
          )} */}

          {/* Buyurtmani rad etish end */}
        </div>
      </div>

      {/* <div className="order-what">
        <div className="what-amount" onClick={() => setShowItem(!showItem)}>
          <p>Mahsulotlar soni: {order?.orderItems.length}</p>
          <FaArrowDown style={showItem ? { rotate: "180deg" } : {}} />
        </div>
        <div className="what-list">
          {showItem && (
            <>
              {order?.orderItems?.map((item, i) => (
                <OrderItem orderItem={item} key={item?.id + i} />
              ))}
            </>
          )}
        </div>
      </div> */}
    </div>
  );
}
