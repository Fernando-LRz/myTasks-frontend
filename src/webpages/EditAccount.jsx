import { useState, useEffect } from 'react';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const EditAccount = () => {

    const { auth, updateAccountData } = useAuth();
    const [ accountData, setAccountData ] = useState({});

    const [ alert, setAlert ] = useState({});

    useEffect(() => {
        setAccountData(auth);
    }, [auth]);

    const handleSubmit = async e => {
        e.preventDefault();

        // Obtener los datos del state
        const { name, lastname, email } = accountData;

        // Validar el formulario
        if([name, lastname, email].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        // Obtener el mensaje de éxito o error
        const result = await updateAccountData(accountData);

        // Actualizar el state de la alerta
        setAlert(result);
    }

    const { msg } = alert;

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-3xl text-center mt-10'>Editar Datos de la Cuenta</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} 
                <span className='text-indigo-600 font-bold'>información aquí</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    { msg && <Alert alert={alert}/> }

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='my-3'>
                            <label htmlFor="name" className='uppercase font-bold text-gray-600'>Nombre</label>
                            <input 
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='name'
                                value={ accountData.name || '' }
                                onChange={e => setAccountData({
                                    ...accountData, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="lastname" className='uppercase font-bold text-gray-600'>Apellidos</label>
                            <input 
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='lastname'
                                value={ accountData.lastname || '' }
                                onChange={e => setAccountData({
                                    ...accountData, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="email" className='uppercase font-bold text-gray-600'>Correo electrónico</label>
                            <input 
                                type="email"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='email'
                                value={ accountData.email || '' }
                                onChange={e => setAccountData({
                                    ...accountData, 
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <input 
                            type="submit" 
                            value="Guardar Cambios"
                            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
                        />
                    </form>
                </div>
            </div>
        </>
    )
};

export default EditAccount;