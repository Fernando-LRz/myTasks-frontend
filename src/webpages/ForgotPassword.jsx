import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const ForgotPassword = () => {

    const [ email, setEmail ]  = useState('');
    const [ alert, setAlert ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar formulario
        if(email === '') {
            setAlert({
                msg: 'El correo electrónico es obligatorio',
                error: true
            });

            return;
        }

        try {
            // Enviar la petición para restablecer la contraseña
            const { data } = await axiosClient.post('/user/reset-password', { email });
            
            // Mostrar alerta de éxito
            setAlert({
                msg: data.msg,
                error: false
            });
            
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
                Recupera el acceso a tu cuenta de {""}
                <span className="text-black">myTasks</span>
            </h1>     
        </div>
        <div className="mt-20 md:mt-5 shadow-lg rounded-xl px-5 py-10 bg-white">

            { 
                msg &&  <Alert 
                    alert={ alert } 
                />
            }

            <form
                onSubmit={ handleSubmit }
            >
                <div className="my-5">
                    <label  
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Correo Electrónico
                    </label>
                    <input 
                        type="email" 
                        placeholder="Ingresa tu correo electrónico" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Enviar instrucciones"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold 
                    hover:bg-indigo-800 hover:cursor-pointer md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
                className="block text-center my-5 text-gray-500"
                to="/" >¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link 
                className="block text-center my-5 text-gray-500"
                to="/signup" >¿No tienes una cuenta? Registrate
            </Link>
            </nav>
        </div>
      </>
    )
}
  
export default ForgotPassword;