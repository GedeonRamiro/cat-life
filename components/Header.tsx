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
        <div className="navbar mb-2 shadow-lg bg-amber-400 rounded-t rounded-xl">
            <div className="container mx-auto">
                <Link href='/'>
                    <a className="flex-none">
                        <Image src={Logo} alt='Logo' width={38} height={38} />
                    </a> 
                </Link>
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden sm:flex">
                        {menuArray.map(menu => (
                             <Link href={menu.href}>
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>            
                    </svg>
                    </button>
                </div> 
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">             
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
                    </svg>
                    </button>
                </div>
            </div>
        </div>
        <div className="container mx-auto">
            {children}
        </div>
        </>

    )
}

export default Header