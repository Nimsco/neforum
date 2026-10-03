import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
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
        origin: 'http://localhost:5173',
        credentials: true,
        methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
        ],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

//routes import
import userRoutes from './routes/user.routes.js';

//routes
app.use('/api/users', userRoutes);

//error handler
app.use(errorHandler);

export default app;
