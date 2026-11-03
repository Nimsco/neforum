import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserContextProvider from './context/userContext/UserContextProvider.jsx';
import PostContextProvider from './context/postContext/PostContextProvider.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import NotFound from './NotFound.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import {
    Login,
    Register,
    About,
    Contact,
    Home,
    Profile,
    Reports,
    CreatePost,
    PostDetails,
} from './routes/lazyPages.jsx';

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
            {
                path: '/posts/:postId',
                element: <PostDetails />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <PostContextProvider>
                <Suspense fallback={<LoadingScreen />}>
                    <RouterProvider router={router} />
                </Suspense>
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
