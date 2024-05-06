import Cookies from "universal-cookie";
import { backend } from "../api";


export async function countOrdersForMonth() {
  const cookie = new Cookies();

  const response = await backend.get(
    `/pedido/getpedidos/allcount`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      }
    }
  );

  return response.data
}
