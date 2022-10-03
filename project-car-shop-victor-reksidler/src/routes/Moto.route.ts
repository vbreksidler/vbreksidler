import { Router } from 'express';
import Motorcycle from '../models/Motorcycles.model';
import MotosController from '../controllers/motos.Controller';
import MotosService from '../services/motos.Service';

const motoRouter = Router();

const motosModel = new Motorcycle();
const motosService = new MotosService(motosModel);
const motosController = new MotosController(motosService);

motoRouter.route('/')
  .post((req, res) => motosController.create(req, res))
  .get((req, res) => motosController.read(req, res));

motoRouter.route('/:id')
  .get((req, res) => motosController.readOne(req, res))
  .put((req, res) => motosController.update(req, res))
  .delete((req, res) => motosController.delete(req, res));

export default motoRouter;
