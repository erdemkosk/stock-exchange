import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'User id',
    example: '6ecd8c99-4036-403d-bf84-cf8400f67836',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Stock id',
    example: '237e9877-e79b-12d4-a765-321741963000',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  stockId: string;

  @ApiProperty({
    type: Number,
    description: 'Count of stock',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
