import { ICarZodSchema, ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }

  public async read(): Promise<ICar[]> {
    const result = await this._cars.read();
    return result;
  }
  public async readOne(_id: string): Promise<ICar | null> {
    const result = await this._cars.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result as ICar;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = ICarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const car = await this._cars.update(_id, parsed.data);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car as ICar;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const car = await this._cars.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    const deleteSuccess = await this._cars.delete(_id);
    return deleteSuccess;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = ICarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._cars.create(parsed.data);

    return created;
  }
}

export default CarsService;
