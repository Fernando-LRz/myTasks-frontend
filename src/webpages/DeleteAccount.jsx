import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const DeleteAccount = () => {

    const { auth, deleteAccount } = useAuth();

    const [ alert, setAlert ] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener el mensaje de éxito o error
        const result = await deleteAccount(auth._id);

        // Si no hubo error, redireccionar a la página de autenticación
        if(!result.error) {
            navigate('/');
            return;
        }

        // Actualizar el state de la alerta
        setAlert(result);
    };

    const { msg } = alert;

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-3xl text-center mt-10'>Eliminar cuenta</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Elimina tu cuenta y todos tus datos {''} 
                <span className='text-indigo-600 font-bold'>aquí</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    { msg && <Alert alert={ alert }/> }

                    <p className='text-lg text-center'>
                        Si elimina su cuenta se perderán todas sus tareas y no podrá recuperarlas, incluso si vuelve a crear una cuenta con el mismo correo electrónico.
                    </p>

                    <form
                        onSubmit={ handleSubmit }
                        className='flex justify-center'
                    >
                        <input 
                            type="submit" 
                            value="Eliminar mi Cuenta"
                            className='bg-red-700 hover:bg-red-800 px-10 py-3 font-bold text-white rounded-lg uppercase w-2/3 mt-5'
                        />
                    </form>
                </div>
            </div>
        </>
    )
};

export default DeleteAccount;