import { Body, Controller, Delete, Get, HttpException, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}
  @Get()
  getHello(@Response() res) {
    res.send('<h1>Hello World!</h1>')
  }
  
  @Delete()
  async clear(@Body('model') model: string) {
    if (!model) throw new HttpException('No model specified.', 400)
    return await this.databaseService.clear(model)
  }
}
