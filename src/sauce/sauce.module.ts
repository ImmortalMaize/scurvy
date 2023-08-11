import { DatabaseModule } from 'src/database/database.module';
import { SauceController } from './sauce.controller';
import { SauceService } from './sauce.service';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Module({
    imports: [DatabaseModule],
    controllers: [
        SauceController, ],
    providers: [
        SauceService, DatabaseService],
})
export class SauceModule { }
