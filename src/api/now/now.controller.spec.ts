import { Test, TestingModule } from '@nestjs/testing';
import { NowController } from './now.controller';
import { NowService } from './now.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { describe } from 'node:test';
import { UpdateNowDto } from './dto/update-now.dto';


const userpayload = {
  id: 1,
  nome: 'John Doe',
  email: 'L2FVh@example.com',
}

const updateNowDto: UpdateNowDto = {
  alertanow: false
}
describe('NowController', () => {
  let controller: NowController;
  let service : NowService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NowController],
      providers: [
        {
          provide: NowService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          }
        },
        {
          provide: PrismaService,
          useValue: {}
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fake-jwt-token'),
          }
        }
      ],
    }).compile();

    controller = module.get<NowController>(NowController);
    service = module.get<NowService>(NowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findOne', () => {

    const id = 1;

    it('should findOne', () => {
      expect(controller.findOne(id.toString())).toBeDefined();
    });
    it('should fail to findOne', () => {
      jest.spyOn(controller, 'findOne').mockRejectedValue(new Error('Error getting now'));
      expect(controller.findOne('1')).rejects.toThrowError('Error getting now');
    });
  })

  describe('update', () => {

    const id = 1;

    it('should update', () => {
      expect(controller.update(id.toString(), updateNowDto, userpayload)).toBeDefined();
    });
    it('should fail to update', () => {
      jest.spyOn(controller, 'update').mockRejectedValue(new Error('Error updating now'));
      expect(controller.update('1', updateNowDto, userpayload)).rejects.toThrowError('Error updating now');
    });
  })
});
