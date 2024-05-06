import Cookies from "universal-cookie";
import { backend } from "../api";


export async function TotalOrdesForTheMonth() {
  const cookie = new Cookies();

  const response = await backend.get(
    `/pedido/getpedidos/month`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );
  return response.data
}
