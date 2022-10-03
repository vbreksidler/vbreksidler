export interface IService<T> {
  create(obj:unknown):Promise<T>,
  read(): Promise<T[]>,
  readOne(_id:string):Promise<T | null>,
  update(_id:string, obj: unknown): Promise<T | null>
  delete(_id: string):Promise<T | null>,
}