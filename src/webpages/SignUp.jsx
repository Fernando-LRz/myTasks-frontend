import { useState } from 'react';
import { Link } from 'react-router-dom';

import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const SignUp = () => {

    const [ name, setName ] = useState(''); 
    const [ lastname, setLastname ] = useState(''); 
    const [ email, setEmail ] = useState(''); 
    const [ password, setPassword ] = useState(''); 
    const [ repeatPassword, setRepeatPassword ] = useState(''); 

    const [ alert, setAlert ] = useState({});

    const handleSubmit = async e => {
      e.preventDefault();
      
      // Validar formulario
      if([ name, lastname, email, password, repeatPassword ].includes('')){
          setAlert({ msg: 'Todos los campos son obligatorios', error: true });
          return;
      }

      if(password !== repeatPassword) {
          setAlert({ msg: 'Las contraseñas no coinciden', error: true });
          return;
      }

      if(password.length < 6) {
          setAlert({ msg: 'La contraseña debe tener mínimo seis caracteres', error: true });
          return;
      }

      // Poner la alerta como un objeto vacio
      setAlert({});

      try {
        // Enviar la petición para registrar al usuario
        await axiosClient.post('/user', { name, lastname, email, password });

        // Mostrar alerta de éxito
        setAlert({
          msg: 'Cuenta creada correctamente, confirme su e-mail para comenzar a utilizarla.',
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
                    Crea una cuenta en {""}
                    <span className="text-black">myTasks</span>
                </h1>     
          </div>

          <div className="md:mt-5 shadow-lg rounded-xl px-5 py-10 bg-white">
              { 
                msg &&  <Alert 
                    alert={ alert } 
                />
              }

              <form onSubmit={ handleSubmit }>
                  <div className="my-5">
                      <label  
                          className="uppercase text-gray-600 block text-xl font-bold">
                          Nombre
                      </label>
                      <input 
                          type="text" 
                          placeholder="Ingresa tu nombre" 
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                          value={ name }
                          onChange={ e => setName(e.target.value) }
                      />
                  </div>

                  <div className="my-5">
                      <label  
                          className="uppercase text-gray-600 block text-xl font-bold">
                          Apellidos
                      </label>
                      <input 
                          type="text" 
                          placeholder="Ingresa tus apellidos" 
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                          value={ lastname }
                          onChange={ e => setLastname(e.target.value) }
                      />
                  </div>

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

                  <div className="my-5">
                      <label  
                          className="uppercase text-gray-600 block text-xl font-bold">
                          Contraseña
                      </label>
                      <input 
                          type="password" 
                          placeholder="Escribe una contraseña" 
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                          value={ password }
                          onChange={ e => setPassword(e.target.value) }
                      />
                  </div>

                  <div className="my-5">
                      <label  
                          className="uppercase text-gray-600 block text-xl font-bold">
                          Confirmar contraseña
                      </label>
                      <input 
                          type="password" 
                          placeholder="Confirma tu contraseña" 
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                          value={ repeatPassword }
                          onChange={ e => setRepeatPassword(e.target.value) }
                      />
                  </div>

                  <input 
                      type="submit"
                      value="Crear Cuenta"
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
                      to="/reset-password">Olvidé mi contraseña
                  </Link>
              </nav>
          </div>
      </>
    )
};
  
export default SignUp;