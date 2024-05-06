import { FieldValues } from "react-hook-form";
import Cookies from "universal-cookie";
import { backend } from "../api";
export async function CreateUser(data: FieldValues) {
  
    const cookie = new Cookies();
    const response = await backend.post(
    "/user/create",
    {
      name: data.name,
      email: data.email,
      password: data.password,
      isOwner: data.isOwner,
      avatar: data.avatar,
    },
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );

  return response.data
}
