import Cookies from "universal-cookie";
import { backend } from "../api";


export async function MonthyOrdersPurchasedAnnualy() {
  const cookie = new Cookies();

  const response = await backend.get(
    `/pedido/getpedidos/everymonth`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      }
    }
  );

  return response.data
}
