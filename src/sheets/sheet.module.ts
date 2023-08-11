import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [DatabaseModule],
    controllers: [
        SheetController,],
    providers: [
        SheetService, DatabaseService],
})
export class SheetModule { }
