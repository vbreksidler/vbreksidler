import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carsRouter from './routes/Cars.route';
import motoRouter from './routes/Moto.route';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);
app.use('/motorcycles', motoRouter);

app.use(errorHandler);

export default app;
