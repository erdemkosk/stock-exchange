import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockDto {
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
