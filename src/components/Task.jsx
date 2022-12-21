import useTasks from '../hooks/useTasks';

const Task = ({task}) => {

    const { _id, name, date, time, description, favorite } = task;

    const { setTaskData, changeFavoriteStatus, deleteTask } = useTasks();

    const formatDate = (longDate) => {
        const date = longDate.split('T');
        return date[0];
    };

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-gray-500 my-2">Nombre: {''}
                <span className="font-normal normal-case text-black">{name}</span>
            </p>
            <p className="font-bold uppercase text-gray-500 my-2">Fecha: {''}
                <span className="font-normal normal-case text-black">{formatDate(date)}</span>
            </p>
            <p className="font-bold uppercase text-gray-500 my-2">Hora: {''}
                <span className="font-normal normal-case text-black">{time}</span>
            </p>
            <p className="font-bold uppercase text-gray-500 my-2">Descripción: {''}
                <span className="font-normal normal-case text-black">{description}</span>
            </p>
            <p className="font-bold uppercase text-gray-500 my-2">Favorito: {''}
                <span className="font-normal normal-case text-black">{favorite ? 'Sí' : 'No'}</span>
            </p>

            <div className="flex justify-between my-5">
                <button
                  type="button"
                  className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                  onClick={() => setTaskData(task)}
                >Editar</button>
                <button
                  type="button"
                  className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                  onClick={() => deleteTask(_id)}
                >Eliminar</button>
                <button
                  type="button"
                  className="py-2 px-10 bg-cyan-600 hover:bg-cyan-700 text-white uppercase font-bold rounded-lg"
                  onClick={() => changeFavoriteStatus(_id)}
                >{favorite ? 'Remover' : 'Favorito'}</button>
            </div>
        </div>
    )
};

export default Task;