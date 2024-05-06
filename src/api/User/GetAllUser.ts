import Cookies from "universal-cookie";
import { backend } from "../api";


export async function GetAllUser() {
  const cookie = new Cookies();

  const response = await backend.get(
    "/user/getallusers",
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );

  return response.data
}
