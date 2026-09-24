import "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});