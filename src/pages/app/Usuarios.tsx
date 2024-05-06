import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaPlus } from "react-icons/fa"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetAllUser } from "@/api/User/GetAllUser"
import { useQuery } from "@tanstack/react-query"
import { ShowUsers, UserRegister } from "@/components/ShowUsers"
import { ModalAdicionarUsuario } from "@/components/ModalAdicionarUsuario"

export function Usuarios() {
    const { data } = useQuery({
        queryKey: ['getAllUsers'],
        queryFn: GetAllUser
    })

    return (
        <div className="flex pt-20 px-10 
         w-full">
            <div className="w-full">
                <div className="flex items-center justify-between w-full mb-20">
                    <div>
                        <p className="text-3xl font-bold">Usuários</p>
                        <p className="text-md flex">Gerencie todos os usuários cadastrados</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex gap-2 uppercase font-semibold">
                                <FaPlus /> Adicionar usuário
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <ModalAdicionarUsuario />
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableCaption>Lista de todos os usuários cadastrados.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Usuário</TableHead>
                            <TableHead className="text-left">E-mail</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data ? data?.map((user: UserRegister) => {
                            return <ShowUsers user={user} key={user.id} />
                        })
                    
                        :

                        <div className="text-center flex justify-between w-full">
                            <p>'Carregando'</p>
                        </div>
                    }
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}