import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GraficoDosProdutos } from "./GraficoDosProdutos"
import { useQuery } from "@tanstack/react-query"
import { GetTheTotalAmountInvestedInTheMonth } from "@/api/Pedidos/GetTheTotalAmountInvestedInTheMonth"
import { countOrdersForMonth } from "@/api/Pedidos/countOrdersForMonth";
import { Skeleton } from "./ui/skeleton";

export function PedidosDoMes() {
    const { data } = useQuery({
        queryKey: ['GetTheTotalAmountInvestedInTheMonth'],
        queryFn: GetTheTotalAmountInvestedInTheMonth
    });

    const { data: ordersForMonth } = useQuery({
        queryKey: ['countOrdersForMonth'],
        queryFn: countOrdersForMonth
    });

    // Função para formatar o valor em formato de reais
    const formatCurrency = (value:any) => {
        // Dividindo o valor por 100 e formatando em reais
        return (parseFloat(value) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl">Pedidos total (mês)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-2xl">{ordersForMonth ? ordersForMonth : <Skeleton className="w-full h-[32px]"/>}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-xl">Valor investido (mês) <span className="text-base"></span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold text-2xl">{data ? formatCurrency(data) : <Skeleton className="w-full h-[32px]"/>}</p>
                    </CardContent>
                </Card>
            </div>
            <GraficoDosProdutos/>
        </>
    );
}