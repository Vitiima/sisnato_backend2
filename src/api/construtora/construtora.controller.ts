import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ConstrutoraService } from './construtora.service';
import { CreateConstrutoraDto } from './dto/create-construtora.dto';
import { UpdateConstrutoraDto } from './dto/update-construtora.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Construtora } from './entities/construtora.entity';
import { ErrorConstrutoraEntity } from './entities/construtora.error.entity';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('construtora')
export class ConstrutoraController {
  constructor(private readonly construtoraService: ConstrutoraService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar construtora',
    description: 'Cria uma nova construtora',
  })
  @ApiBody({ type: CreateConstrutoraDto })
  @ApiResponse({
    status: 201,
    description: 'Construtora criada com sucesso',
    type: Construtora,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar construtora',
    type: ErrorConstrutoraEntity,
  })
  async create(
    @Body() createConstrutoraDto: CreateConstrutoraDto,
    @Req() req: any,
  ) {
    return await this.construtoraService.create(createConstrutoraDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({})
  @ApiOperation({
    summary: 'Listar construtoras',
    description: 'Listar todas as construtoras',
  })
  @ApiResponse({
    status: 200,
    description: 'Construtoras encontradas com sucesso',
    type: [Construtora],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao encontrar construtoras',
    type: ErrorConstrutoraEntity,
  })
  async findAll(@Req() req: any) {
    return await this.construtoraService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar construtora',
    description: 'Listar uma pelo id da construtora',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da construtora',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Construtora encontrada com sucesso',
    type: Construtora,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao encontrar construtora',
    type: ErrorConstrutoraEntity,
  })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return await this.construtoraService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar construtora',
    description: 'Atualiza uma construtora pelo id',
  })
  @ApiBody({
    type: UpdateConstrutoraDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Construtora atualizada com sucesso',
    type: Construtora,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar construtora',
    type: ErrorConstrutoraEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() updateConstrutoraDto: UpdateConstrutoraDto,
    @Req() req: any,
  ) {
    return await this.construtoraService.update(
      +id,
      updateConstrutoraDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remover construtora',
    description: 'Remove uma construtora pelo id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da construtora',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Construtora removida com sucesso',
    type: Construtora,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao remover construtora',
    type: ErrorConstrutoraEntity,
  })
  async remove(@Param('id') id: string, @Req() req: any) {
    return await this.construtoraService.remove(+id, req.user);
  }
}
