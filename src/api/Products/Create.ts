import { FieldValues } from "react-hook-form";
import Cookies from "universal-cookie";
import { backend } from "../api";

export async function CreateProduct( data:FieldValues) {

  
  const cookie = new Cookies();
  const response = await backend.post(
    `/product/create/${data.id}`,
    {
      amount: data.amount,
      name: data.name,
      value: data.value,
    },
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );

  return response
}
