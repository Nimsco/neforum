import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'https://neforum.vercel.app',
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
            } else {
                callback(new Error('Not allowed by CORS'));
            }
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

//health
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NeForum API is running',
    });
});

export default app;
