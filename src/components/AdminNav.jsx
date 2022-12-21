import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav className='flex gap-6 ml-10'>
            <Link
                to="/admin/account"
                className="font-bold uppercase text-gray-500"
            >Cuenta</Link>
            <Link
                to="/admin/change-password"
                className="font-bold uppercase text-gray-500"
            >Contraseña</Link>
            <Link
                to="/admin/delete-account"
                className="font-bold uppercase text-gray-500"
            >Eliminar Cuenta</Link>
        </nav>
    )
};

export default AdminNav;