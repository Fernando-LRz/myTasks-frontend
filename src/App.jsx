import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';

import SignUp from './webpages/SignUp';
import Login from './webpages/Login';
import ConfirmEmail from './webpages/ConfirmEmail';
import ForgotPassword from './webpages/ForgotPassword';
import ResetPassword from './webpages/ResetPassword';
import ManageTasks from './webpages/ManageTasks';
import FavoriteTasks from './webpages/FavoriteTasks';
import EditAccount from './webpages/EditAccount';
import ChangePassword from './webpages/ChangePassword';
import DeleteAccount from './webpages/DeleteAccount';

import { AuthProvider } from './context/AuthProvider';
import { TaskProvider } from './context/TaskProvider';

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
            <TaskProvider>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />}/>
                        <Route path="signup" element={<SignUp />}/>
                        <Route path="reset-password" element={<ForgotPassword />}/>
                        <Route path="reset-password/:token" element={<ResetPassword />}/>
                        <Route path="confirm/:token" element={<ConfirmEmail />}/>
                    </Route>

                    <Route path="/admin" element={<ProtectedRoute />}>
                        <Route index element={<ManageTasks />}/>
                        <Route path="favorite" element={<FavoriteTasks />}/>
                        <Route path="account" element={<EditAccount />}/>
                        <Route path="change-password" element={<ChangePassword />}/>
                        <Route path="delete-account" element={<DeleteAccount />}/>
                    </Route>
                </Routes>
            </TaskProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
