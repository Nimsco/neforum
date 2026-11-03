import { lazy } from 'react';

export const Login = lazy(
    () => import('../pages/Login/Login.jsx')
);
export const Register = lazy(
    () => import('../pages/Register/Register.jsx')
);
export const About = lazy(
    () => import('../pages/About/About.jsx')
);
export const Contact = lazy(
    () => import('../pages/Contact/Contact.jsx')
);
export const Home = lazy(
    () => import('../pages/Home/Home.jsx')
);
export const Profile = lazy(
    () => import('../pages/Profile/Profile.jsx')
);
export const Reports = lazy(
    () => import('../pages/Reports/Reports.jsx')
);
export const CreatePost = lazy(
    () => import('../pages/CreatePost/CreatePost.jsx')
);
export const PostDetails = lazy(
    () => import('../pages/PostDetails/PostDetails.jsx')
);
