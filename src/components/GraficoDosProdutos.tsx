import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import { TotalOrdesForTheMonth } from '@/api/Pedidos/TotalOrdesForTheMonth';
import { Loader2 } from 'lucide-react';
import { GraficoVendasMensal } from './GraficoVendasMensal';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function GraficoDosProdutos() {

    const { data: pedidos } = useQuery({
        queryKey: ['TotalOrdesForTheMonth'],
        queryFn: TotalOrdesForTheMonth
    });

    return (
        <div className='grid grid-cols-9 mt-10 gap-5'>

            <div className='col-span-5'>
                <div className='h-[400px]'>
                    <GraficoVendasMensal/>
                </div>
            </div>

            <div className='col-span-4'>
                {pedidos ?
                    (<Card className='h-[400px]'>
                        <CardHeader className='flex flex-row justify-between'>
                            <div>
                                <CardTitle>
                                    Pedidos feitos no mês
                                </CardTitle>
                                <CardDescription>
                                    Detalhamento dos pedidos realizados no mês
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width='100%' height={240}>
                                <PieChart >
                                    <Pie
                                        data={pedidos}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                        strokeWidth={8}
                                        labelLine={false}
                                        label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            value,
                                            index,
                                        }) => {
                                            const RADIAN = Math.PI / 180
                                            const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                            return (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    className="fill-muted-foreground text-xs"
                                                    textAnchor={x > cx ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                >
                                                    {pedidos[index].company.length > 12
                                                        ? pedidos[index].company.substring(0, 12).concat('...')
                                                        : pedidos[index].company}{' '}
                                                    ({value})
                                                </text>
                                            )
                                        }}
                                    >
                                        {pedidos.map((entry: any, index: any) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} additive={entry}/>
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>)
                    :

                    (
                        (<Card className='col-span-3 h-[400px]'>
                            <CardHeader className='flex flex-row justify-between'>
                                <div>
                                    <CardTitle>
                                        Pedidos feitos no mês
                                    </CardTitle>
                                    <CardDescription>
                                        Detalhamento dos pedidos realizados no mês
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <div className="flex h-[240px] items-center justify-center col-span-3">
                                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground flex justify-center" />
                            </div>
                        </Card>)
                    )
                }
            </div>

        </div>
    );
}