import { OrbitProgress } from 'react-loading-indicators';

const LoadingScreen = ({ fullHeight = false }) => {
    return (
        <div
            className={`flex ${fullHeight ? 'min-h-screen' : 'min-h-[calc(100vh-3.5rem)]'} w-full items-center justify-center`}
        >
            <OrbitProgress
                variant="track-disc"
                dense
                color="#3B82F6"
                size="large"
                text=""
                textColor="#NaNNaNNaN"
            />
        </div>
    );
};
export { LoadingScreen };
