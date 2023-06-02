import useTasks from '../hooks/useTasks';
import Task from './Task';

const TaskList = () => {

    const { tasks } = useTasks();

    return (
        <>
            { tasks.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>Lista de Tareas</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Da seguimiento a tus tareas o {''} 
                        <span className='text-indigo-600 font-bold'>agrega una nueva</span>!
                    </p>

                    { tasks.map(task => (
                        <Task 
                            key={task._id}
                            task={task}
                        />
                    ))}
                </>
            ): 
            (
                <>
                    <h2 className='font-black text-3xl text-center'>No has agregado tareas</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Comienza agregando una, y podrás {''} 
                        <span className='text-indigo-600 font-bold'>verlas aquí</span>!
                    </p>
                </>
            )}
        </>
    )
};

export default TaskList;