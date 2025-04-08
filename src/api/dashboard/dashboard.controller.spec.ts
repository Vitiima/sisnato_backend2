import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { error } from 'console';


const empreendimentos = [
  {
    id: 1,
    nome: 'Empreendimento 1',
    cidade: 'Cidade 1',
    estado: 'Estado 1',
    cep: '12345-678',
    logradouro: 'Rua 1',  
    numero: '123',
    complemento: 'Complemento 1',
    bairro: 'Bairro 1',
  },
  {
    id: 2,
    nome: 'Empreendimento 2',
    cidade: 'Cidade 2',
    estado: 'Estado 2',
    cep: '12345-678',
    logradouro: 'Rua 2',  
    numero: '123',
    complemento: 'Complemento 2',
    bairro: 'Bairro 2',
  },
];

const construtoras = [
  {
    id: 1,
    fantasia: 'Construtora 1',
  },
  {
    id: 2,
    fantasia: 'Construtora 2',
  },
];

const financeiras = [
  {
    id: 1,
    fantasia: 'Financeira 1',
  },
  {
    id: 2,
    fantasia: 'Financeira 2',
  },
];

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getEmpreendimentos: jest.fn().mockResolvedValue(empreendimentos),
            getConstrutoras: jest.fn().mockResolvedValue(construtoras),
            getFinanceiras: jest.fn().mockResolvedValue(financeiras),
          }
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fake-jwt-token'),
            verify: jest.fn().mockReturnValue({ userId: 1 }),
          },
        }
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmpreendimentos', () => {
    it('should return an array of empreendimentos', async () => {
      const result = await controller.getEmpreendimentos();
      expect(result).toBeInstanceOf(Array);
    });
    it('should fail to return an array of empreendimentos', async () => {
      jest.spyOn(controller, 'getEmpreendimentos').mockRejectedValue(error);
      await expect(controller.getEmpreendimentos()).rejects.toEqual(error);
    });
  })

  describe('getConstrutoras', () => {
    it('should return an array of construtoras', async () => {
      const result = await controller.getConstrutoras();
      expect(result).toBeInstanceOf(Array);
    });
    it('should fail to return an array of construtoras', async () => {
      jest.spyOn(controller, 'getConstrutoras').mockRejectedValue(error);
      await expect(controller.getConstrutoras()).rejects.toEqual(error);
    });
  })

  describe('getFinanceiras', () => {
    it('should return an array of financeiras', async () => {
      const result = await controller.getFinanceiras();
      expect(result).toBeInstanceOf(Array);
    });
    it('should fail to return an array of financeiras', async () => {
      jest.spyOn(controller, 'getFinanceiras').mockRejectedValue(error);
      await expect(controller.getFinanceiras()).rejects.toEqual(error);
    }); 
  })
});
