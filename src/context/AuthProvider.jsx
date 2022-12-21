import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axios';

// Crear el context de la app
const AuthContext = createContext();

// Crear el provider de la app
const AuthProvider = ({children}) => {

    const [ loading, setLoading ] = useState(true);
    const [ auth, setAuth ] = useState({});

    useEffect(() => { 

        const authenticateUser = async () => {
            // Obtener el JWT 
            const token = localStorage.getItem('myTasks_token');
            
            if(!token) {
                setLoading(false);
                return;
            }

            // Crear el header de configuración de axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                // Enviar la petición para obtener los datos del usuario
                const { data } = await axiosClient('/user/account', config);
                
                // Actualizar el state con los datos del usuario
                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg);

                // Actualizar el state como un objeto vacio
                setAuth({});
            }
            
            setLoading(false);
        };

        authenticateUser();
    }, []);

    const logOut = () => {
        // Remover el JWT de local storage
        localStorage.removeItem('myTasks_token');

        // Reiniciar el state a un objeto vacío
        setAuth({});
    };

    const updateAccountData = async (accountData) => {
        // Obtener el JWT 
        const token = localStorage.getItem('myTasks_token');

        if(!token) {
            setLoading(false);
            return;
        }

        // Crear el header de configuración de axios
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            // Enviar la petición para actualizar el registro
            const url = `/user/account/${accountData._id}`;
            await axiosClient.put(url, accountData, config);

            // Actualizar el state
            setAuth(accountData);

            return {
                msg: 'Almacenado Correctamente', 
                error: false
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    };

    const changePassword = async (password) => {
        // Obtener el JWT 
        const token = localStorage.getItem('myTasks_token');

        if(!token) {
            setLoading(false);
            return;
        }

        // Crear el header de configuración de axios
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            // Enviar la petición para actualizar el registro
            const url = '/user/change-password';
            const { data } = await axiosClient.put(url, password, config);

            return {
                msg: data.msg,
                error: false
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg, 
                error: true
            }
        }
    };

    const deleteAccount = async (id) => {
        const confirmation = confirm('¿Eliminar mi cuenta?');

        if(confirmation) {            
            // Obtener el JWT 
            const token = localStorage.getItem('myTasks_token');
    
            if(!token) {
                setLoading(false);
                return;
            }
    
            // Crear el header de configuración de axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
    
            try {
                // Enviar la petición para eliminar el registro
                const url = `/user/delete-account/${id}`;
                const { data } = await axiosClient.get(url, config);
    
                return {
                    msg: data.msg,
                    error: false
                }
                
            } catch (error) {
                return {
                    msg: error.response.data.msg, 
                    error: true
                }
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth, loading, logOut, updateAccountData, changePassword, deleteAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider
};

export default AuthContext;