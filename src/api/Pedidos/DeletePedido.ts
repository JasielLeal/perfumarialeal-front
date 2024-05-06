import Cookies from "universal-cookie";
import { backend } from "../api";

const cookie = new Cookies();

export async function DeletePedido(id: string) {
  const response = await backend.delete(`/pedido/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  })

  return response.data
}

