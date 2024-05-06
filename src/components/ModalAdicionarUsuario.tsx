import { CriarUsuarioSchema } from "@/schemas/CriarUsuarioSchema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "@/api/User/CreateUser";
import toast from "react-hot-toast";

export function ModalAdicionarUsuario() {

    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CriarUsuarioSchema),
        mode: 'all',
        criteriaMode: 'all',
    })

    const { mutateAsync: CreateUserFn, isPending} = useMutation({
        mutationFn: CreateUser,
        onSuccess: () =>{
            toast.success("Sucesso");
            queryClient.invalidateQueries(['getAllUsers'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro ao criar o usuário");
        },   
    })

    const onSub = async (data: FieldValues) => {
        await CreateUserFn(data); 
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSub)}>
                <p className="text-2xl font-bold ">Adicione um novo usuário</p>
                <p className="font-semibold">Preencha todos os campos abaixo corretamente</p>

                <div className="flex flex-col gap-2 my-7">
                    <Input placeholder="Nome" {...register('name')}/>
                    {errors.name && <span className="text-red-500 pb-2">{errors.name.message?.toString()}</span>}
                    <Input placeholder="Email" {...register('email')}/>
                    {errors.email && <span className="text-red-500 pb-2">{errors.email.message?.toString()}</span>}
                    <Input placeholder="Senha" {...register('password')}/>
                    {errors.password && <span className="text-red-500 pb-2">{errors.password.message?.toString()}</span>}
                    <Input placeholder="Avatar" {...register('avatar')}/>
                </div>
                <Button className="font-semibold text-base w-full" disabled={isPending}>
                    Criar
                </Button>
            </form>
        </>
    )
}