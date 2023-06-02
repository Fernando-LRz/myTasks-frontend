import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';

// Crear el context de las tareas
const TaskContext = createContext();

// Crear el provider de las tareas
const TaskProvider = ({children}) => {

    const [ tasks, setTasks ] = useState([]);
    const [ task, setTask ] = useState({});

    const { auth } = useAuth();

    const navigate = useNavigate();
    
    useEffect(() => {

        const getTasks = async () => {
            try {
                // Obtener el JWT
                const token = localStorage.getItem('myTasks_token');

                if(!token) return;

                // Crear el objeto de configuración
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                // Enviar la petición para obtener los registros
                const { data } = await axiosClient('/tasks', config);

                // Actualizar el state
                setTasks(data);

            } catch (error) {
                console.log(error);
            }
        }

        getTasks();
    }, [auth]);

    const storeTask = async (task) => {
        // Obtener el JWT
        const token = localStorage.getItem('myTasks_token');

        // Crear el objeto de configuración
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if(task.id) {
            try {
                // Enviar la petición para actualizar el registro
                const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);
                
                // Actualizar la lista de tareas
                const updatedTasks = tasks.map( stateTask => stateTask._id === data._id ? data : stateTask );

                // Actualizar el state
                setTasks(updatedTasks);
                
            } catch (error) {
                console.log('Error: ', error);
            }

        } else {
            try {
                // Enviar la petición para almacenar el registro
                const { data } = await axiosClient.post('/tasks', task, config);
    
                // Crear un objeto con los datos que requiere el state
                const { createdAt, updatedAt, __var, ...storedTask } = data;
    
                // Actualizar el state
                setTasks([storedTask, ...tasks]);
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        // Reiniciar el state a un objeto vacio
        setTask({});
    };

    const setTaskData = (task) => {
        setTask(task);
        navigate('/admin');
    };

    const changeFavoriteStatus = async (id) => {
        // Obtener el JWT
        const token = localStorage.getItem('myTasks_token');

        // Crear el objeto de configuración
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            // Enviar la petición para actualizar el registro
            const { data } = await axiosClient.put(`/tasks/favorite/${id}`, task, config);
            
            // Actualizar la lista de tareas
            const updatedTasks = tasks.map( stateTask => stateTask._id === data._id ? data : stateTask );

            // Actualizar el state
            setTasks(updatedTasks);
            
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const deleteTask = async (id) => {
        const confirmation = confirm('¿Eliminar la tarea?');

        if(confirmation) {
            try {
                // Obtener el JWT
                const token = localStorage.getItem('myTasks_token');

                // Crear el objeto de configuración
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                // Enviar la petición para eliminar el registro
                await axiosClient.delete(`/tasks/${id}`, config);

                // Actualizar la lista de tareas
                const updatedTasks = tasks.filter( stateTask => stateTask._id !== id );

                // Actualizar el state
                setTasks(updatedTasks);
                
            } catch (error) {
                console.log('Error', error);
            }
        }
    }; 

    return (
        <TaskContext.Provider
            value={{
                tasks, 
                storeTask, 
                setTaskData,
                task,
                changeFavoriteStatus,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export {
    TaskProvider
}

export default TaskContext;