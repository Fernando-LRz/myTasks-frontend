import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const ResetPassword = () => {

    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState({});
    const [ authenticToken, setAuthenticToken ] = useState(false);
    const [ newPassword, setNewPassword ] = useState(false);

    // Obtener el token de la URL
    const params = useParams();
    const { token } = params;

    useEffect(() => {

        const verifyToken = async () => {
            try {
                // Enviar la petición para verificar que el token sea auténtico
                await axiosClient(`/user/reset-password/${token}`);

                // Mostrar mensaje de éxito
                setAlert({
                    msg: 'Escribe tu nueva contraseña',
                    error: false
                });

                // Actualizar el state del token
                setAuthenticToken(true);
                
            } catch (error) {
                // Mostrar alerta de error
                setAlert({
                    msg: 'Hubo un error con el enlace',
                    error: true
                });
            }
        };

        verifyToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar formulario
        if(password.length < 6) {
            setAlert({ msg: 'La contraseña debe tener mínimo seis caracteres', error: true });
            return;
        }

        try {
            // Enviar la petición para almacenar la nueva contraseña
            const url = `/user/reset-password/${token}`;
            const { data } = await axiosClient.post(url, { password });

            // Mostrar alerta de éxito
            setAlert({
                msg: data.msg,
                error: false
            }); 

            // Actualizar el state del password
            setNewPassword(true);

        } catch (error) {
            // Mostrar alerta de error
            setAlert({
                msg: error.response.data.msg,
                error: true
            }); 
        }
    };

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Restablece tu contraseña en {""}
                    <span className="text-black">myTasks</span>
                </h1>     
            </div>

            <div className="mt-20 md:mt-5 shadow-lg rounded-xl px-5 py-10 bg-white">

                { 
                    msg &&  <Alert 
                        alert={ alert } 
                    />
                }

                { authenticToken && (
                    <>
                        <form onSubmit={ handleSubmit }>
                            <div className="my-5">
                                <label  
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                    Nueva contraseña
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Ingresa tu nueva contraseña" 
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={ password }
                                    onChange={ e => setPassword(e.target.value) }
                                />
                            </div>

                            <input 
                                type="submit"
                                value="Guardar Contraseña"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold 
                                hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                            />
                        </form>
                    </>     
                )}

                { 
                    newPassword && 
                        <nav className="mt-10 lg:flex lg:justify-between">
                            <Link 
                                className="block text-center my-5 text-gray-500"
                                to="/" >Iniciar Sesión
                            </Link>

                            <Link 
                                className="block text-center my-5 text-gray-500"
                                to="/signup" >¿Necesitas una cuenta nueva? Crear Cuenta
                            </Link>
                        </nav>
                }

            </div>
        </>
    )
};

export default ResetPassword;