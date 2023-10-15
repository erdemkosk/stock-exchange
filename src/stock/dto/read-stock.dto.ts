import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReadStockDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Stock id',
  })
  @IsDefined()
  @IsString()
  id: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Symbol of stock',
    example: 'THY',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Name of stock',
    example: 'Türk Hava Yolları',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'Price of stock',
    example: 200,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
