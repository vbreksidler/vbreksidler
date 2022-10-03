import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    const created = await this._service.create(car);
    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const allCars = await this._service.read();
    res.status(200).json(allCars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._service.readOne(req.params.id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    const carUptaded = await this._service.update(req.params.id, car);
    return res.status(200).json(carUptaded);
  }

  public async delete(req: Request, res: Response) {
    const carDeleted = await this._service.delete(req.params.id);
    return res.status(204).json(carDeleted);
  }
}

export default CarsController;