import { IoMdMore } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { TableCell, TableRow } from "./ui/table";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import {DeleteUser} from '@/api/User/DeleteUser'
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CadastrarUserTableRowProps {
    user: {
        id?: string;
        name: string;
        email: string;
        password: string;
        isOwner?: boolean;
        avatar?: string
        createdAt?: Date;
    }
}

export interface UserRegister {
    id?: string;
    name: string;
    email: string;
    password: string;
    isOwner?: boolean;
    avatar?: string
    createdAt?: Date;
}


export function ShowUsers({ user }: CadastrarUserTableRowProps) {

    const queryClient = useQueryClient()

    const {mutateAsync: DeleteUserFn} = useMutation({
        mutationFn: DeleteUser,
        onSuccess: () =>{
            toast.success("Sucesso");
            queryClient.invalidateQueries(['getAllUsers'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro ao deletar o usuário");
        }, 
    })

    return (
        <>
            <TableRow>
                <TableCell className="font-semibold flex items-center gap-4 text-base">
                    <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {user?.name}
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell><Badge>Admin</Badge></TableCell>
                <TableCell>{format(user?.createdAt as Date, "dd'/'LL'/'y")}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <IoMdMore />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel></DropdownMenuLabel>

                            <DropdownMenuItem>
                                <Button variant={'ghost'} size={'icon'} className="w-full h-[20px]" onClick={async()=>{
                                    await DeleteUserFn(user?.id as string)
                                }}>Excluir</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </TableCell>
            </TableRow>
        </>
    )
}