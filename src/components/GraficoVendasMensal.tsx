import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { MonthyOrdersPurchasedAnnualy } from "@/api/Pedidos/MonthyOrdersPurchasedAnnualy";
import { Loader2 } from "lucide-react";


export function GraficoVendasMensal() {

    const formatCurrency = (value: any) => {
        return (parseFloat(value) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const { data } = useQuery({
        queryKey: ['MonthyOrdersPurchasedAnnualy'],
        queryFn: MonthyOrdersPurchasedAnnualy
    })

    return (
        <div>
            {data ?
                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle>Investimentos mensais</CardTitle>
                        <p>Comparação dos investimentos feitos mensalmente</p>
                    </CardHeader>
                    <CardContent className=" w-full flex flex-col items-center text-xs">
                        <ResponsiveContainer width='100%' height={240}>
                            <BarChart width={150} height={40} data={data}>
                                <Bar dataKey='total' fill="#7c3aed" />
                                <XAxis dataKey='month' axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value: number) => formatCurrency(value)} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <CartesianGrid vertical={false} className="stroke-[#00000015]" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                :

                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle>Investimentos mensais</CardTitle>
                        <p>Comparação dos investimentos feitos mensalmente</p>
                    </CardHeader>
                    <CardContent className=" w-full flex flex-col items-center text-xs">
                        <div className="flex h-[240px] items-center justify-center col-span-3">
                            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground flex justify-center" />
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
    )
}