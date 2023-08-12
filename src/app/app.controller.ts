import { Body, Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Delete()
  async clear(@Body('model') model: string) {
    return await this.databaseService.clear(model)
  }
}
