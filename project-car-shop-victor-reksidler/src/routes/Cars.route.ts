import { Router } from 'express';
import CarsController from '../controllers/cars.Controller';
import Cars from '../models/Cars.model';
import CarsService from '../services/cars.Service';

const carsRouter = Router();

const carsModel = new Cars();
const carsService = new CarsService(carsModel);
const carsContreller = new CarsController(carsService);

carsRouter.route('/')
  .post((req, res) => carsContreller.create(req, res))
  .get((req, res) => carsContreller.read(req, res));

carsRouter.route('/:id')
  .get((req, res) => carsContreller.readOne(req, res))
  .put((req, res) => carsContreller.update(req, res))
  .delete((req, res) => carsContreller.delete(req, res));

export default carsRouter;
