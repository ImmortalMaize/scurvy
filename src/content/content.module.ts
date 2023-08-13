import { DatabaseModule, DatabaseService } from 'src/database';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [DatabaseModule],
    controllers: [
        ContentController,],
    providers: [
        ContentService, DatabaseService],
})
export class ContentModule { }
