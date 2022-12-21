import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';
 
const ConfirmEmail = () => {

    const [ confirmedEmail, setConfirmedEmail ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ alert, setAlert ] = useState({});

    // Obtener el token de la URL 
    const params = useParams();
    const { token } = params; 

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                // Enviar la petición para confirmar el e-mail
                const url = `/user/confirm/${token}`;
                const { data } = await axiosClient(url);

                // Actualizar el state del e-mail
                setConfirmedEmail(true);

                // Mostrar alerta de éxito
                setAlert({
                  msg: data.msg
                });

            } catch (error) {
                // Mostrar alerta de error
                setAlert({ 
                  msg: error.response.data.msg,
                  error: true
                });
            }

            setLoading(false);
        };

        confirmEmail();
    }, []);

    return (
      <>
          <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu E-mail y Comienza a Administrar tus tareas con {""}
                    <span className="text-black">myTasks</span>
                </h1>     
          </div>

          <div className="mt-20 md:mt-5 shadow-lg rounded-xl px-5 py-10 bg-white">
              { !loading &&  <Alert 
                  alert={alert} 
              />}

              { confirmedEmail && (
                  <Link 
                      className="block text-center my-5 text-gray-500"
                      to="/">Iniciar sesión
                  </Link>
              )}
          </div>
      </>
    )
};
  
export default ConfirmEmail;