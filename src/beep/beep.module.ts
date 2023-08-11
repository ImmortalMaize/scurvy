import { DatabaseModule } from 'src/database/database.module';
import { BeepController } from './beep.controller';
import { BeepService } from './beep.service';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SheetModule } from 'src/sheets/sheet.module';
import { SheetService } from 'src/sheets/sheet.service';
import { SauceModule } from 'src/sauce/sauce.module';
import { SauceService } from 'src/sauce/sauce.service';

@Module({
    imports: [DatabaseModule, UserModule, SheetModule, SauceModule],
    controllers: [
        BeepController, ],
    providers: [
        BeepService, DatabaseService, UserService, SheetService, SauceService],
})
export class BeepModule { }
