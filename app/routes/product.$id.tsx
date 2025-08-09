import { useLoaderData } from "@remix-run/react";
import {default as ProductPage} from "../components/Product/Product"
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = ({ params }: LoaderFunctionArgs): string | undefined => {
  const { id } = params;
  return id;
};


export default function Product() {
  const productId = useLoaderData<string | undefined>();
  return (
    <ProductPage productId={productId}/>
  )
}
