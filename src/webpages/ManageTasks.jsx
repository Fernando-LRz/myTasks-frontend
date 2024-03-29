import { useState } from 'react';
import Form from '../components/Form';
import TaskList from '../components/TaskList';

const ManageTasks = () => {
    const [ showForm, setShowForm ] = useState(false);

    return (
        <div className='flex flex-col md:flex-row p-10'>
            <button 
                type='button'
                className='bg-indigo-600 text-white uppercase mx-10 p-3 rounded-md mb-10 md:hidden'
                onClick={ () => setShowForm(!showForm) }
            >{ showForm ? 'Ocultar Formulario' : 'Mostrar Formulario' }</button>

            <div className={ `${ showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-3/5` }>
                <Form />
            </div>
            <div className={ `md:w-1/2 lg:w-2/5` }>
                <TaskList />
            </div>
        </div>
    )
};

export default ManageTasks;