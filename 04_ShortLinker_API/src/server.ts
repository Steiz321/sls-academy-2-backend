import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import AppRouter from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import connectDB from "./config/db";

const app = express();
const router = new AppRouter(app);

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.init();

const PORT = process.env.PORT || 5000;

app.use(errorMiddleware);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
