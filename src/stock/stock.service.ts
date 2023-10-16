import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ReadStockDto } from './dto/read-stock.dto';
import { Mapper } from '@automapper/core';
import { EntityManager, Repository } from 'typeorm';
import { Stock } from './entities/stock.entitiy';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { StockNotFoundException } from 'src/common/exception';

@Injectable()
export class StockService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectMapper() private readonly stockMapper: Mapper,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async create(
    createStockDto: CreateStockDto,
  ): Promise<ReadStockDto | undefined> {
    const stock: Stock = new Stock(createStockDto);

    await this.entityManager.save(stock);

    return this.stockMapper.map(stock, Stock, ReadStockDto);
  }

  async findAll(): Promise<ReadStockDto[] | []> {
    return this.stockMapper.mapArrayAsync(
      await this.stockRepository.find(),
      Stock,
      ReadStockDto,
    );
  }

  async findOne(id: string): Promise<ReadStockDto | undefined> {
    return this.stockMapper.mapAsync(
      await this.stockRepository.findOneBy({ id }),
      Stock,
      ReadStockDto,
    );
  }

  async update(
    id: string,
    updateStockDto: UpdateStockDto,
  ): Promise<ReadStockDto | undefined> {
    const stock = await this.stockRepository.findOneBy({ id });

    if (!stock) {
      throw new StockNotFoundException({ id });
    }

    updateStockDto.id = id;
    const updatedStock = this.stockMapper.map(
      updateStockDto,
      UpdateStockDto,
      Stock,
    );

    return this.stockMapper.mapAsync(
      await this.stockRepository.save(updatedStock),
      Stock,
      ReadStockDto,
    );
  }

  async remove(id: string) {
    await this.stockRepository.delete({ id });

    return {
      success: true,
    };
  }

  async findById(id: string): Promise<Stock> {
    return await this.stockRepository.findOneBy({ id });
  }
}
