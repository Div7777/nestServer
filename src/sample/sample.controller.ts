// src/sample/sample.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  getHello(): string {
    return 'Hello from the sample controller!';
  }
}
