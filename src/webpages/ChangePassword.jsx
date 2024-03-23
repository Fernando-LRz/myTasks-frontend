import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';

const changePassword = () => {

    const [ alert, setAlert ] = useState({});

    const [ password, setPassword ] = useState({
        current_pwd : '',
        new_pwd: ''
    });

    const { changePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el formulario
        if(Object.values(password).some(pass => pass === '')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        // Validar la longitud de la contraseña
        if(password.new_pwd.length < 6) {
            setAlert({
                msg: 'La contraseña debe tener mínimo seis caracteres',
                error: true
            });

            return;
        }
        // Obtener el mensaje de éxito o error
        const response = await changePassword(password);

        // Actualizar el state de la alerta
        setAlert(response);
    }

    const { msg } = alert;

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-3xl text-center mt-10'>Cambiar contraseña</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} 
                <span className='text-indigo-600 font-bold'>contraseña aquí</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    { msg && <Alert alert={ alert }/> }

                    <form
                        onSubmit={ handleSubmit }
                    >
                        <div className='my-3'>
                            <label htmlFor="name" className='uppercase font-bold text-gray-600'>Contraseña actual</label>
                            <input 
                                type="password"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='current_pwd'
                                placeholder='Ingresa tu contraseña actual'
                                onChange={ e => setPassword({
                                    ...password, 
                                    [ e.target.name ] : e.target.value
                                })}
                            />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="name" className='uppercase font-bold text-gray-600'>Nueva contraseña</label>
                            <input 
                                type="password"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='new_pwd'
                                placeholder='Ingresa tu nueva contraseña'
                                onChange={ e => setPassword({
                                    ...password, 
                                    [ e.target.name ] : e.target.value
                                })}
                            />
                        </div>
                        <input 
                            type="submit" 
                            value="Actualizar Contraseña"
                            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
                        />
                    </form>
                </div>
            </div>
        </>
    )
};
  
export default changePassword;