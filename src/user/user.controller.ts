import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReadUserDto } from './dto';
import { CustomException } from 'src/common/exception';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create An User' })
  @ApiResponse({
    type: ReadUserDto,
  })
  @ApiBadRequestResponse({
    type: CustomException,
    status: HttpStatus.BAD_REQUEST,
    description: 'Error occured during this operation',
  })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReadUserDto | undefined> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(): Promise<ReadUserDto[] | []> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get an single user' })
  @ApiResponse({
    type: ReadUserDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadUserDto | undefined> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an User' })
  @ApiResponse({
    type: UpdateUserDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto | undefined> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
