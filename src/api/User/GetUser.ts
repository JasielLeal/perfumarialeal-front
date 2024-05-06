import Cookies from "universal-cookie";
import { backend } from "../api";

interface GetUserResponse {
  id?: string;
  name: string;
  email: string;
  password: string;
  isOwner?: boolean;
  avatar?: string;
  createdAt?: Date;
}

export async function GetUser() {
  const cookie = new Cookies();

  const response = await backend.get<GetUserResponse>("/user/getuser", {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  });

  return response.data
}