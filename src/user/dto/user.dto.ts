import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsDefined,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsDecimal,
} from 'class-validator';

export class UserDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'User id as mongodb id',
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;

  @AutoMap()
  @IsOptional()
  @IsDateString()
  createDateTime: Date;

  @AutoMap()
  @IsOptional()
  @IsDateString()
  lastChangedDateTime: Date;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Username of the user',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Password of the user',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @AutoMap()
  @IsInt()
  stockQuantity: number;

  @AutoMap()
  @IsDecimal({ decimal_digits: '2' })
  balance: number;
}
