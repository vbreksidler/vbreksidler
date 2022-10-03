import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotosController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const moto = { model, year, color, buyValue, category, engineCapacity };
    const created = await this._service.create(moto);
    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const allMotos = await this._service.read();
    res.status(200).json(allMotos);
  }

  public async readOne(req: Request, res: Response< IMotorcycle | null>) {
    const moto = await this._service.readOne(req.params.id);
    return res.status(200).json(moto);
  }

  public async update(req: Request, res: Response< IMotorcycle | null>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const moto = { model, year, color, buyValue, category, engineCapacity };
    const motoUptaded = await this._service.update(req.params.id, moto);
    return res.status(200).json(motoUptaded);
  }

  public async delete(req: Request, res: Response) {
    const motoDeleted = await this._service.delete(req.params.id);
    return res.status(204).json(motoDeleted);
  }
}

export default MotosController;