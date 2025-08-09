import { useSelector } from "react-redux";
import genie from "../assets/genie.webp";
import { RootState } from "~/root";
import Collection from "../components/Home/Collection";
import { Product } from "~/utils";

export default function Favourite() {
  const wishes = useSelector(
    (state: RootState) => state.cart.wishes
  ) as Product[];
  return (
    <div className="home-page w-[90%] mx-[auto] relative">
      {wishes?.length !== 0 ? (
        <Collection all={wishes} section="Saralanganlar" />
      ) : (
        <img
          src={genie}
          alt=""
          className="noItem-image w-full h-[30rem] object-contain"
        />
      )}
    </div>
  );
}
