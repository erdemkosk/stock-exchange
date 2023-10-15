import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ReadStockDto } from './dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async create(
    @Body() createStockDto: CreateStockDto,
  ): Promise<ReadStockDto | undefined> {
    return this.stockService.create(createStockDto);
  }

  @Get()
  async findAll(): Promise<ReadStockDto[] | []> {
    return this.stockService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadStockDto | undefined> {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<ReadStockDto | undefined> {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  asyncremove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
