import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Cars.model';
import CarService from '../../../services/cars.Service';
import CarController from '../../../controllers/cars.Controller';
import { Request, Response } from 'express';
import { carMock, carMockWithId, carsMock } from '../../mocks/carMock';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'read')
      .resolves(carsMock);
    sinon
      .stub(carService, 'readOne')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'update')
      .resolves(carMockWithId);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a car', () => {
    it('create sucess', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Find all Cars', () => {
    it('findAll Cars', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carsMock)).to.be.true;

    });
  });

  describe('Find a Car by Id', () => {
    it('findOne Car', async () => {
      req.params = {id: carMockWithId._id};
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Update a Car', () => {
    it('update a Car', async () => {
      req.params = {id: carMockWithId._id};
      req.body = carMock;
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });
});
