import FavoriteTaskList from '../components/FavoriteTaskList';

const FavoriteTasks = () => {

    return (
        <div className='flex flex-col justify-center md:flex-row py-10'>
            <div className={ `md:w-1/2 lg:w-2/5` }>
                <FavoriteTaskList />
            </div>
        </div>
    )
};

export default FavoriteTasks;