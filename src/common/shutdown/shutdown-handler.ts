// shutdown-handler.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ShutdownHandler {
  async onShutdown(signal: string) {
    // Before app closing operation
    console.log(`App closing (${signal})`);
    // Kill db etc
  }
}
