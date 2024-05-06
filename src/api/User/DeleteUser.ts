import Cookies from "universal-cookie";
import { backend } from "../api";

const cookie = new Cookies();

export async function DeleteUser(id: string) {
  const response = await backend.delete(`/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  })

  return response.data
}

