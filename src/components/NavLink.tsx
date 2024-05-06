import { Link, LinkProps, useLocation } from "react-router-dom";


export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {

    const {pathname} = useLocation()

    return (
        <>
            <Link 
            data-current={pathname=== props.to}
            {...props}
            className="text-white flex items-center gap-2  p-2 rounded-lg data-[current=true]:bg-secondary hover:bg-secondary"
            />         
        </>
    )
}