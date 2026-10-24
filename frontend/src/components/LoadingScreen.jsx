import { Commet } from 'react-loading-indicators';

const LoadingScreen = () => {
    return (
        <div className="h-screen w-screen justify-center items-center">
            <Commet
                color="#3B82F6"
                size="large"
                text="Loading"
                textColor="#1f2b35"
            />
        </div>
    );
};
export { LoadingScreen };
