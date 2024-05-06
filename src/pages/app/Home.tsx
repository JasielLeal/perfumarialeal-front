import { PedidosDoMes } from "@/components/PedidosDoMes";

export function Home(){
        
    
    return(
        
        <div className="px-10 py-20 h-screen">
            <p className="text-3xl font-bold mb-5">DashBoard</p>
            
            <PedidosDoMes/>
        </div>
    )
}