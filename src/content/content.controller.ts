/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from 'src/database';

@Controller()
export class ContentController {
    constructor(databaseService: DatabaseService) {}


}
