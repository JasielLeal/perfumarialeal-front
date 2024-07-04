import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { ProductsDetalhes } from "./ProductsDetalhes";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { CriarProductSchema } from "@/schemas/CriarProdutoSchema";
import toast from "react-hot-toast";
import { CreateProduct } from "@/api/Products/Create";
import { DeletePedido } from "@/api/Pedidos/DeletePedido";
interface TakeDetalhesPedidoTableRowProps {
    pedido: {
        id: string;
        name: string;
        company: string;
        cycle: string;
        value?: string;
        createdAt?: Date
        product: []
    }
}

export interface PedidoRegister {
    id: string;
    name: string;
    company: string;
    cycle: string;
    value?: string;
    createdAt?: Date
    product: []
}

export function DetalhesDoPedido({ pedido }: TakeDetalhesPedidoTableRowProps) {

    const queryClient = useQueryClient()


    const { register, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(CriarProductSchema),
        mode: 'all',
        criteriaMode: 'all',
    })

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Remove todos os caracteres que não são números
        const onlyNumbers = value.replace(/[^\d]/g, '');
        // Atualiza o valor formatado no campo de entrada
        setValue('value', formatCurrencye(onlyNumbers));
    };

    // Função para formatar o valor como reais brasileiros
    const formatCurrencye = (value: string) => {
        // Converte o valor para número e formata como moeda brasileira
        const formatted = (Number(value) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formatted;
    };

    const { mutateAsync: CreateProductFn, isPending } = useMutation({
        mutationFn: CreateProduct,
        onSuccess: () => {
            toast.success("Sucesso");
            reset()
            queryClient.invalidateQueries(['getAllPedidos'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro ao criar o usuário");
        },
    })

    const onSub = async (data: FieldValues) => {
        await CreateProductFn(data)
    }

    const { mutateAsync: DeletePedidoFn, isPending: isProcess } = useMutation({
        mutationFn: DeletePedido,
        onSuccess: () => {
            toast.success("Sucesso");
            queryClient.invalidateQueries(['getAllPedidos'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro ao deletar o produto");
        },
    })


    function formatCurrency(value: number): string {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
    }

    return (
        <div className="grid grid-cols-9 w-full gap-10">
            <div className="col-span-8">
                <Accordion type="single" collapsible>
                    <AccordionItem value={pedido?.id}>
                        <AccordionTrigger>
                            <div className="flex gap-10">
                                <p className="font-semibold text-left w-[200px]">Companhia: <span className="font-normal">{pedido?.company}</span></p>
                                <p className="font-semibold text-left w-[200px]">Ciclo: <span className="font-normal text-left">{pedido?.cycle}</span></p>
                                <p className="font-semibold text-left w-[300px]">Valor do pedido: <span className="font-normal">{pedido?.value ? formatCurrency(Number(pedido.value) / 100) : ""}</span></p>
                                <p className="font-semibold text-left">Criado em: <span className="font-normal ">{format(pedido.createdAt as Date, "dd'/'LL'/'y")}</span></p>
                                <input type="hidden" {...register('id')} value={pedido?.id} />
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <form onSubmit={handleSubmit(onSub)}>
                                <div className="flex py-10 items-center gap-5">
                                    <Input placeholder="Quatidade" {...register('amount')} />
                                    <Input placeholder="Nome" {...register('name')} />
                                    <Input placeholder="Valor total" {...register('value')} onChange={handleValueChange} />
                                    <Button className="my-5" disabled={isPending} >
                                        Adicionar produto
                                    </Button>
                                </div>
                            </form>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Quantidade</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Valor (Total)</TableHead>
                                        <TableHead>Valor (Unidade)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pedido.product.map((product, index: number) => {
                                        return <ProductsDetalhes produto={product} key={index} />
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="col-span-1">
                <Button variant={'destructive'} disabled={isProcess} onClick={async () => {
                    await DeletePedidoFn(pedido?.id)
                }
                }>
                    Excluir pedido
                </Button>
            </div>
        </div>
    )
}