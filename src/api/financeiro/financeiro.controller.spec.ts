import { Test, TestingModule } from '@nestjs/testing';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';

const createFinanceiroDto: CreateFinanceiroDto = {
  cnpj: '',
  razaosocial: '',
  tel: '',
  email: '',
  content: '',
  responsavelId: 0,
  fantasia: '',
  contrutoras: [0]
}

const updateFinanceiroDto: CreateFinanceiroDto = {
  cnpj: '',
  razaosocial: '',
  tel: '',
  email: '',
  content: '',
  responsavelId: 0,
  fantasia: '',
  contrutoras: [1]
}

const financeirolist = [
  {
    id: 1,
    cnpj: '00000000000100',
    razaosocial: 'Financeira A',
    tel: '0000000000',
    email: '0dMgM@example.com',
    content: 'content',
    responsavel: {
      id: 1,
      name: 'John Doe',
      email: '0dMgM@example.com',
      password: 'password',
      role: 'admin',
    },
    contrutoras: [
      {
        id: 1,
        cnpj: '00000000000100',
        razaosocial: 'Construtora A',
        fantasia: 'Construtora A',
        tel: '0000000000',
        email: '0dMgM@example.com',
      },
      {
        id: 2,
        cnpj: '00000000000200',
        razaosocial: 'Construtora B',
        fantasia: 'Construtora B',
        tel: '0000000000',
        email: '0dMgM@example.com',
      },
      {
        id: 3,
        cnpj: '00000000000300',
        razaosocial: 'Construtora C',
        fantasia: 'Construtora C',
        tel: '0000000000',
        email: '0dMgM@example.com',
      }
    ]
  }
]

const userPayload = {
  sub: 1,
  email: '0dMgM@example.com',
}

describe('FinanceiroController', () => {
  let controller: FinanceiroController;
  let service: FinanceiroService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceiroController],
      providers: [
        {
          provide: FinanceiroService,
          useValue: {
            create: jest.fn().mockResolvedValue(createFinanceiroDto),
            findAll: jest.fn().mockResolvedValue(financeirolist),
            findOne: jest.fn().mockResolvedValue(financeirolist[0]),
            update: jest.fn().mockResolvedValue(createFinanceiroDto),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fake-jwt-token'),
          }
        },
        {
          provide: PrismaService,
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<FinanceiroController>(FinanceiroController);
    service = module.get<FinanceiroService>(FinanceiroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a financeiro', async () => {
      const result = await controller.create(createFinanceiroDto, userPayload);
      expect(result).toEqual(createFinanceiroDto);
    })
    it('should fail to create a financeiro', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Error creating financeiro'));
      await expect(controller.create(createFinanceiroDto, userPayload)).rejects.toThrowError('Error creating financeiro');
    })
  })

  describe('findAll', () => {
    it('should return a list of financeiros', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(financeirolist);
    })
    it('should fail to return a list of financeiros', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error getting financeiros'));
      await expect(controller.findAll()).rejects.toThrowError('Error getting financeiros');
    })
  })

  describe('findOne', () => {
    it('should return a single financeiro', async () => {
      const id = 1;
      const result = await controller.findOne((id - 1).toString());
      expect(result).toEqual(financeirolist[id - 1]);
    })
    it('should fail to return a single financeiro', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Error getting financeiro'));
      await expect(controller.findOne('1')).rejects.toThrowError('Error getting financeiro');
    })
  })

  describe('update', () => {
    it('should update a financeiro', async () => {
      const id = 1;
      const result = await controller.update((id - 1).toString(), updateFinanceiroDto, userPayload)
      expect(result).toEqual(createFinanceiroDto);
    })
    it('should fail to update a financeiro', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Error updating financeiro'));
      await expect(controller.update('1', updateFinanceiroDto, userPayload)).rejects.toThrowError('Error updating financeiro');
    })
  })

  describe('remove', () => {
    it('should remove a financeiro', async () => {
      const id = 1;
      const result = await controller.remove((id - 1).toString(), userPayload);
      console.log(result);
      expect(result).toBeUndefined();
    })
    it('should fail to remove a financeiro', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error removing financeiro'));
      await expect(controller.remove('1', userPayload)).rejects.toThrowError('Error removing financeiro');
    })
  })
})
