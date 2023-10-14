import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @AutoMap()
  id: string;
}
