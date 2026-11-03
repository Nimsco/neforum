import { useContext } from 'react';
import UserContext from '../context/userContext/userContext';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { LoadingScreen } from '../components/LoadingScreen';

const ProtectedRoute = () => {
    const { user, isAuthLoading } = useContext(UserContext);
    // Temporarily bypass authentication check if you just want to preview the UI without logging in.
    // Otherwise, uncomment the line below:
    // if (!user) return <Navigate to="/login" replace />;

    if (isAuthLoading) {
        return <LoadingScreen fullHeight />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Layout />;
};

export default ProtectedRoute;
