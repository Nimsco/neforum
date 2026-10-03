import { useContext } from 'react';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    if (!user) navigate('/login');

    return <h1>Welcome {user.username}</h1>;
};

export default Home;
