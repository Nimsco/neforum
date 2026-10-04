import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <div className="flex-1 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
