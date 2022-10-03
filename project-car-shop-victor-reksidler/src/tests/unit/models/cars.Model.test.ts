import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Cars.model';
import { carMock, carMockWithId, carsMock } from '../../mocks/carMock';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'read')
      .resolves(carsMock);
    sinon
      .stub(carModel, 'readOne')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'update')
      .resolves(carMockWithId);

  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a car', () => {
    it('create sucess', async () => {
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Find all Cars', () => {
    it('findAll Cars', async () => {
      const cars = await carModel.read();
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
