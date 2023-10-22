import { ApiProperty } from '@nestjs/swagger';
import { HealthLogic } from '../logic/health.logic';

export class GetHealthDto {
  @ApiProperty()
  uptime: string;

  constructor() {
    this.uptime = HealthLogic.formatUptime(process.uptime());
  }
}
