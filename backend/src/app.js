import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
const allowedOrigins = [
    ...(process.env.CLIENT_URL || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://192.168.1.66:5173',
];

app.use(express.json({ limit: '16kb' }));
app.use(
    express.urlencoded({ extended: true, limit: '16kb' })
);
app.use(cookieParser());

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin)
            ) {
                callback(null, true);
                return;
            }
            callback(
                new Error('Origin is not allowed by CORS.')
            );
        },
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
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

//error handler
app.use(errorHandler);

export default app;
