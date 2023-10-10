import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
}
