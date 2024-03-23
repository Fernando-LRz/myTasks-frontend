import { useState, useEffect } from 'react';

import useTasks from '../hooks/useTasks';
import Alert from './Alert';

const Form = () => {

    const [ id, setId ] = useState(null);
    const [ name, setName ] = useState('');
    const [ date, setDate ] = useState('');
    const [ time, setTime ] = useState('');
    const [ description, setDescription ] = useState('');

    const [ alert, setAlert ] = useState({});

    const { storeTask, task } = useTasks();

    useEffect(() => {
        if(task?.name) {
            setId(task._id);
            setName(task.name);
            setDate(task.date);
            setTime(task.time);
            setDescription(task.description);
        }
    }, [ task ]);

    const formatDate = (longDate) => {
        const date = longDate.split('T');
        return date[0];
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if([ name, date, time, description ].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        // Enviar los datos del formulario
        storeTask({ name, date, time, description, id });

        // Mostrar una alerta de éxito
        setAlert({
            msg: 'Guardado Correctamente', 
            error: false
        });

        // Reiniciar el formulario
        setId(null);
        setName('');
        setDate('');
        setTime('');
        setDescription('');
    }

    const { msg } = alert;
    
    return (
        <> 
            <h2 className="font-black text-3xl text-center">Registrar tarea</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Crea una nueva {""} 
                <span className="text-indigo-600 font-bold">tarea</span>
            </p>

            <div className="w-4/5 mx-auto">
                { msg && <Alert alert={ alert } /> }
            </div>
            
            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md w-4/5 mx-auto"
                onSubmit={ handleSubmit }
            >
                <div className="mb-5">
                    <label 
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre</label>
                    <input 
                        id="name"
                        type="text" 
                        placeholder="Nombre de la tarea"
                        className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md"
                        value={ name }
                        onChange={ e => setName(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="date"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha</label>
                    <input 
                        id="date"
                        type="date" 
                        className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md"
                        value={ formatDate(date) }
                        onChange={ e => setDate(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="time"
                        className="text-gray-700 uppercase font-bold"
                    >Hora</label>
                    <input 
                        id="time"
                        type="time" 
                        className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md"
                        value={ time }
                        onChange={ e => setTime(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold"
                    >Descripción</label>
                    <textarea
                        id="description"
                        placeholder="Descripción de la tarea"
                        className="border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md"
                        value={ description }
                        onChange={ e => setDescription(e.target.value) }
                    ></textarea> 
                </div>

                <input 
                    type="submit"
                    value={ id ? "Guardar cambios" : "Guardar Tarea" }
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                    hover:bg-indigo-800 cursor-pointer transition-colors" 
                />
            </form>
        </>
    )
};

export default Form;