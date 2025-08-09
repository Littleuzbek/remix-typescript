import { useActionData, useFetcher, useLocation } from "@remix-run/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import OrderHistory from "~/components/User/Orders/OrderHistory";
import { auth } from "~/firebase";
import { getUserOrders, OrderProps } from "../utils";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  const formData = await request.formData();
  // const idToken = formData.get("idToken");
  const actionType = formData.get("orderType");
  // const isOrderType = formData.get("typ");
  // const isOrder = formData.get("ord");
  // const orderType = JSON.parse(isOrderType);
  // const order = JSON.parse(isOrder);

  // const tokenUid = await tokenVerifier(idToken);

  // if (id && tokenUid !== id) return redirect(`/authentication`);

  if (actionType === "read") return await getUserOrders(id as string);

  // if (actionType === "action") {
  //   try {
  //     await cancelOrder(orderType, order.orderId, id);

  //     return redirectDocument(request.url);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return true;
};

export default function Orders() {
  const [orders, setOrders] = useState<false | OrderProps[]>(false);
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const data = useActionData<typeof action>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        fetcher.submit(
          { idToken: token, orderType: "read" },
          { method: "post", action: pathname }
        );
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const orderss = fetcher?.data || data;
    if (orderss && Array.isArray(orderss)) {
      setOrders(orderss);
    }
  }, [fetcher?.data, data]);
  return <OrderHistory orderData={orders} />;
}
