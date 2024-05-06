import { useQuery } from "@tanstack/react-query"
import { GetAllPedidos } from "@/api/Pedidos/GetAllPedidos"
import { DetalhesDoPedido, PedidoRegister } from "./DetalhesDoPedido"
import { Button } from "./ui/button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { Loader2 } from "lucide-react";


export function ListOfPedidos() {

    const [company, setCompany] = useState('')
    const [skip, setSkip] = useState(0);
    const take = 10;

    const handleNext = () => {
        setSkip(prevSkip => prevSkip + take)
    };
    const handlePrevious = () => {
        setSkip(prevSkip => Math.max(prevSkip - take, 0));
    };

    const handleCompanyChange = (event: any) => {
        setCompany(event.target.value);
    };

    const { data } = useQuery({
        queryKey: ['getAllPedidos', skip, company],
        queryFn: () => GetAllPedidos({ skip, take, company }),
    });

    const isLastPage = data?.length < take;
    const isFirstPage = skip < 10

    return (
        <>

            <div className="flex gap-4 mb-5">
                <select name="select" onChange={handleCompanyChange} className="w-52 border  rounded-lg flex items-center">
                    <option value=''>Todos</option>
                    <option value="Natura">Natura</option>
                    <option value="Boticario">Boticario</option>
                    <option value="Avon">Avon</option>
                    <option value="Eudora">Eudora</option>
                </select>
            </div>
            <div>
                <div className="flex flex-col justify-between w-full">
                    <div>
                        { data ? data?.map((pedido: PedidoRegister) => (
                            <DetalhesDoPedido pedido={pedido} key={pedido.id} />
                        )) 
                        :
                        <div className="flex h-[240px] items-center justify-center col-span-3">
                            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground flex justify-center" />
                        </div>
                    }
                    </div>
                    <div className="flex justify-end mt-10 gap-2 w-full">
                        <Button variant={'outline'} onClick={handlePrevious} disabled={isFirstPage}>
                            <MdKeyboardArrowLeft />
                        </Button>
                        <Button variant={'outline'} onClick={handleNext} disabled={isLastPage}>
                            <MdKeyboardArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
