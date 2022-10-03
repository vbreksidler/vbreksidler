import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
};

const carMockWithId: ICar & { _id: string, __v: number } = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "doorsQty": 2,
  "seatsQty": 2,
  "_id": "63233a758ea4a6f1b5865cc5",
  "__v": 0
}

const carsMock = [
  {
    "model": "Ferrari Maranello",
    "year": 1963,
    "color": "red",
    "buyValue": 3500000,
    "doorsQty": 2,
    "seatsQty": 2,
    "_id": "63233a758ea4a6f1b5865cc5",
    "__v": 0
  },
  {
    "model": "Camaro",
    "year": 1980,
    "color": "red",
    "buyValue": 3000000,
    "doorsQty": 2,
    "seatsQty": 2,
    "_id": "63233a758ea4a6f1a2000cc5",
    "__v": 0
  },
]
export { carMock, carMockWithId, carsMock };