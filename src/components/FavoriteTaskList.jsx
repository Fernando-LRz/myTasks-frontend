import { useState, useEffect } from 'react';
import useTasks from '../hooks/useTasks';
import Task from './Task';

const FavoriteTaskList = () => {

    const { tasks } = useTasks();
    const [ favoriteTasks, setFavoriteTasks ] = useState([]);

    useEffect(() => {
        const favoriteTasksList = tasks.filter(task => task.favorite === true);
        setFavoriteTasks([...favoriteTasksList]);
    }, [tasks]);

    return (
        <>
            { favoriteTasks.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>Tareas Favoritas</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Da seguimiento a tus tareas o {''} 
                        <span className='text-indigo-600 font-bold'>agrega una nueva</span>!
                    </p>

                    { favoriteTasks.map(task => (
                        <Task 
                            key={task._id}
                            task={task}
                        />
                    ))}
                </>
            ): 
            (
                <>
                    <h2 className='font-black text-3xl text-center'>No has agregado tareas como favoritas</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Comienza agregando una, y podrás {''} 
                        <span className='text-indigo-600 font-bold'>verlas aquí</span>!
                    </p>
                </>
            )}
        </>
    )
};

export default FavoriteTaskList;