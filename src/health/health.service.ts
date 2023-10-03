import { Injectable } from '@nestjs/common';
import { GetHealthDto } from './dto/get-health.dto';

@Injectable()
export class HealthService {
  getHealth(): GetHealthDto {
    return new GetHealthDto();
  }
}
