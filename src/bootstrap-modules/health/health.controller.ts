import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHealthDto } from './dto/get-health.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Get health' })
  @ApiResponse({
    status: 200,
    description: 'Health information retrieved successfully',
    type: GetHealthDto, // DTO tipini belirtin
  })
  @Get()
  getHealth() {
    return this.healthService.getHealth();
  }
}
