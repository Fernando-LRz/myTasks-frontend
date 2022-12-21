import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';
import axiosClient from '../config/axios';

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar formulario
        if([email, password].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }                                                                                                                                                                                                      
        try {
            // Enviar la petición para auténticar las credenciales
            const { data } = await axiosClient.post('/user/login', { email, password });

            // Almacenar el JWT
            localStorage.setItem('myTasks_token', data.token);

            // Actualizar el state
            setAuth(data);

            // Redireccionar al panel de administración
            navigate('/admin');

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
                    Administra tus Tareas con {""}
                    <span className="text-black">myTasks</span>
                </h1>     
            </div>
            <div className="mt-20 md:mt-5 shadow-lg rounded-xl px-5 py-10 bg-white">

                { msg &&  <Alert 
                    alert={alert} 
                />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label  
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Correo Electrónico
                        </label>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="Ingresa tu contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold 
                        hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/signup" >¿No tienes una cuenta? Registrate
                    </Link>
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/reset-password">Olvidé mi contraseña
                    </Link>
                </nav>
            </div>
        </>
    )
};
  
export default Login;