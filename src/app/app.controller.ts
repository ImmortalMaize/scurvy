import { Body, Controller, Delete, Get, HttpException, Post, Response, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';
import { Public } from 'src/auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}

  @Public()
  @Get()
  getHello() {
    console.log(process.env.SESSION_COOKIE)
    return {
      sessionName: process.env.SESSION_COOKIE
    }
  }
}
