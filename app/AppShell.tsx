import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { loader } from "./root";
import { cartAction } from "./store/CartSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const data = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.products) {
      dispatch(cartAction.setProducts(data?.products));
    }
  }, [data, dispatch]);

  return (
    <div className="exko w-full h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
