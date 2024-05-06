import logo from '@/assets/logo.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginSchema } from '@/schemas/loginSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from 'react-hook-form'
import { LoginUser } from '@/api/User/POST-Login'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
export function Login() {

    const navigate = useNavigate()
    const cookie = new Cookies()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'all',
        criteriaMode: 'all',
    })

    const { mutateAsync: LoginUserFn, isPending } = useMutation({
        mutationFn: LoginUser,
        onSuccess: (response) => {
            toast.success("Sucesso");
            cookie.set('token', response.data.token)
            navigate('/home', { replace: true })
        },
        onError: () => {
            toast.error("Erro durante a autenticação");
        },
    })

    const onSub = async (data: FieldValues) => {
        await LoginUserFn(data);
    }

    return (
        <div className='flex w-full h-screen justify-between'>
            <div className='flex justify-center items-center -mt-20 w-full'>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className='ml-20 mt-20 flex flex-col justify-center '>
                        <div className='text-center flex flex-col items-center'>
                            <img src={logo} alt="logo do site" className='w-72 mb-5' />

                            <p className='font-bold text-2xl text-slate-800 '>Acesse a plataforma</p>
                            <p className='font-medium text-md mb-10'>Faça o login para entrar no seu espaço digital.</p>
                        </div>
                        <div>
                            <p className='font-semibold text-slate-800'>E-mail</p>
                            <Input
                                placeholder='Digite seu e-mail'
                                className='mb-2 w-[400px]'
                                {...register('email')}
                            />
                            {errors.email && <span className="text-red-500 pb-10">{errors.email.message?.toString()}</span>}

                            <p className='font-semibold text-slate-800'>Senha</p>
                            <Input
                                placeholder='Digite sua senha'
                                {...register('password')}
                                type='password'
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message?.toString()}</span>}
                        </div>

                        <Button className='w-full mt-10' disabled={isPending}>
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}