import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {

    const { auth } = useAuth();

    return (
        <>  
            <Header />
                { auth?._id ? (
                        <main className="container mx-auto mt-10">
                            <Outlet />
                        </main>
                    ) : <Navigate to="/" />
                } 
            <Footer /> 
        {/* 
            <Header />
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            <Footer /> 
        */}
        </>
    )
};

export default ProtectedRoute;