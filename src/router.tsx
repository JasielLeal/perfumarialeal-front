import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Layout } from "./pages/app/Layout";
import { Home } from "./pages/app/Home";
import { Usuarios } from "./pages/app/Usuarios";
import { Pedidos } from "./pages/app/Pedidos";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/home', element: <Home /> },
            {path: '/usuarios', element: <Usuarios/>},
            {path: '/pedidos', element: <Pedidos/>}
        ]
    }
])