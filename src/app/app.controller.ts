import { Body, Controller, Delete, Get, HttpException, Post, Response, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}
  @Get()
  getHello(@Response() res) {
    res.send('<h1>Hello World!</h1>')
  }
}
