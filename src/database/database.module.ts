/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DatabaseService],
})
export class DatabaseModule {}
