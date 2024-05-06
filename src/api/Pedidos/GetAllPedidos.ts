import Cookies from "universal-cookie";
import { backend } from "../api";

export interface GetAllPedidosResponse{
  take: number
  skip: number
  company: string
}


export async function GetAllPedidos({take, skip, company}:GetAllPedidosResponse) {
  const cookie = new Cookies();

  const response = await backend.get(
    `/pedido/getpedidos`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
      params:{
        take,
        skip,
        company
      }
    }
  );

  return response.data
}
