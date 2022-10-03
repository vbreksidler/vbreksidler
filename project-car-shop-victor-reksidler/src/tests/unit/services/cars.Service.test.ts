import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Cars.model';
import CarService from '../../../services/cars.Service';
import { carMock, carMockWithId, carsMock } from '../../mocks/carMock';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'read')
      .resolves(carsMock);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);

  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a car', () => {
    it('create sucess', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Find all Cars', () => {
    it('findAll Cars', async () => {
      const cars = await carService.read();

      expect(cars).to.be.deep.equal(carsMock);
    });
  });

  describe('Find a Car by Id', () => {
    it('findOne Car', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Update a Car', () => {
    it('update a Car', async () => {
      const car = await carModel.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
});
