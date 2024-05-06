import Cookies from "universal-cookie";
import { backend } from "../api";


export async function GetTheTotalAmountInvestedInTheMonth() {
  const cookie = new Cookies();

  const response = await backend.get(
    `/pedido/getpedidos/allprice`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      }
    }
  );

  return response.data
}
