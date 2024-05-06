import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa"
import { ListOfPedidos } from "@/components/ListOfPedidos";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { CriarPedidoSchema } from "@/schemas/CriarPedidoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreatePedido } from "@/api/Pedidos/CreatePedido";

export function Pedidos() {

    const queryClient = useQueryClient()

    const { register, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(CriarPedidoSchema),
        mode: 'all',
        criteriaMode: 'all',
    })

    const { mutateAsync: CreatePedidoFn, isPending } = useMutation({
        mutationFn: CreatePedido,
        onSuccess: () => {
            toast.success("Sucesso");
            reset()
            queryClient.invalidateQueries(['getAllPedidos'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro durante a criação do pedido");
        },
    })

    const onSub = async (data: FieldValues) => {
        await CreatePedidoFn(data)
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Remove todos os caracteres que não são números
        const onlyNumbers = value.replace(/[^\d]/g, '');
        // Atualiza o valor formatado no campo de entrada
        setValue('value', formatCurrency(onlyNumbers));
    };

    // Função para formatar o valor como reais brasileiros
    const formatCurrency = (value: string) => {
        // Converte o valor para número e formata como moeda brasileira
        const formatted = (Number(value) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formatted;
    };

    return (
        <div className="flex flex-col mt-20 px-10">
            <div className="flex justify-between">
                <div className="">
                    <p className="text-3xl font-bold">Pedidos</p>
                    <p className="mb-10">Todos os pedidos contabilizados até <strong>{format(new Date(), "dd'/'LL'/'y")}</strong> </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex gap-2 uppercase font-semibold">
                            <FaPlus /> Adicionar pedido
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <form onSubmit={handleSubmit(onSub)}>
                            <Input placeholder="Companhia" className="mt-10" {...register('company')} />
                            <Input placeholder="Ciclo" {...register('cycle')} className="my-5" />
                            <Input placeholder="Valor total do pedido" {...register('value')} onChange={handleValueChange}/>
                            <Button disabled={isPending} className="w-full mt-5">
                                Criar pedido
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            

            <ListOfPedidos />
        </div>
    )
}