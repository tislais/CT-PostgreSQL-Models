import express from 'express';
import beersController from './controllers/beers.js';
import cubesController from './controllers/cubes.js';
import moviesController from './controllers/movies.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(beersController);
app.use(cubesController);
app.use(moviesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
