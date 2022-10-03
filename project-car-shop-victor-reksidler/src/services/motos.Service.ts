import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { IMotorcycle, IMotoZodSchema } from '../interfaces/IMotorcycle';

class MotosService implements IService<IMotorcycle> {
  constructor(private _moto: IModel<IMotorcycle>) { }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._moto.read();
    return result;
  }
  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const result = await this._moto.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result as IMotorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = IMotoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const moto = await this._moto.update(_id, parsed.data);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto as IMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const moto = await this._moto.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    const deleteSuccess = await this._moto.delete(_id);
    return deleteSuccess;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._moto.create(parsed.data);

    return created;
  }
}

export default MotosService;
