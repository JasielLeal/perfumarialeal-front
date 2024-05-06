import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import toast from "react-hot-toast";
import { DeleteProduct } from "@/api/Products/Delete";

export interface ProductRegisterTableRow {
    produto: {
        id: string;
        amount: string
        name: string;
        value?: string;
        valueUnit?: string;
    }
}



export function ProductsDetalhes({ produto }: ProductRegisterTableRow) {
    
    const formatarParaReais = (valor:number) => {
        if (typeof valor === 'number' && !isNaN(valor)) {
            return (Number(valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        return '';
    };
    
    const queryClient = useQueryClient()

    const {mutateAsync: DeleteProductFn, isPending} = useMutation({
        mutationFn: DeleteProduct,
        onSuccess: () =>{
            toast.success("Sucesso");
            queryClient.invalidateQueries(['getAllPedidos'] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.error("Erro ao deletar o produto");
        }, 
    })
    
    
    return (
        <>
            <TableRow>
                <TableCell className="font-medium">{produto?.amount}</TableCell>
                <TableCell>{produto?.name}</TableCell>
                <TableCell>{formatarParaReais(Number(produto?.value))}</TableCell>
                <TableCell>{formatarParaReais(Number(produto?.valueUnit))}</TableCell>
                <TableCell className="text-right">
                    <Button variant={'ghost'} disabled={isPending} className="text-red-500 hover:text-red-600" onClick={async()=>{
                        await DeleteProductFn(produto?.id)
                    }}>Excluir</Button>
                </TableCell>
            </TableRow>
        </>
    )
}