import { Test, TestingModule } from '@nestjs/testing';
import { GetInfosController } from './get-infos.controller';
import { GetInfosService } from './get-infos.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

describe('GetInfosController', () => {
  let controller: GetInfosController;
  let service: GetInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetInfosController],
      providers: [{
        provide: GetInfosService,
        useValue: {
          getTermos: jest.fn(),
          getPoliticas: jest.fn(),
        }
      },
      {
        provide: PrismaService,
        useValue: {}
      },
      {
        provide: JwtService,
        useValue: {}
      }
      ],
    }).compile();

    controller = module.get<GetInfosController>(GetInfosController);
    service = module.get<GetInfosService>(GetInfosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('getTermos', () => {
    it('should be defined', () => {
      expect(controller.getTermos).toBeDefined();
    });
    it('should return fail', async () => {
      jest.spyOn(service, 'getTermos').mockRejectedValue(new Error('Error getting termos'));
      await expect(controller.getTermos()).rejects.toThrowError('Error getting termos');
    });
  })

  describe('getPoliticas', () => {
    it('should be defined', () => {
      expect(controller.getPoliticas).toBeDefined();
    });
    it('should return fail', async () => {
      jest.spyOn(service, 'getPoliticas').mockRejectedValue(new Error('Error getting politicas'));
      await expect(controller.getPoliticas()).rejects.toThrowError('Error getting politicas');
    });
  })
});
