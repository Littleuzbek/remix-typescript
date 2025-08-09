import cpu from "../../assets/header_icons/cpu.png";
import book from "../../assets/header_icons/book.png";
import kids from "../../assets/header_icons/kids_clothes.png";
import women from "../../assets/header_icons/dress.png";
import men from "../../assets/header_icons/suit.png";
import shoe from "../../assets/header_icons/shoe.png";
import earbuds from "../../assets/header_icons/earbuds.png";
import cosmetics from "../../assets/header_icons/cosmetics.png";
import health from "../../assets/header_icons/health.png";
import laptop from "../../assets/header_icons/laptop.png";
import toys from "../../assets/header_icons/toys.png";
import watch from "../../assets/header_icons/watch.png";
import handshake from "../../assets/header_icons/handshake.png";

import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [toggle, setToggle] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const redirect = (link: string) => {
    navigate(link);
    setToggle(false);
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);
  return (
    <>
      <div className="header-catalog-btn-container inline-block relative overflow-hidden rounded-[5px] p-[2px]">
        <span className="w-full h-full absolute z-0 left-[0px] bg-[var(--first-color-light)] header-catalog-btn-container-animation"></span>
        <button
          onClick={() => setToggle(!toggle)}
          className="header-catalog-btn flex items-center gap-[5px] rounded-[5px] bg-[var(--first-color)] text-[18px] text-[white] p-[0.5rem_1.5rem] relative z-1 cursor-pointer border-none bg-[transparent] select-none transition-all duration-300 hover:bg-[var(--first-color-light)] border-0"
        >
          <span className="header-catalog-icon w-[20px] h-[20px] flex flex-col justify-evenly relative">
            <div
              className={`${
                toggle ? "header-catalog-open" : ""
              } w-full h-[2px] bg-[white] transition-all duration-500`}
            ></div>
            <div
              style={toggle ? { display: "none" } : {}}
              className="w-full h-[2px] bg-[white] transition-[.5s]"
            ></div>
            <div
              className={`${
                toggle ? "header-catalog-open" : ""
              } w-full h-[2px] bg-[white] transition-all duration-500`}
            ></div>
          </span>
          Katalog
        </button>
      </div>

      {toggle && (
        <div className="header-catalog-container w-full h-[90vh] bg-[rgba(0,0,0,0.5)] absolute left-[0] bottom-[0] z-[10]">
          <div className="w-[90%] m-[0_auto] grid grid-cols-6 gap-[1rem] bg-[var(--second-color)] rounded-[0_0_10px_10px]">
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/electronics")}
            >
              <img className="w-[3rem] h-[3rem]" src={cpu} alt="" /> Elektronika
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/books")}
            >
              <img className="w-[3rem] h-[3rem]" src={book} alt="" />
              Kitoblar
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/kidsClothes")}
            >
              <img className="w-[3rem] h-[3rem]" src={kids} alt="" /> Bolalar
              kiyimi
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/womenClothes")}
            >
              <img className="w-[3rem] h-[3rem]" src={women} alt="" /> Ayollar
              Kiyimi
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/menClothes")}
            >
              <img className="w-[3rem] h-[3rem]" src={men} alt="" /> Erkaklar
              kiyimi
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/shoes")}
            >
              <img className="w-[3rem] h-[3rem]" src={shoe} alt="" /> Poyafzal
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/accessuaries")}
            >
              <img className="w-[3rem] h-[3rem]" src={earbuds} alt="" />{" "}
              Aksessuarlar
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/cosmetics")}
            >
              <img className="w-[3rem] h-[3rem]" src={cosmetics} alt="" />{" "}
              Kosmetika
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/health")}
            >
              <img className="w-[3rem] h-[3rem]" src={health} alt="" />{" "}
              Salomatlik
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/laptops")}
            >
              <img className="w-[3rem] h-[3rem]" src={laptop} alt="" />{" "}
              Kompyuterlar
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/toys")}
            >
              <img className="w-[3rem] h-[3rem]" src={toys} alt="" />{" "}
              O&apos;yinchoq
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/watches")}
            >
              <img className="w-[3rem] h-[3rem]" src={watch} alt="" /> Saotlar
            </button>
            <button
              className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
              onClick={() => redirect("/category/bu")}
            >
              <img className="w-[3rem] h-[3rem]" src={handshake} alt="" /> B/U
            </button>
            {pathname !== "/" && (
              <button
                className="flex flex-col items-center gap-[10px] p-[2rem] text-[1.5rem] cursor-pointer border-none bg-[transparent]"
                onClick={() => redirect("/")}
              >
                <h1 className="text-[2rem] text-[var(--first-color)]">EXKO </h1>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
