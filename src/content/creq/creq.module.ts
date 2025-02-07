/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CreqController } from './creq.controller';
import { CreqService } from './creq.service';
import { DatabaseModule, DatabaseService } from 'src/database';

@Module({
    imports: [DatabaseModule],
    controllers: [CreqController],
    providers: [CreqService, DatabaseService],
})
export class CreqModule { }
