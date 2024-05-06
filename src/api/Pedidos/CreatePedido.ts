import { FieldValues } from "react-hook-form";
import Cookies from "universal-cookie";
import { backend } from "../api";
export async function CreatePedido(data: FieldValues) {

    const cookie = new Cookies();
    const response = await backend.post(
    "/pedido/create",
    {
      company: data.company,
      cycle: data.cycle,
      value: data.value
    },
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );

  return response.data
}
