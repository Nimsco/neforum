import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

app.use(express.json({ limit: '16kb' }));
app.use(
    express.urlencoded({ extended: true, limit: '16kb' })
);
app.use(cookieParser());

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

//routes import
import userRoutes from './routes/user.routes.js';

//routes
app.use('/api/users', userRoutes);

export default app;
