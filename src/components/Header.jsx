import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {

    const { logOut } = useAuth();

    return (
        <header className="py-10 bg-indigo-600 p-10">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de tareas {''} 
                    <span className="text-white font-black">myTasks</span>
                </h1>

                <nav className='flex flex-col items-center md:flex-row gap-4 mt-5 lg:mt-0'>
                    <Link to="/admin" className='text-white text-sm uppercase font-bold'>Mis Tareas</Link>
                    <Link to="/admin/favorite" className='text-white text-sm uppercase font-bold'>Favoritas</Link>
                    <Link to="/admin/account" className='text-white text-sm uppercase font-bold'>Mi Cuenta</Link>

                    <button 
                        type='button' 
                        className='text-white text-sm uppercase font-bold'
                        onClick={logOut}
                        >Cerrar sesión
                    </button>
                </nav>
            </div>
        </header>
    )
};

export default Header;