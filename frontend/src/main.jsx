import { createRoot } from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UserContextProvider from './context/UserContextProvider.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        ></ToastContainer>
    </>
);
