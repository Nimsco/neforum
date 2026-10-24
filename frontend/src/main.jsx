import { createRoot } from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Reports from './pages/Reports/Reports.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import UserContextProvider from './context/userContext/UserContextProvider.jsx';
import PostContextProvider from './context/postContext/PostContextProvider.jsx';
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
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/reports',
                element: <Reports />,
            },
            {
                path: '/create-post',
                element: <CreatePost />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <PostContextProvider>
                <RouterProvider router={router} />
            </PostContextProvider>
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
