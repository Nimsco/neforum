import Sidebar from '../../components/Home/Sidebar';
import HeroSection from '../../components/Home/HeroSection';
import ConversationFeed from '../../components/Home/ConversationFeed';
import CommunityCard from '../../components/Home/CommunityCard';

const Home = () => {
    return (
        <div className="mx-auto flex w-full max-w-6xl px-4 sm:px-6">
            {/* Left nav */}
            <Sidebar />

            {/* Main column */}
            <main className="flex min-w-0 flex-1">
                <div className="min-w-0 flex-1 pb-16 lg:pr-8">
                    <HeroSection />

                    <div className="flex gap-8 xl:gap-12">
                        <div className="min-w-0 flex-1">
                            <ConversationFeed />
                        </div>
                        <CommunityCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
