import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));


export default app;

