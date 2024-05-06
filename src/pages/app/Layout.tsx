import { GetUser } from '@/api/User/GetUser';
import logoRocket from '@/assets/logo-rocket.png'
import { NavLink } from '@/components/NavLink'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError} from 'axios';
import { useEffect, useState } from 'react';
import { FaBox, FaHome, FaUser } from 'react-icons/fa'
import { SlLogout } from "react-icons/sl";
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
export function Layout() {

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: GetUser
    })

    const [isNavigating, setIsNavigating] = useState(false);
    const navigate = useNavigate()

    const cookies = new Cookies();
    const isAuthenticated = cookies.get('token');

    if(!isAuthenticated){
        navigate('/', { replace: true });
    }

    useEffect(() => {
        const isAxiosError = (error: any): error is AxiosError => {
            return error.isAxiosError;
        };

        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (isAxiosError(error)) {
                    const status = error.response?.status;

                    if (status === 500) {
                        setIsNavigating(true); // Inicia o indicador de carregamento
                        navigate('/', { replace: true });
                        setTimeout(() => {
                            setIsNavigating(false); // Finaliza o indicador de carregamento após a navegação
                        }, 22100); // Finaliza o indicador de carregamento após a navegação
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, [navigate]);

    function logout(){
        cookies.remove('token')
        navigate('/')
    }

    return (
        <>
            {isNavigating && <div>Carregando...</div>}
            <div className='grid grid-cols-1'>
                <div className='w-72'>
                    <div className='bg-primary w-72 p-5 h-screen flex flex-col justify-between fixed'>
                        <div>
                            <img src={logoRocket} alt='logo do site' className='w-20 mb-10' />
                            <div className='flex flex-col gap-2'>
                                <p className='text-white font-semibold'>Principal</p>
                                <NavLink to='/home'><FaHome /> Home</NavLink>
                                <NavLink to='/pedidos'><FaBox /> Pedidos</NavLink>
                                <NavLink to='/usuarios'><FaUser /> Usuários</NavLink>
                            </div>
                        </div>

                        <div >
                            <div className='flex items-center gap-2 justify-end mb-2'>
                                <div>
                                    <p className='text-white font-semibold text-right'>{profile?.name}</p>
                                    <p className='text-white'>{profile?.email}</p>
                                </div>
                                <Avatar>
                                    <AvatarImage src={profile?.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <Button variant={'secondary'} className='w-full flex gap-2 items-center text-white' onClick={logout}>
                                <SlLogout />
                                Sair
                            </Button>
                        </div>

                    </div>
                </div>
                <div className='ml-72'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}