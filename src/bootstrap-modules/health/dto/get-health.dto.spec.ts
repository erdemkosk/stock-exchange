import { GetHealthDto } from './get-health.dto';

describe('GetHealthDto', () => {
  it('should create a health DTO with uptime', () => {
    const originalUptime = process.uptime;
    process.uptime = jest.fn(() => 12345);

    const healthDto = new GetHealthDto();

    expect(healthDto).toBeDefined();
    expect(healthDto.uptime).toBe('0 d 3 h 25 m 45 s');

    process.uptime = originalUptime;
  });
});
