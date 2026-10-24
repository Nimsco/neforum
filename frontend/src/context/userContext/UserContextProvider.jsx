import { useEffect, useState } from 'react';
import UserContext from './userContext';
import { refreshAccessToken } from '../../api/auth.api';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] =
        useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const response = await refreshAccessToken();

                setUser({
                    ...response.user,
                    accessToken: response.accessToken,
                });
            } catch (error) {
                setUser(null);
            } finally {
                setIsAuthLoading(false);
            }
        };
        restoreSession();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser, isAuthLoading }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
