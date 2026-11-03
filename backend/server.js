import './src/config/env.js';
import app from './src/app.js';
import connectDB from './src/db/db.js';

connectDB();

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(
        `Server is running on port ${process.env.PORT}`
    );
});
