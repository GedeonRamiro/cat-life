import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/images/logo.png'
import {useRouter} from 'next/router'

type LayoutProps = {
    children: React.ReactNode;
 }

const Header = ({ children }: LayoutProps) => {

    const menuArray = [
        {href: '/', pathname: '/', name: 'Home'},
        {href: '/posts', pathname: '/posts', name: 'Conteúdos'},
        {href: '/sobre', pathname: '/sobre', name: 'Quem somos?'},
      ]
    

    const { asPath } = useRouter()

    return (
        <>
        <div className="drawer h-screen">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="flex flex-col drawer-content">
                <div className="w-full navbar bg-amber-400">
                    <div className="container mx-auto">
                        <div className="flex-none sm:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap={'round'} strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            </label>
                        </div> 
                        <Link href='/'>
                            <a className="flex-none">
                                <Image src={Logo} alt='Logo' width={38} height={38} />
                            </a> 
                        </Link>
                        <div className="flex-1 px-2 mx-2">
                            <div className="items-stretch hidden sm:flex">
                                {menuArray.map((menu, index) => (
                                    <Link key={index} href={menu.href}>
                                        <a className={`btn btn-ghost btn-sm rounded-btn no-animation ${menu.href === asPath ? 'bg-amber-500' : ''}` }>
                                            {menu.name}
                                        </a> 
                                    </Link>
                                ))}
                            </div>
                        </div> 
                        <div className="flex-none">
                            <button className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">              
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>            
                            </svg>
                            </button>
                        </div> 
                        <div className="flex-none">
                            <button className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">             
                                <path  strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {children}
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
                <ul className="p-4 overflow-y-auto menu w-80 bg-amber-50">
                    {menuArray.map((menu, index) => (
                        <Link key={index} href={menu.href}>
                            <a className={`btn btn-ghost btn-sm rounded-btn no-animation ${menu.href === asPath ? 'bg-amber-500' : ''}` }>
                                {menu.name}
                                        </a> 
                        </Link>
                    ))}               
                </ul>
            </div>
        </div>
        </>

    )
}

export default Header